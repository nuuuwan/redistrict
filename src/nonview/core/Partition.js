import MathX from "../../nonview/base/MathX";
import RegionEntIdx from "../../nonview/core/RegionEntIdx";

export default class Partition {
  constructor(regionEntIdx, nSeats) {
    this.regionEntIdx = new RegionEntIdx(regionEntIdx);
    this.groupToIDListAndNSeats = {
      "-": {
        idList: this.regionEntIdx.idList,
        nSeats,
      },
    };
  }

  partitionSingle(idList, nSeats) {
    const nSeats1 = parseInt(nSeats / 2);
    const totalPop = MathX.sumGeneric(idList, (id) =>
      parseInt(this.regionEntIdx.get(id).population)
    );
    const partitionPop = (totalPop * nSeats1) / nSeats;
    let cumPop = 0;
    const isLatSpanLongerThanLngSpan =
      this.regionEntIdx.isLatSpanLongerThanLngSpan(idList);
    const sortedIdList = this.regionEntIdx.getSortedByLongerSpan(idList);

    const [group1, group2] = isLatSpanLongerThanLngSpan
      ? ["S", "N"]
      : ["W", "E"];

    let bestDiff = undefined;
    let bestI = undefined;
    for (let i in sortedIdList) {
      const id = sortedIdList[i];
      const pop = this.regionEntIdx.get(id).pop;
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

  getGroupToName() {
    let groupToName = {};
    let nameCount = {};
    let nameCountFinal = {};
    for (let [group, { idList }] of Object.entries(
      this.groupToIDListAndNSeats
    )) {
      const name = RegionEntIdx.getMostCommonDSDName(idList);
      if (!nameCount[name]) {
        nameCount[name] = 0;
        nameCountFinal[name] = 0;
      }
      nameCount[name] += 1;
      groupToName[group] = name;
    }

    let groupToNameFinal = {};
    for (let [group, name] of Object.entries(groupToName)) {
      nameCountFinal[name] += 1;
      const prefix = nameCount[name] > 1 ? `-${nameCountFinal[name]}` : "";
      groupToNameFinal[group] = groupToName[group] + prefix;
    }
    return groupToNameFinal;
  }

  getGroupToIDList() {
    return Object.entries(this.groupToIDListAndNSeats).reduce(function (
      groupToIDList,
      [group, { idList }]
    ) {
      groupToIDList[group] = idList;
      return groupToIDList;
    },
    {});
  }
}
