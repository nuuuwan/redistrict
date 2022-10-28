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

  static getMostCommonDSDName(regionIDList) {
    const commonStore = CommonStore.getSingleton();
    const subRegionType = EntTypes.getEntType(regionIDList[0]);
    const subRegionIndex = commonStore.allEntIndex[subRegionType];
    const regionIndex = commonStore.allEntIndex[ENT_TYPES.DSD];

    const dsdIDToPop = {};
    for (let regionID of regionIDList) {
      const regionEnt = subRegionIndex[regionID];
      const dsdID = regionEnt.id.substring(0, 7);
      if (!dsdIDToPop[dsdID]) {
        dsdIDToPop[dsdID] = 0;
      }
      dsdIDToPop[dsdID] += parseInt(regionEnt.population);
    }

    const mostPopDSDID = Object.entries(dsdIDToPop).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
    return regionIndex[mostPopDSDID].name;
  }

  static getDemographicInfo(idList) {
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
    return { sinhalese, tamil, moor, others };
  }
}
