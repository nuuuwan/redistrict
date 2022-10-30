import BBox from "../../nonview/base/geo/BBox";
import Color from "../../nonview/base/Color";
import LngLat from "../../nonview/base/geo/LngLat";

import { FONT_FAMILY_LIST } from "../../APP_STYLES.js";
import GeoJSONGroupView from "../../view/molecules/GeoJSONGroupView";

const PADDING = 10;

export default function GeoJSONView({ geoJSON, partition }) {
  const [width, height] = [window.innerWidth - 100, window.innerHeight - 350];
  const bbox = BBox.fromGeoJSON(geoJSON);
  const funcTransform = bbox.getTransform(width, height, PADDING);

  const idToFeature = geoJSON.features.reduce(function (idToFeature, feature) {
    idToFeature[feature.id] = feature;
    return idToFeature;
  }, {});

  const groupToName = partition.getGroupToName();
  const groupToIDList = partition.getGroupToIDList();
  const groups = Object.keys(groupToIDList).sort();
  const nGroups = groups.length;

  const innerPolygons = groups.map(function (group, iGroup) {
    const idList = groupToIDList[group];
    const featureList = idList.map((id) => idToFeature[id]);
    const color = Color.getForIter(iGroup, nGroups);
    return (
      <GeoJSONGroupView
        key={"group-" + group}
        funcTransform={funcTransform}
        featureList={featureList}
        color={color}
        group={group}
        groupName={groupToName[group]}
      />
    );
  });

  const innerLabels = groups.map(function (group, iGroup) {
    const idList = groupToIDList[group];
    const featureList = idList.map((id) => idToFeature[id]);

    const [lat, lng] = BBox.getCentroid(
      LngLat.fromPolygonListListList(
        featureList.map((feature) => feature.geometry.coordinates)
      )
    );
    const [x, y] = funcTransform([lng, lat]);

    return (
      <text
        key={"group-label-" + group}
        x={x}
        y={y}
        fill="black"
        stroke="none"
        fontFamily={FONT_FAMILY_LIST[0]}
        fontSize={10}
        textAnchor="middle"
      >
        {groupToName[group]}
      </text>
    );
  });

  return (
    <svg width={width} height={height}>
      {innerPolygons}
      {innerLabels}
    </svg>
  );
}
