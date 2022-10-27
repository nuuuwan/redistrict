import BBox from "../../nonview/base/geo/BBox";
import Color from "../../nonview/base/Color";
import Partition from "../../nonview/core/Partition";

import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";

const PADDING = 10;

const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 100];
const N_COLORS = 7;
let groupToColor = {};
function getGroupColor(group) {
  if (!groupToColor[group]) {
    groupToColor[group] = Color.getRandom();
  }
  return groupToColor[group];
}

export default function GeoJSONView({ geoJSON }) {
  const bbox = BBox.fromGeoJSON(geoJSON);
  const [width, height] = [
    window.innerWidth - MARGIN_WIDTH,
    window.innerHeight - MARGIN_HEIGHT,
  ];
  const funcTransform = bbox.getTransform(width, height, PADDING);
  const idToGroup = Partition.getIDToGroup(geoJSON.features);

  const inner = geoJSON.features.map(function (feature, iFeature) {
    const group = idToGroup[feature.id];
    const color = getGroupColor(group);
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
