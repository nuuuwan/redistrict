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

  get idList() {
    return Object.keys(this.idx);
  }

  get partitionRegionList() {
    return Object.values(this.idx);
  }

  get totalPop() {
    return MathX.sumGeneric(
      this.partitionRegionList,
      (partitionRegion) => partitionRegion.pop
    );
  }
}
