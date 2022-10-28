import EntTypes, { ENT_TYPES } from "../../nonview/base/EntTypes";
import CommonStore from "../../nonview/core/CommonStore";

export default class NamedRegions {
  static infer(regionIDList) {
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
}
