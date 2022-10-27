import MathX from "../../nonview/base/MathX";
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
        idList: partitionRegionIdx.idList,
        nSeats,
      },
    };
  }

  partitionSingle(idList, nSeats) {
    const nSeats1 = parseInt(nSeats / 2);
    const totalPop = MathX.sumGeneric(
      idList,
      (id) => this.partitionRegionIdx.get(id).pop
    );
    const partitionPop = (totalPop * nSeats1) / nSeats;
    let cumPop = 0;
    const sortedIdList = this.partitionRegionIdx.getSortedByLongerSpan(idList);

    let bestDiff = undefined;
    let bestI = undefined;
    for (let i in sortedIdList) {
      const id = sortedIdList[i];
      const pop = this.partitionRegionIdx.get(id).pop;
      const diff = Math.abs(cumPop - partitionPop);
      if (bestDiff === undefined || diff < bestDiff) {
        bestDiff = diff;
        bestI = i;
      }
      cumPop += pop;
    }
    const nPartition = bestI;

    return {
      N: {
        idList: idList.slice(0, nPartition),
        nSeats: nSeats1,
      },
      S: {
        idList: idList.slice(nPartition),
        nSeats: nSeats - nSeats1,
      },
    };
  }

  partitionAll(maxSeatsPerGroup) {
    while (true) {
      let newGroupToIDListAndNSeats = {};
      let nPartitioned = 0;
      for (let group in this.groupToIDListAndNSeats) {
        const { idList, nSeats } = this.groupToIDListAndNSeats[group];
        if (nSeats > maxSeatsPerGroup) {
          const partialGroupToIDListAndNSeats = this.partitionSingle(
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
