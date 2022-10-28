import GeoJSONFeatureView from "../../view/molecules/GeoJSONFeatureView";

export default function GeoJSONGroupView({
  funcTransform,
  featureList,
  color,
  group,
}) {
  return (
    <g>
      {featureList.map(function (feature, iFeature) {
        const key = "feature-" + iFeature;
        return (
          <GeoJSONFeatureView
            key={key}
            funcTransform={funcTransform}
            feature={feature}
            color={color}
          />
        );
      })}
    </g>
  );
}
