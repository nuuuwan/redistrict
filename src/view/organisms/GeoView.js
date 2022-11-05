import { Component } from "react";

import BBox from "../../nonview/base/geo/BBox";
import Color from "../../nonview/base/Color";
import Geo from "../../nonview/base/geo/Geo";
import LngLat from "../../nonview/base/geo/LngLat";
import StringX from "../../nonview/base/StringX";
import ETHNO_RELIGION_TO_COLOR from "../../nonview/constants/ETHNO_RELIGION_TO_COLOR";
import Partition from "../../nonview/core/Partition";
import RegionIdx from "../../nonview/core/RegionIdx";
import Seats from "../../nonview/core/Seats";

import { FONT_FAMILY_LIST } from "../../APP_STYLES.js";
import RegionGeoView from "../../view/organisms/RegionGeoView";

const PADDING = 10;
const [MARGIN_WIDTH, MARGIN_HEIGHT] = [100, 300];

export default class GeoView extends Component {
  constructor(props) {
    super(props);
    this.state = { idToPolygonList: null };
  }

  async componentDidMount() {
    const { partition } = this.props;
    const regionIDList = partition.regionIdx.idList;
    const idToPolygonList = await Geo.getIDToPolygonList(regionIDList);
    this.setState({ idToPolygonList });
  }

  render() {
    const { idToPolygonList } = this.state;
    if (!idToPolygonList) {
      return null;
    }
    const { partition, nSeats, colorMode } = this.props;

    const [width, height] = [
      window.innerWidth - MARGIN_WIDTH,
      window.innerHeight - MARGIN_HEIGHT,
    ];
    const polygonListList = Object.values(idToPolygonList);
    const bbox = BBox.fromLngLatList(
      LngLat.fromPolygonListList(polygonListList)
    );
    const funcTransform = bbox.getTransform(width, height, PADDING);

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

      let color;
      switch (colorMode) {
        case "Balance":
          color = Partition.getColorBalance(nSeatsFairPerNSeats2);
          break;
        case "Religion":
          const religionInfo = RegionIdx.getReligionInfo(idList);
          color = ETHNO_RELIGION_TO_COLOR[Object.keys(religionInfo)[0]];
          break;
        case "Ethnicity":
          const ethnicityInfo = RegionIdx.getEthnicityInfo(idList);
          color = ETHNO_RELIGION_TO_COLOR[Object.keys(ethnicityInfo)[0]];
          break;
        default:
          color = Color.getForIter(iGroup, nGroups);
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
      const polygonListList = idList.map((id) => idToPolygonList[id]);
      const [lat, lng] = BBox.getCentroid(
        LngLat.fromPolygonListList(polygonListList)
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
}
