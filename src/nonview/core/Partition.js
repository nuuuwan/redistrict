import PartitionRegionIdx from "../../nonview/core/PartitionRegionIdx";

const N_GROUPS = 3;

export default class Partition {
  static getGroupToIDs(geojsonFeatures) {
    const partitionRegionIdx =
      PartitionRegionIdx.fromGeoJSONFeatures(geojsonFeatures);

    const totalPop = partitionRegionIdx.totalPop;

    const sortedPartitionRegionList =
      partitionRegionIdx.partitionRegionList.sort(function (a, b) {
        return a.lat > b.lat;
      });

    let cumPop = 0;
    let groupToIDs = {};
    for (let partitionRegion of sortedPartitionRegionList) {
      const pop = partitionRegion.pop;
      cumPop += pop;
      const pPop = (cumPop - pop) / totalPop;
      const group = `Group-${parseInt(pPop * N_GROUPS)}`;
      if (!groupToIDs[group]) {
        groupToIDs[group] = [];
      }
      groupToIDs[group].push(partitionRegion.id);
    }
    return groupToIDs;
  }

  static getIDToGroup(geojsonFeatures) {
    const groupToIDs = Partition.getGroupToIDs(geojsonFeatures);
    return Object.entries(groupToIDs).reduce(function (
      idToGroup,
      [group, ids]
    ) {
      for (let id of ids) {
        idToGroup[id] = group;
      }
      return idToGroup;
    },
    {});
  }
}
