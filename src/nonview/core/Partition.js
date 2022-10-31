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

    const totalPop = MathX.sumGeneric(idList, (id) =>
      parseInt(this.regionEntIdx.get(id).population)
    );
    const partitionPop = (totalPop * nSeats1) / nSeats;

    const { latSpan, lngSpan } = this.regionEntIdx.getLatLngSpans(idList);

    let funcSortInfoList = [];
    const K_LATLNG = 1.5;
    if (lngSpan < latSpan * K_LATLNG) {
      funcSortInfoList.push({
        funcSort: this.regionEntIdx.getSortedNS.bind(this.regionEntIdx),
        label: "NS",
      });
      funcSortInfoList.push({
        funcSort: this.regionEntIdx.getSortedSN.bind(this.regionEntIdx),
        label: "SN",
      });
    }

    if (latSpan < lngSpan * K_LATLNG) {
      funcSortInfoList.push({
        funcSort: this.regionEntIdx.getSortedEW.bind(this.regionEntIdx),
        label: "EW",
      });
      funcSortInfoList.push({
        funcSort: this.regionEntIdx.getSortedWE.bind(this.regionEntIdx),
        label: "WE",
      });
    }

    let bestIDList1,
      bestIDList2,
      bestLabel,
      bestWastage = undefined;

    for (let { funcSort, label } of funcSortInfoList) {
      const sortedIdList = funcSort(idList);

      let i;
      let cumPop = 0;
      for (i in sortedIdList) {
        const id = sortedIdList[i];
        const pop = this.regionEntIdx.get(id).pop;
        cumPop += pop;
        if (cumPop > partitionPop) {
          break;
        }
      }

      const nPartition = i;
      const idList1 = idList.slice(0, nPartition);
      const idList2 = idList.slice(nPartition);

      if (idList1.length === 0 || idList2.length === 0) {
        return null;
      }

      const diffScore = RegionEntIdx.getWastage(idList1, idList2);
      if (bestWastage === undefined || bestWastage < diffScore) {
        bestWastage = diffScore;
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
}
