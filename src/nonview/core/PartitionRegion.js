export default class PartitionRegion {
  static fromGeoJSONFeature(geojsonFeature) {
    return new PartitionRegion(
      geojsonFeature.properties.id,
      geojsonFeature.properties.name,
      geojsonFeature.properties.population,
      geojsonFeature.properties.centroid
    );
  }

  constructor(id, name, pop, centroid) {
    this.id = id;
    this.pop = pop;
    this.name = name;
    this.centroid = centroid;
  }

  get lat() {
    return this.centroid[0];
  }

  get lng() {
    return this.centroid[1];
  }

  get lngLat() {
    const [lat, lng] = this.centroid;
    return { lng, lat };
  }
}
