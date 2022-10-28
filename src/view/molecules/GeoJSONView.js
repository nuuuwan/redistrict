import BBox from "../../nonview/base/geo/BBox";
import Color from "../../nonview/base/Color";

import GeoJSONGroupView from "../../view/molecules/GeoJSONGroupView";

const PADDING = 10;
const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 100];

export default function GeoJSONView({ geoJSON, groupToIDListAndNSeats }) {
  const [width, height] = [
    window.innerWidth - MARGIN_WIDTH,
    window.innerHeight - MARGIN_HEIGHT,
  ];
  const bbox = BBox.fromGeoJSON(geoJSON);
  const funcTransform = bbox.getTransform(width, height, PADDING);

  const idToFeature = geoJSON.features.reduce(function (idToFeature, feature) {
    idToFeature[feature.id] = feature;
    return idToFeature;
  }, {});

  const groups = Object.keys(groupToIDListAndNSeats).sort();
  const nGroups = groups.length;
  const inner = groups.map(function (group, iGroup) {
    const { idList } = groupToIDListAndNSeats[group];
    const featureList = idList.map((id) => idToFeature[id]);
    const color = Color.getForIter(iGroup, nGroups);
    return (
      <GeoJSONGroupView
        key={"group-" + group}
        funcTransform={funcTransform}
        featureList={featureList}
        color={color}
        group={group}
      />
    );
  });

  return (
    <svg width={width} height={height}>
      {inner}
    </svg>
  );
}
