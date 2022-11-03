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
}
