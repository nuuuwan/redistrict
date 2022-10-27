import PartitionRegion from "../../nonview/core/PartitionRegion";

const N_GROUPS = 3;

export default class Partition {
  static getGroupToIDs(geojsonFeatures) {
    const partitionRegionList = geojsonFeatures.map((geojsonFeature) =>
      PartitionRegion.fromGeoJSONFeature(geojsonFeature)
    );
    const totalPop = PartitionRegion.getTotalPop(partitionRegionList);

    const sortedPartitionRegionList = partitionRegionList.sort(function (a, b) {
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
