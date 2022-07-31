import BBox from "../../nonview/base/geo/BBox";
import MathX from "../../nonview/base/MathX";

const PADDING = 10;

const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 100];

function getFeatureToColor(features) {
  let featureToColor = {};

  const totalPopulation = MathX.sumGeneric(
    features,
    (feature) => feature.properties.population
  );

  const sortedFeatures = features.sort(function (a, b) {
    return a.properties.centroid[1] > b.properties.centroid[1];
  });

  let cumPopulation = 0;
  let prevColor = null;
  for (let feature of sortedFeatures) {
    cumPopulation += feature.properties.population;
    const pPopulation = cumPopulation / totalPopulation;
    let color;
    if (pPopulation < 0.5) {
      color = "green";
    } else {
      color = "maroon";
    }
    if (prevColor !== color) {
      console.debug("-----------");
    }
    console.debug(feature.properties.name, pPopulation, color);
    featureToColor[feature.id] = color;
    prevColor = color;
  }
  return featureToColor;
}

function PolygonView({ funcTransform, polygon, color }) {
  const dList = polygon.map(function (coordinate, iCoordinate) {
    const [x, y] = funcTransform(coordinate);
    const label = iCoordinate === 0 ? "M" : "L";
    return label + parseInt(x) + "," + parseInt(y);
  });
  const d = dList.join("");
  return <path d={d} fill={color} stroke="white" strokeWidth="1" />;
}

function GeoJSONFeatureView({ funcTransform, feature, color }) {
  return feature.geometry.coordinates.map(function (polygonList, iPolygonList) {
    return polygonList.map(function (polygon, iPolygon) {
      const key = "polygon-" + iPolygonList + "-" + iPolygon;
      return (
        <PolygonView
          key={key}
          funcTransform={funcTransform}
          polygon={polygon}
          color={color}
        />
      );
    });
  });
}

export default function GeoJSONView({ geoJSON }) {
  const bbox = BBox.fromGeoJSON(geoJSON);
  const [width, height] = [
    window.innerWidth - MARGIN_WIDTH,
    window.innerHeight - MARGIN_HEIGHT,
  ];
  const funcTransform = bbox.getTransform(width, height, PADDING);
  const featureToColor = getFeatureToColor(geoJSON.features);

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
