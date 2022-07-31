import BBox from "../../nonview/base/geo/BBox";

const [WIDTH, HEIGHT, PADDING] = [500, 500, 10];

function PolygonView({ funcTransform, polygon }) {
  const dList = polygon.map(function (coordinate, iCoordinate) {
    const [x, y] = funcTransform(coordinate);
    const label = iCoordinate === 0 ? "M" : "L";
    return label + parseInt(x) + "," + parseInt(y);
  });
  const d = dList.join("");
  return <path d={d} fill="yellow" stroke="red" />;
}

function GeoJSONFeatureView({ funcTransform, feature }) {
  const polygonListListList = feature.geometry.coordinates;

  return polygonListListList.map(function (polygonList) {
    return polygonList.map(function (polygon) {
      return <PolygonView funcTransform={funcTransform} polygon={polygon} />;
    });
  });
}

export default function GeoJSONView({ geoJSON }) {
  const bbox = BBox.fromGeoJSON(geoJSON);
  const funcTransform = bbox.getTransform(WIDTH, HEIGHT, PADDING);

  const inner = geoJSON.features.map(function (feature, iFeature) {
    return (
      <GeoJSONFeatureView
        key={"feature-" + iFeature}
        funcTransform={funcTransform}
        feature={feature}
      />
    );
  });
  return (
    <svg width={WIDTH} height={HEIGHT}>
      {inner}
    </svg>
  );
}
