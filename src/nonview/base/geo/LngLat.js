export default class LngLat {
  constructor(lng, lat) {
    this.lng = lng;
    this.lat = lat;
  }

  static fromCoordinate(coordinate) {
    const [lng, lat] = coordinate;
    return new LngLat(lng, lat);
  }

  static fromPolygon(polygon) {
    return polygon.reduce(function (lngLatList, coordinate) {
      lngLatList.push(LngLat.fromCoordinate(coordinate));
      return lngLatList;
    }, []);
  }

  static fromPolygonList(polygonList) {
    return polygonList.reduce(function (lngLatList, polygon) {
      return [].concat(lngLatList, LngLat.fromPolygon(polygon));
    }, []);
  }

  static fromPolygonListList(polygonListList) {
    return polygonListList.reduce(function (lngLatList, polygonList) {
      return [].concat(lngLatList, LngLat.fromPolygonList(polygonList));
    }, []);
  }

  static fromPolygonListListList(polygonListListList) {
    return polygonListListList.reduce(function (lngLatList, polygonListList) {
      return [].concat(lngLatList, LngLat.fromPolygonListList(polygonListList));
    }, []);
  }

  static fromGeoJSON(geoJSON) {
    return geoJSON.features.reduce(function (lngLatList, feature) {
      const geometry = feature.geometry;
      const geoType = geometry.type;
      if (geoType === "MultiPolygon") {
        return geometry.coordinates.reduce(function (lngLatList, polygonList) {
          return [].concat(lngLatList, LngLat.fromPolygonList(polygonList));
        }, lngLatList);
      }
      throw Error("Unknown geometry.type: " + geoType);
    }, []);
  }

  static MIN = new LngLat(-180, -180);
  static MAX = new LngLat(180, 180);
}
