import { JSONWWW } from "../../nonview/base/WWW";

const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/geo-data/main/";

export default class GeoJSON {
  constructor(regionType) {
    this.regionType = regionType;
  }

  get dataURL() {
    return URL_BASE + `${this.regionType}.geojson`;
  }

  async read() {
    const www = new JSONWWW(this.dataURL);
    return await www.read();
  }
}
