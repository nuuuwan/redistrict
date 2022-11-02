import BBox from "../../nonview/base/geo/BBox";
import DictUtils from "../../nonview/base/DictUtils";
import EntTypes, { ENT_TYPES } from "../../nonview/base/EntTypes";
import MathX from "../../nonview/base/MathX";
import CommonStore from "../../nonview/core/CommonStore";
import Region from "../../nonview/core/Region";
import Seats from "../../nonview/core/Seats";

export default class RegionIdx {
  constructor(idx) {
    this.idx = Object.entries(idx).map(
      function([id, ent]) {
        return [id, Region.fromEnt(ent)];
      }
    ).filter(
      function([id, region]) {
        return !region.isPostal;
      }
    ).reduce(function (idx, [id, region]) {
      idx[id] = region;
      return idx;
    }, {});
  }

  get(id) {
    return this.idx[id];
  }

  get totalPop() {
    return this.getTotalPop(this.idList);
  }

  get idList() {
    return Object.keys(this.idx);
  }

  getSorted(idList, funcKey) {
    return idList.sort(
      function (idA, idB) {
        return funcKey(this.idx[idA]) - funcKey(this.idx[idB]);
      }.bind(this)
    );
  }

  getSortedSN(idList) {
    return this.getSortedAtAngle(idList, 90);
  }

  getSortedNS(idList) {
    return this.getSortedAtAngle(idList, 270);
  }

  getSortedWE(idList) {
    return this.getSortedAtAngle(idList, 0);
  }

  getSortedEW(idList) {
    return this.getSortedAtAngle(idList, 180);
  }

  getSortedAtAngle(idList, theta) {
    const thetaRad = (theta * Math.PI) / 180;
    const cosTheta = Math.cos(thetaRad);
    const sinTheta = Math.sin(thetaRad);
    return this.getSorted(idList, (x) => x.lng * cosTheta + x.lat * sinTheta);
  }

  getLatLngList(idList) {
    return idList.map((id) => this.get(id).lngLat);
  }

  getLatLngSpans(idList) {
    const latLngList = this.getLatLngList(idList);
    const [minLng, minLat, maxLng, maxLat] = BBox.fromLatLngList(latLngList);
    const latSpan = maxLat - minLat;
    const lngSpan = maxLng - minLng;
    return { latSpan, lngSpan };
  }

  getTotalPop(idList) {
    return MathX.sumGeneric(idList, (id) => this.get(id).pop);
  }

  static getNameRegionType(subRegionType) {
    if (subRegionType === ENT_TYPES.DSD) {
      return ENT_TYPES.DSD;
    }
    return ENT_TYPES.PD;
  }

  static getMostCommonRegionName(regionIDList) {
    const commonStore = CommonStore.getSingleton();
    const subRegionType = EntTypes.getEntType(regionIDList[0]);
    const subRegionIndex = commonStore.allEntIndex[subRegionType];

    const nameRegionType = RegionIdx.getNameRegionType(subRegionType);
    const regionIndex = commonStore.allEntIndex[nameRegionType];

    const regionIDToPop = {};
    for (let subRegionID of regionIDList) {
      const regionEnt = Region.fromEnt(subRegionIndex[subRegionID]);
      const regionID = regionEnt.getParentID(nameRegionType);
      if (!regionIDToPop[regionID]) {
        regionIDToPop[regionID] = 0;
      }
      regionIDToPop[regionID] += parseInt(regionEnt.pop);
    }

    const mostPopRegionID = Object.entries(regionIDToPop).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
    return regionIndex[mostPopRegionID].name;
  }

  static getGenericTableInfo(idList, table, keyGroupToKeyList) {
    let info = Object.keys(keyGroupToKeyList).reduce(function (info, keyGroup) {
      info[keyGroup] = 0;
      return info;
    }, {});
    let totalPop = 0;
    for (let id of idList) {
      const tableRow = table.getRowByID(id);
      if (!tableRow) {
        continue;
      }

      for (let [keyGroup, keyList] of Object.entries(keyGroupToKeyList)) {
        for (let key of keyList) {
          info[keyGroup] += tableRow.getValue(key);
        }
      }
      totalPop += tableRow.total;
    }

    info["others"] = totalPop - MathX.sum(Object.values(info));

    return Object.entries(info)
      .sort(function (a, b) {
        return b[1] - a[1];
      })
      .reduce(function (infoFinal, [k, v]) {
        infoFinal[k] = info[k] / totalPop;
        return infoFinal;
      }, {});
  }

  static getEthnicityInfo(idList) {
    const commonStore = CommonStore.getSingleton();
    return RegionIdx.getGenericTableInfo(idList, commonStore.ethnicityTable, {
      sinhalese: ["sinhalese"],
      tamil: ["indian_tamil", "sri_lankan_tamil"],
      moor: ["moor", "malay"],
    });
  }

  static getReligionInfo(idList) {
    const commonStore = CommonStore.getSingleton();
    return RegionIdx.getGenericTableInfo(idList, commonStore.religionTable, {
      buddhist: ["buddhist"],
      hindu: ["hindu"],
      islam: ["islam"],
      christian: ["roman_catholic", "other_christian"],
    });
  }

  static getTotalUnfairness(idList, nSeats) {
    const funcDemographicsList = [
      RegionIdx.getEthnicityInfo,
      RegionIdx.getReligionInfo,
    ];
    return (
      MathX.sum(
        funcDemographicsList.map(function (funcDemographics) {
          return RegionIdx.getUnfairness(idList, nSeats, funcDemographics);
        })
      ) / funcDemographicsList.length
    );
  }

  static getUnfairness(idList, nSeats, funcDemographics) {
    const demoToP = funcDemographics(idList);
    const demoToSeats = Seats.divideSeats(nSeats, demoToP);
    const demoToSeatsFair = DictUtils.mapValues(demoToP, (p) => p * nSeats);
    return Object.entries(demoToSeats).reduce(function (
      unfairness,
      [demo, seats]
    ) {
      return unfairness + Math.abs(demoToSeatsFair[demo] - seats);
    },
    0);
  }
}
