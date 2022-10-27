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

  getSorted(funcKey) {
    return this.idList.sort(
  get partitionRegionList() {
    return Object.keys(this.idx);
  }
      function (idA, idB) {
        return funcKey(this.idx[idA]) - funcKey(this.idx[idB]);
      }.bind(this)
    );
  }

  get sortedByLat() {
    return this.getSorted((x) => x.lat);
  }

  get sortedByLng() {
    return this.getSorted((x) => x.lng);
  }

  }

  get totalPop() {
    return MathX.sumGeneric(
      this.partitionRegionList,
      (partitionRegion) => partitionRegion.pop
    );
  }
}
