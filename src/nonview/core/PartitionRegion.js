import MathX from "../../nonview/base/MathX";

export default class PartitionRegion {
  static getTotalPop(partitionRegionList) {
    return MathX.sumGeneric(
      partitionRegionList,
      (partitionRegion) => partitionRegion.pop
    );
  }

  static fromGeoJSONFeature(geojsonFeature) {
    return new PartitionRegion(
      geojsonFeature.properties.id,
      geojsonFeature.properties.population,
      geojsonFeature.properties.centroid
    );
  }

  constructor(id, pop, centroid) {
    this.id = id;
    this.pop = pop;
    this.centroid = centroid;
  }

  get lat() {
    return this.centroid[0];
  }

  get lng() {
    return this.centroid[1];
  }
}
