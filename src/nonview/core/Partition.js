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
    this.groupToIDListAndNSeats = { "group-0": {
      idList: partitionRegionIdx.idList,
      nSeats,
    } };
  }




  get idToGroup() {
    return Object.entries(this.groupToIDListAndNSeats).reduce(function (
      idToGroup,
      [group, {idList, nSeats}]
    ) {
      for (let id of idList) {
        idToGroup[id] = group;
      }
      return idToGroup;
    },
    {});
  }
}
