import EntTypes from "../../../nonview/base/EntTypes";
import Cache from "../../../nonview/base/Cache";
import WWW from "../../../nonview/base/WWW";

const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/geo-data/main/";

export default class GeoJSON {
  constructor(regionID, subRegionType) {
    this.regionID = regionID;
    this.subRegionType = subRegionType;
  }

  get cacheKey() {
    return `geojson-${this.regionID}-${this.subRegionType}`;
  }

  get rawDataURL() {
    return URL_BASE + `${this.subRegionType}.geojson`;
  }

  async readNoCache() {
    const regionType = EntTypes.getEntType(this.regionID);
    const regionIDField = EntTypes.getIDField(regionType);
    let rawData = await WWW.json(this.rawDataURL);

    rawData.features = rawData.features.filter(
      function (feature) {
        return feature.properties[regionIDField] === this.regionID;
      }.bind(this)
    );
    return rawData;
  }

  async read() {
    return await Cache.get(
      this.cacheKey,
      this.readNoCache.bind(this),
    );
  }
}
