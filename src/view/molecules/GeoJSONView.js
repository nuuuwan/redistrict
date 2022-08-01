import BBox from "../../nonview/base/geo/BBox";


import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";
import Partition from "../../nonview/core/Partition"

const PADDING = 10;

const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 100];



export default function GeoJSONView({ geoJSON }) {
  const bbox = BBox.fromGeoJSON(geoJSON);
  const [width, height] = [
    window.innerWidth - MARGIN_WIDTH,
    window.innerHeight - MARGIN_HEIGHT,
  ];
  const funcTransform = bbox.getTransform(width, height, PADDING);
  const featureToColor = Partition.getFeatureToColor(geoJSON.features);

  const inner = geoJSON.features.map(function (feature, iFeature) {
    return (
      <GeoJSONFeatureView
        key={"feature-" + feature.id}
        funcTransform={funcTransform}
        feature={feature}
        color={featureToColor[feature.id]}
      />
    );
  });
  return (
    <svg width={width} height={height}>
      {inner}
    </svg>
  );
}
