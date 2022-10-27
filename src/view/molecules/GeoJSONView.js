import BBox from "../../nonview/base/geo/BBox";

import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";
import Partition from "../../nonview/core/Partition";

const PADDING = 10;

const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 100];
function getGroupColor(group) {
  switch(group) {
    case 0: return 'green';
    case 1: return 'orange';
    case 2: return 'yellow';
    case 3: return 'maroon';
    default: return 'gray';
  }
}

export default function GeoJSONView({ geoJSON }) {
  const bbox = BBox.fromGeoJSON(geoJSON);
  const [width, height] = [
    window.innerWidth - MARGIN_WIDTH,
    window.innerHeight - MARGIN_HEIGHT,
  ];
  const funcTransform = bbox.getTransform(width, height, PADDING);
  const featureToGroup = Partition.getFeatureToGroup(geoJSON.features);

  const inner = geoJSON.features.map(function (feature, iFeature) {
    const group = featureToGroup[feature.id];
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
