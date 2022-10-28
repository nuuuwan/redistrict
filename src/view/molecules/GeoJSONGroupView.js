import BBox from "../../nonview/base/geo/BBox";
import LngLat from "../../nonview/base/geo/LngLat";

import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";

export default function GeoJSONGroupView({
  funcTransform,
  featureList,
  color,
  group,
  groupName,
}) {
  const [lat, lng] = BBox.getCentroid(
    LngLat.fromPolygonListListList(
      featureList.map((feature) => feature.geometry.coordinates)
    )
  );
  const [x, y] = funcTransform([lng, lat]);
  return (
    <g>
      {featureList.map(function (feature, iFeature) {
        const key = "feature-" + iFeature;
        return (
          <g key={key}>
            <GeoJSONFeatureView
              funcTransform={funcTransform}
              feature={feature}
              color={color}
            />
          </g>
        );
      })}
      <text
        x={x}
        y={y}
        fill="black"
        stroke="none"
        fontFamily="sans-serif"
        fontSize={10}
        textAnchor="middle"
      >
        {groupName}
      </text>
    </g>
  );
}
