import MathX from "../../nonview/base/MathX";

const N_GROUPS = 6;

export default class Partition {
  static getTotalPop(geojsonFeatures) {
    return MathX.sumGeneric(
      geojsonFeatures,
      (feature) => feature.properties.population
    );
  }

  static getIDToGroup(geojsonFeatures) {
    let idToGroup = {};

    const totalPop = Partition.getTotalPop(geojsonFeatures);

    const sortedFeatures = geojsonFeatures.sort(function (a, b) {
      return a.properties.centroid[1] > b.properties.centroid[1];
    });

    let cumPop = 0;
    for (let feature of sortedFeatures) {
      const pop = feature.properties.population;
      cumPop += pop;
      const pPop = (cumPop - pop) / totalPop;
      const group = parseInt(pPop * N_GROUPS);
      idToGroup[feature.id] = group;
    }
    return idToGroup;
  }
}
