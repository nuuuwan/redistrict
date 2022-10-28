import WWW from "../../../nonview/base/WWW";

const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/geo-data/main/";

export default class GeoJSON {
  constructor(regionID, subRegionType) {
    this.regionID = regionID;
    this.subRegionType = subRegionType;
  }

  get rawDataURL() {
    return URL_BASE + `${this.subRegionType}.geojson`;
  }

  async read() {
    let rawData = await WWW.json(this.rawDataURL);
    rawData.features = rawData.features.filter(
      function (feature) {
        return feature.id.includes(this.regionID);
      }.bind(this)
    );
    return rawData;
  }
}
