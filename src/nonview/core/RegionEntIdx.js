import BBox from "../../nonview/base/geo/BBox";
import EntTypes, { ENT_TYPES } from "../../nonview/base/EntTypes";
import MathX from "../../nonview/base/MathX";
import CommonStore from "../../nonview/core/CommonStore";

const NAME_REIGON_TYPE = ENT_TYPES.PD;

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

  getSortedByLat(idList) {
    return this.getSorted(idList, (x) => -x.lat);
  }

  getSortedByLng(idList) {
    return this.getSorted(idList, (x) => x.lng);
  }

  getSortedByLongerSpan(idList) {
    if (this.isLatSpanLongerThanLngSpan(idList)) {
      return this.getSortedByLat(idList);
    }
    return this.getSortedByLng(idList);
  }

  getLatLngList(idList) {
    return idList.map((id) => this.get(id).lngLat);
  }

  isLatSpanLongerThanLngSpan(idList) {
    const latLngList = this.getLatLngList(idList);
    const [minLng, minLat, maxLng, maxLat] = BBox.fromLatLngList(latLngList);
    const latSpan = maxLat - minLat;
    const lngSpan = maxLng - minLng;
    return latSpan > lngSpan;
  }

  getTotalPop(idList) {
    return MathX.sumGeneric(idList, (id) => this.get(id).pop);
  }

  static getMostCommonRegionName(regionIDList) {
    const commonStore = CommonStore.getSingleton();
    const subRegionType = EntTypes.getEntType(regionIDList[0]);
    const subRegionIndex = commonStore.allEntIndex[subRegionType];
    const regionIndex = commonStore.allEntIndex[NAME_REIGON_TYPE];
    const regionIDField = EntTypes.getIDField(NAME_REIGON_TYPE);

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

  static getEthnicityInfo(idList) {
    const commonStore = CommonStore.getSingleton();
    let [sinhalese, tamil, moor, others] = [0, 0, 0, 0];
    for (let id of idList) {
      const tableRow = commonStore.ethnicityTable.getRowByID(id);
      if (!tableRow) {
        continue;
      }

      sinhalese += tableRow.getValue("sinhalese");
      tamil +=
        tableRow.getValue("sri_lankan_tamil") +
        tableRow.getValue("indian_tamil");
      moor += tableRow.getValue("moor") + tableRow.getValue("malay");
      others +=
        tableRow.getValue("bharatha") +
        tableRow.getValue("burgher") +
        tableRow.getValue("chetty");
    }
    const totalPop = sinhalese + tamil + moor + others;
    return {
      sinhalese: sinhalese / totalPop,
      tamil: tamil / totalPop,
      moor: moor / totalPop,
      others: others / totalPop,
    };
  }

  static getReligionInfo(idList) {
    const commonStore = CommonStore.getSingleton();
    let [buddhist, hindu, islam, christian, totalPop] = [0, 0, 0, 0, 0];
    for (let id of idList) {
      const tableRow = commonStore.religionTable.getRowByID(id);
      if (!tableRow) {
        continue;
      }

      buddhist += tableRow.getValue("buddhist");
      hindu += tableRow.getValue("hindu");
      islam += tableRow.getValue("islam");
      christian +=
        tableRow.getValue("roman_catholic") +
        tableRow.getValue("other_christian");

      totalPop += tableRow.sumValue;
    }

    const others = totalPop - buddhist - hindu - islam - christian;

    return {
      buddhist: buddhist / totalPop,
      hindu: hindu / totalPop,
      islam: islam / totalPop,
      christian: christian / totalPop,
      others: others / totalPop,
    };
  }
}
