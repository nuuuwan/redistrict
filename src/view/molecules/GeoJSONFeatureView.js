import GeoJSONPolygonView from "../../view/molecules/GeoJSONPolygonView";

export default function GeoJSONFeatureView({ funcTransform, feature, color }) {
  return feature.geometry.coordinates.map(function (polygonList, iPolygonList) {
    return polygonList.map(function (polygon, iPolygon) {
      const key = "polygon-" + iPolygonList + "-" + iPolygon;
      return (
        <GeoJSONPolygonView
          key={key}
          funcTransform={funcTransform}
          polygon={polygon}
          color={color}
        />
      );
    });
  });
}
