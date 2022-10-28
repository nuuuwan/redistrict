import BBox from "../../nonview/base/geo/BBox";
import LngLat from "../../nonview/base/geo/LngLat";
import NamedRegions from "../../nonview/core/NamedRegions";

import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";

export default function GeoJSONGroupView({
  funcTransform,
  featureList,
  color,
  group,
}) {
  const [lat, lng] = BBox.getCentroid(
    LngLat.fromPolygonListListList(
      featureList.map((feature) => feature.geometry.coordinates)
    )
  );
  const [x, y] = funcTransform([lng, lat]);
  const regionIDList = featureList.map((feature) => feature.id);
  const groupName = NamedRegions.infer(regionIDList);

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