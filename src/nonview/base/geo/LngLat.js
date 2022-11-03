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

  static MIN = new LngLat(-180, -180);
  static MAX = new LngLat(180, 180);
}
