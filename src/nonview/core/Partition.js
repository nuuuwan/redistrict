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
    const isLatSpanLongerThanLngSpan =
      this.partitionRegionIdx.isLatSpanLongerThanLngSpan(idList);
    const sortedIdList = this.partitionRegionIdx.getSortedByLongerSpan(idList);

    const [group1, group2] = isLatSpanLongerThanLngSpan
      ? ["S", "N"]
      : ["W", "E"];

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

    const idList1 = idList.slice(0, nPartition);
    const idList2 = idList.slice(nPartition);

    if (idList1.length === 0 || idList2.length === 0) {
      return null;
    }

    return {
      [group1]: {
        idList: idList1,
        nSeats: nSeats1,
      },
      [group2]: {
        idList: idList2,
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
        if (nSeats >= Math.max(2, maxSeatsPerGroup)) {
          const partialGroupToIDListAndNSeats = this.partitionSingle(
            idList,
            nSeats
          );
          if (partialGroupToIDListAndNSeats !== null) {
            for (let subKey in partialGroupToIDListAndNSeats) {
              newGroupToIDListAndNSeats[group + subKey] =
                partialGroupToIDListAndNSeats[subKey];
            }
            nPartitioned += 1;
            continue;
          }
        }
        newGroupToIDListAndNSeats[group] = this.groupToIDListAndNSeats[group];
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
