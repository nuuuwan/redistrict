import BBox from "../../nonview/base/geo/BBox";
import Color from "../../nonview/base/Color";

import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";

const PADDING = 10;

const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 100];

export default function GeoJSONView({ geoJSON, idToGroup }) {
  const bbox = BBox.fromGeoJSON(geoJSON);
  const [width, height] = [
    window.innerWidth - MARGIN_WIDTH,
    window.innerHeight - MARGIN_HEIGHT,
  ];
  const funcTransform = bbox.getTransform(width, height, PADDING);
  const inner = geoJSON.features.map(function (feature, iFeature) {
    const group = idToGroup[feature.id];
    const color = Color.getForKey(group);
    return (
      <GeoJSONFeatureView
        key={"feature-" + feature.id}
        funcTransform={funcTransform}
        feature={feature}
        color={color}
      />
    );
  });
  return (
    <svg width={width} height={height}>
      {inner}
    </svg>
  );
}
