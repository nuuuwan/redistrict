import PartitionRegion from "../../nonview/core/PartitionRegion";

const N_GROUPS = 3;

export default class Partition {
  static getIDToGroup(geojsonFeatures) {
    const partitionRegionList = geojsonFeatures.map((geojsonFeature) =>
      PartitionRegion.fromGeoJSONFeature(geojsonFeature)
    );
    const totalPop = PartitionRegion.getTotalPop(partitionRegionList);

    const sortedPartitionRegionList = partitionRegionList.sort(function (a, b) {
      return a.lat > b.lat;
    });

    let cumPop = 0;
    let idToGroup = {};
    for (let partitionRegion of sortedPartitionRegionList) {
      const pop = partitionRegion.pop;
      cumPop += pop;
      const pPop = (cumPop - pop) / totalPop;
      const group = parseInt(pPop * N_GROUPS);
      idToGroup[partitionRegion.id] = group;
    }
    return idToGroup;
  }
}
