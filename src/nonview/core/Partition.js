import PartitionRegionIdx from "../../nonview/core/PartitionRegionIdx";

export default class Partition {
  static fromGeoJSONFeatures(geojsonFeatures, nSeats) {
    return new Partition(
      PartitionRegionIdx.fromGeoJSONFeatures(geojsonFeatures),
      nSeats
    );
  }
  constructor(partitionRegionIdx, nSeats) {
    this.partitionRegionIdx = partitionRegionIdx;
    this.groupToIDList = { "group-0": partitionRegionIdx.idList };
  }

  get idToGroup() {
    return Object.entries(this.groupToIDList).reduce(function (
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
