import PolygonView from "../../view/molecules/PolygonView";

export default function GeoJSONFeatureView({ funcTransform, feature, color }) {
  return feature.geometry.coordinates.map(function (polygonList, iPolygonList) {
    return polygonList.map(function (polygon, iPolygon) {
      const key = "polygon-" + iPolygonList + "-" + iPolygon;
      return (
        <g key={key}>
          <PolygonView
            funcTransform={funcTransform}
            polygon={polygon}
            color={color}
          />
        </g>
      );
    });
  });
}
