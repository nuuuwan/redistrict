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
    this.groupToIDListAndNSeats = {
      "-": {
        idList: partitionRegionIdx.sortedByLat,
        nSeats,
      },
    };
  }

  static partitionSingle(idList, nSeats) {
    const nPartition = parseInt(idList.length / 2);
    const nSeatsNew = parseInt(nSeats / 2);
    return {
      N: {
        idList: idList.slice(0, nPartition),
        nSeats: nSeatsNew,
      },
      S: {
        idList: idList.slice(nPartition),
        nSeats: nSeats - nSeatsNew,
      },
    };
  }

  partitionAll() {
    while (true) {
      let newGroupToIDListAndNSeats = {};
      let nPartitioned = 0;
      for (let group in this.groupToIDListAndNSeats) {
        const { idList, nSeats } = this.groupToIDListAndNSeats[group];
        if (nSeats > 1) {
          const partialGroupToIDListAndNSeats = Partition.partitionSingle(
            idList,
            nSeats
          );
          for (let subKey in partialGroupToIDListAndNSeats) {
            newGroupToIDListAndNSeats[group + subKey] =
              partialGroupToIDListAndNSeats[subKey];
          }
          nPartitioned += 1;
        } else {
          newGroupToIDListAndNSeats[group] = this.groupToIDListAndNSeats[group];
        }
      }

      if (nPartitioned > 0) {
        this.groupToIDListAndNSeats = newGroupToIDListAndNSeats;
        console.debug(nPartitioned, this.groupToIDListAndNSeats);
      } else {
        break;
      }
    }
  }

  get idToGroup() {
    return Object.entries(this.groupToIDListAndNSeats).reduce(function (
      idToGroup,
      [group, { idList, nSeats }]
    ) {
      for (let id of idList) {
        idToGroup[id] = group;
      }
      return idToGroup;
    },
    {});
  }
}
