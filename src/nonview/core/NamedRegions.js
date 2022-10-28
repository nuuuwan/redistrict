import EntTypes from "../../nonview/base/EntTypes";
import CommonStore from "../../nonview/core/CommonStore";

export default class NamedRegions {
  static infer(regionIDList) {
    const regionType = EntTypes.getEntType(regionIDList[0]);
    const commonStore = CommonStore.getSingleton();
    const nameAndPop = regionIDList
      .map((regionID) => commonStore.allEntIndex[regionType][regionID])
      .sort(function (a, b) {
        return b.population - a.population;
      });
    return nameAndPop[0].name;
  }
}
