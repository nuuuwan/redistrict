import MathX from "../../nonview/base/MathX";

export default class Partition {
  static getFeatureToGroup(features) {
    let featureToGroup = {};

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
      const group = parseInt(pPopulation * 2);
      featureToGroup[feature.id] = group;
    }
    return featureToGroup;
  }
}
