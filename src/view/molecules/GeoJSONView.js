import BBox from "../../nonview/base/geo/BBox";
import MathX from "../../nonview/base/MathX";

import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";

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

    featureToColor[feature.id] = color;
    prevColor = color;
  }
  return featureToColor;
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
