import LngLat from "../../../nonview/base/geo/LngLat";

export default class BBox {
  constructor(minLngLat, maxLngLat) {
    this.minLngLat = minLngLat;
    this.maxLngLat = maxLngLat;
  }

  static fromLatLngList(lngLatList) {
    return lngLatList.reduce(
      function ([minLng, minLat, maxLng, maxLat], lngLat) {
        return [
          Math.min(minLng, lngLat.lng),
          Math.min(minLat, lngLat.lat),
          Math.max(maxLng, lngLat.lng),
          Math.max(maxLat, lngLat.lat),
        ];
      },
      [180, 180, -180, -180]
    );
  }

  static fromGeoJSON(geoJSON) {
    const lngLatList = LngLat.fromGeoJSON(geoJSON);
    const [minLng, minLat, maxLng, maxLat] = BBox.fromLatLngList(lngLatList);

    return new BBox(new LngLat(minLng, minLat), new LngLat(maxLng, maxLat));
  }

  getTransform(width, height, padding) {
    const [minLng, minLat, maxLng, maxLat] = [
      this.minLngLat.lng,
      this.minLngLat.lat,
      this.maxLngLat.lng,
      this.maxLngLat.lat,
    ];
    const [lngSpan, latSpan] = [maxLng - minLng, maxLat - minLat];
    const r = (lngSpan * height) / latSpan / width;
    let [widthActual, heightActual] = [
      width - padding * 2,
      height - padding * 2,
    ];
    if (r > 1) {
      heightActual /= r;
    } else {
      widthActual *= r;
    }

    let [widthPadding, heightPadding] = [
      (width - widthActual) / 2,
      (height - heightActual) / 2,
    ];

    const funcTransform = function ([lng, lat]) {
      const px = (lng - minLng) / lngSpan;
      const py = (lat - minLat) / latSpan;
      return [
        px * widthActual + widthPadding,
        (1 - py) * heightActual + heightPadding,
      ];
    };
    return funcTransform;
  }
}
