import MathX from "../../nonview/base/MathX";

const N_GROUPS= 6;

export default class Partition {
  static getTotalPopulation(geojsonFeatures) {
    return MathX.sumGeneric(
      geojsonFeatures,
      (feature) => feature.properties.population
    );
  }

  static getFeatureToGroup(geojsonFeatures) {
    let featureToGroup = {};

    const totalPopulation = Partition.getTotalPopulation(geojsonFeatures);

    const sortedFeatures = geojsonFeatures.sort(function (a, b) {
      return a.properties.centroid[1] > b.properties.centroid[1];
    });

    let cumPopulation = 0;
    for (let feature of sortedFeatures) {
      const population = feature.properties.population;
      cumPopulation += population;
      const pPopulation = (cumPopulation - population) / totalPopulation;
      const group = parseInt(pPopulation * N_GROUPS);
      featureToGroup[feature.id] = group;
      console.debug(feature.id, group);
    }
    return featureToGroup;
  }
}
