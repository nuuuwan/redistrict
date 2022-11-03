import EntTypes from "../../../nonview/base/EntTypes";
import WWW from "../../../nonview/base/WWW";

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/geo";

export default class Geo {
  static getURLForRegionID(regionID) {
    const regionType = EntTypes.getEntType(regionID);
    return `${URL_BASE}/${regionType}/${regionID}.json`;
  }

  static async getPolygonList(regionID) {
    const url = Geo.getURLForRegionID(regionID);
    return await WWW.json(url);
  }

  static async getIDToPolygonList(regionIDList) {
    const polygonListList = await Promise.all(
      regionIDList.map(async function (regionID) {
        return await Geo.getPolygonList(regionID);
      })
    );

    return regionIDList.reduce(function (idToPolygonList, regionID, i) {
      idToPolygonList[regionID] = polygonListList[i];
      return idToPolygonList;
    }, {});
  }
}
