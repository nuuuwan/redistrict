import LngLat from "../../nonview/base/geo/LngLat";
import BBox from "../../nonview/base/geo/BBox";
import GeoJSONPolygonView from "../../view/molecules/GeoJSONPolygonView";

export default function GeoJSONFeatureView({ funcTransform, feature, color, group }) {
  const [lat, lng] = BBox.getCentroid(LngLat.fromPolygonListList(feature.geometry.coordinates));
  const [x, y] = funcTransform([lng, lat]);

  return feature.geometry.coordinates.map(function (polygonList, iPolygonList) {
    return polygonList.map(function (polygon, iPolygon) {
      const key = "polygon-" + iPolygonList + "-" + iPolygon;
      return (
        <g key={key}>
          <GeoJSONPolygonView
            funcTransform={funcTransform}
            polygon={polygon}
            color={color}
          />
          <text
            x={x}
            y={y}
            fill="black"
            stroke="none"
            fontFamily="sans-serif"
            fontSize={10}
          >
            {group}
          </text>
        </g>
      );
    });
  });
}
