import LngLat from "../../../nonview/base/geo/LngLat";

export default class BBox {
  constructor(minLngLat, maxLngLat) {
    this.minLngLat = minLngLat;
    this.maxLngLat = maxLngLat;
  }

  static fromLngLatList(lngLatList) {
    const [minLng, minLat, maxLng, maxLat] = lngLatList.reduce(
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

  static getCentroid(lngLatList) {
    const bbox = BBox.fromLngLatList(lngLatList);
    return [
      (bbox.minLngLat.lat + bbox.maxLngLat.lat) / 2,
      (bbox.minLngLat.lng + bbox.maxLngLat.lng) / 2,
    ];
  }
}
