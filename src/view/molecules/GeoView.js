import BBox from "../../nonview/base/geo/BBox";
import Color from "../../nonview/base/Color";
import LngLat from "../../nonview/base/geo/LngLat";
import StringX from "../../nonview/base/StringX";
import Partition from "../../nonview/core/Partition";
import Seats from "../../nonview/core/Seats";

import { FONT_FAMILY_LIST } from "../../APP_STYLES.js";
import RegionGeoView from "../../view/organisms/RegionGeoView";

const PADDING = 10;
const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 300];

export default function GeoView({ nSeats, geoJSON, partition, colorMode }) {
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

  const groupToName = partition.getGroupToName();
  const groupToIDList = partition.getGroupToIDList();

  const groups = Object.keys(groupToIDList).sort();
  const nGroups = groups.length;

  const regionIdx = partition.regionIdx;
  const groupToSeats = Seats.divideSeatsForPartition(nSeats, partition);
  const totalPop = regionIdx.totalPop;

  const innerPolygons = groups.map(function (group, iGroup) {
    const idList = groupToIDList[group];
    const totalGroupPop = regionIdx.getTotalPop(idList);
    const nSeatsFair = (totalGroupPop * nSeats) / totalPop;
    const nSeatsFairPerNSeats2 = nSeatsFair / groupToSeats[group];

    let color = Color.getForIter(iGroup, nGroups);
    if (colorMode === "Fairness") {
      color = Partition.getColorFairness(nSeatsFairPerNSeats2);
    }

    return idList.map(function (regionID) {
      return (
        <RegionGeoView
          key={"region-" + regionID}
          funcTransform={funcTransform}
          regionID={regionID}
          color={color}
        />
      );
    });
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
    const nSeats = groupToSeats[group];
    let seatsStr = "";
    if (nSeats !== 1) {
      seatsStr = `(${nSeats})`;
    }

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
        {StringX.shortenName(groupToName[group]) + seatsStr}
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