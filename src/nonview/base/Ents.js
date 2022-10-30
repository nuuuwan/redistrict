import EntTypes from "../../nonview/base/EntTypes";
import WWW from "./WWW.js";

const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/gig2/data";
const ID_KEY = "id";
export default class Ents {
  static cleanData(data) {
    data.pop = parseInt(data.population);
    if (data.centroid) {
      data.centroid = JSON.parse(data.centroid);
      const [lat, lng] = data.centroid;
      data.lngLat = { lng, lat };
      data.lng = lng;
      data.lat = lat;
    }
    return data;
  }

  static async getEntsByType(entType) {
    const url = `${URL_BASE}/${entType}.latest.basic.tsv`;
    const rawDataList = await WWW.tsv(url);
    return rawDataList.map((data) => Ents.cleanData(data));
  }

  static async getEntIndexByType(entType) {
    const ents = await Ents.getEntsByType(entType);
    return ents.reduce(function (entIndex, ent) {
      entIndex[ent[ID_KEY]] = ent;
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
    let ent = entIndex[entID];
    if (ent["centroid"]) {
      ent["centroid"] = JSON.parse(ent["centroid"]);
    }
    return ent;
  }

  static getEntIndexForSubRegions(allEntIndex, regionID, subRegionType) {
    const idLength = regionID.length;
    const subRegionEntIndex = allEntIndex[subRegionType];
    return Object.keys(subRegionEntIndex)
      .filter(function (entID, ent) {
        return entID.substring(0, idLength) === regionID;
      })
      .reduce(function (entIndex, entID) {
        entIndex[entID] = subRegionEntIndex[entID];
        return entIndex;
      }, {});
  }
}