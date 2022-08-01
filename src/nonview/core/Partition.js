import MathX from "../../nonview/base/MathX";

export default class Partition {
  static getFeatureToColor(features) {
    let featureToColor = {};

    const totalPopulation = MathX.sumGeneric(
      features,
      (feature) => feature.properties.population
    );

    const sortedFeatures = features.sort(function (a, b) {
      return a.properties.centroid[1] > b.properties.centroid[1];
    });

    let cumPopulation = 0;
    for (let feature of sortedFeatures) {
      cumPopulation += feature.properties.population;
      const pPopulation = cumPopulation / totalPopulation;
      let color;

      if (pPopulation < 0.5) {
        color = "green";
      } else {
        color = "maroon";
      }

      featureToColor[feature.id] = color;
    }
    return featureToColor;
  }
}
