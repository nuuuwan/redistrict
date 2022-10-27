import BBox from "../../nonview/base/geo/BBox";
import MathX from "../../nonview/base/MathX";
import PartitionRegion from "../../nonview/core/PartitionRegion";

export default class PartitionRegionIdx {
  static fromGeoJSONFeatures(geojsonFeatures) {
    const idx = geojsonFeatures.reduce(function (idx, geojsonFeature) {
      const partitionRegion =
        PartitionRegion.fromGeoJSONFeature(geojsonFeature);
      idx[partitionRegion.id] = partitionRegion;
      return idx;
    }, {});
    return new PartitionRegionIdx(idx);
  }

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
    return this.getSorted(idList, (x) => x.lat);
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
}
