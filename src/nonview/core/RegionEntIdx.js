import BBox from "../../nonview/base/geo/BBox";
import EntTypes, { ENT_TYPES } from "../../nonview/base/EntTypes";
import MathX from "../../nonview/base/MathX";
import CommonStore from "../../nonview/core/CommonStore";

export default class RegionEntIdx {
  constructor(idx) {
    this.idx = idx;
  }

  get(id) {
    return this.idx[id];
  }

  get idList() {
    return Object.keys(this.idx);
  }

  get partitionRegionList() {
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
    return this.getSorted(idList, (x) => x.lat);
  }

  getSortedNS(idList) {
    return this.getSorted(idList, (x) => -x.lat);
  }

  getSortedWE(idList) {
    return this.getSorted(idList, (x) => x.lng);
  }

  getSortedEW(idList) {
    return this.getSorted(idList, (x) => -x.lng);
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

    const nameRegionType = RegionEntIdx.getNameRegionType(subRegionType);
    const regionIndex = commonStore.allEntIndex[nameRegionType];
    const regionIDField = EntTypes.getIDField(nameRegionType);

    const regionIDToPop = {};
    for (let subRegionID of regionIDList) {
      const regionEnt = subRegionIndex[subRegionID];
      const regionID = regionEnt[regionIDField];
      if (!regionIDToPop[regionID]) {
        regionIDToPop[regionID] = 0;
      }
      regionIDToPop[regionID] += parseInt(regionEnt.population);
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
    return RegionEntIdx.getGenericTableInfo(
      idList,
      commonStore.ethnicityTable,
      {
        sinhalese: ["sinhalese"],
        tamil: ["indian_tamil", "sri_lankan_tamil"],
        moor: ["moor", "malay"],
      }
    );
  }

  static getReligionInfo(idList) {
    const commonStore = CommonStore.getSingleton();
    return RegionEntIdx.getGenericTableInfo(idList, commonStore.religionTable, {
      buddhist: ["buddhist"],
      hindu: ["hindu"],
      islam: ["islam"],
      christian: ["roman_catholic", "other_christian"],
    });
  }

  static getTotalWastage(idList) {
    const funcDemographicsList = [
      RegionEntIdx.getEthnicityInfo,
      RegionEntIdx.getReligionInfo,
    ];
    return (
      MathX.sum(
        funcDemographicsList.map(function (funcDemographics) {
          return RegionEntIdx.getWastage(idList, funcDemographics);
        })
      ) / funcDemographicsList.length
    );
  }

  static getWastage(idList, funcDemographics) {
    const d = funcDemographics(idList);
    return 1 - Object.values(d)[0];
  }
}
