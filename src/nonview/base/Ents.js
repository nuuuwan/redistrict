import Ent from "../../nonview/base/Ent";
import EntTypes from "../../nonview/base/EntTypes";
import WWW from "./WWW.js";

const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/gig2/data";
export default class Ents {
  static getURLForEntTypeData(entType) {
    return `${URL_BASE}/${entType}.latest.basic.tsv`;
  }
  static async getEntsByType(entType) {
    const url = Ents.getURLForEntTypeData(entType);

    const rawDataList = await WWW.tsv(url);
    return rawDataList.map((d) => new Ent(d));
  }

  static async getEntIndexByType(entType) {
    const ents = await Ents.getEntsByType(entType);
    return ents.reduce(function (entIndex, ent) {
      entIndex[ent.id] = ent;
      return entIndex;
    }, {});
  }

  static async getAllEntIndex() {
    const entTypes = EntTypes.getEntTypes();
    const entIndexList = await Promise.all(
      entTypes.map(async function (entType) {
        return await Ents.getEntIndexByType(entType);
      })
    );

    return entTypes.reduce(function (allEntIndex, entType, iEnt) {
      allEntIndex[entType] = entIndexList[iEnt];
      return allEntIndex;
    }, {});
  }

  static async getEnt(entID) {
    const entType = EntTypes.getEntType(entID);
    const entIndex = await Ents.getEntIndexByType(entType);
    return entIndex[entID];
  }

  static getEntIndexForSubRegions(allEntIndex, regionID, subRegionType) {
    const regionType = EntTypes.getEntType(regionID);
    const subRegionEntIndex = allEntIndex[subRegionType];
    const entIndex = Object.entries(subRegionEntIndex)
      .filter(function ([entID, ent]) {
        return ent.getParentID(regionType) === regionID;
      })
      .reduce(function (entIndex, [entID, ent]) {
        entIndex[entID] = ent;
        return entIndex;
      }, {});
    return entIndex;
  }
}
