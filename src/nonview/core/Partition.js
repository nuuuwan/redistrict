import Color from "../../nonview/base/Color";
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

  static getPartition1Seats(nSeats, maxSeatsPerGroup) {
    const p = Math.max(2, parseInt((nSeats - 1) / maxSeatsPerGroup) + 1);
    const q = parseInt(p / 2);
    return parseInt((nSeats * q) / p);
  }

  partitionSingle(idList, nSeats, maxSeatsPerGroup) {
    const nSeats1 = Partition.getPartition1Seats(nSeats, maxSeatsPerGroup);
    const nSeats2 = nSeats - nSeats1;

    const totalPop = MathX.sumGeneric(idList, (id) =>
      parseInt(this.regionEntIdx.get(id).population)
    );
    const partitionPop = (totalPop * nSeats1) / nSeats;

    let bestIDList1,
      bestIDList2,
      bestLabel,
      bestUnfairness = undefined;

    const { latSpan, lngSpan } = this.regionEntIdx.getLatLngSpans(idList);

    let thetaList;
    const K = 1.05;
    if (latSpan > K * lngSpan) {
      thetaList = [90, 270];
    } else if (lngSpan > K * latSpan) {
      thetaList = [0, 180];
    } else {
      thetaList = MathX.range(0, 360, 90);
    }

    for (let theta of thetaList) {
      const label = "t" + theta;
      const sortedIdList = this.regionEntIdx.getSortedAtAngle(idList, theta);

      let bestI;
      let bestDiff = undefined;
      let cumPop = 0;
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

      const unfairness =
        RegionEntIdx.getTotalUnfairness(idList1, nSeats) +
        RegionEntIdx.getTotalUnfairness(idList2, nSeats2);
      if (bestUnfairness === undefined || unfairness < bestUnfairness) {
        bestUnfairness = unfairness;
        bestLabel = label;
        bestIDList1 = idList1;
        bestIDList2 = idList2;
      }
    }

    return {
      [bestLabel + "0"]: {
        idList: bestIDList1,
        nSeats: nSeats1,
      },
      [bestLabel + "1"]: {
        idList: bestIDList2,
        nSeats: nSeats2,
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
            nSeats,
            maxSeatsPerGroup
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
      const name = RegionEntIdx.getMostCommonRegionName(idList);
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

  static getColorFairness(nSeatsFairPerNSeats2) {
    const log2NSeatsFairPerNSeats2 =
      Math.log(nSeatsFairPerNSeats2) / Math.log(2);
    const h = nSeatsFairPerNSeats2 < 1 ? 240 : 0;
    const p = Math.pow(Math.abs(log2NSeatsFairPerNSeats2), 2);
    const l = 100 - (40 * Math.min(1, p)) / 2;
    return Color.hsla(h, 100, l, 1);
  }
}
