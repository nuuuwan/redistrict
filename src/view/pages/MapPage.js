import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import { ENT_TYPES } from "../../nonview/base/EntTypes";
import Ents from "../../nonview/base/Ents";
import GeoJSON from "../../nonview/base/geo/GeoJSON";
import CommonStore from "../../nonview/core/CommonStore";
import Partition from "../../nonview/core/Partition";

import AppColors from "../../view/_constants/AppColors";
import SelectRegionID from "../../view/atoms/SelectRegionID";
import SliderMaxSeatsPerGroup from "../../view/atoms/SliderMaxSeatsPerGroup";
import SliderSeats from "../../view/atoms/SliderSeats";
import SliderSubRegionType from "../../view/atoms/SliderSubRegionType";
import GeoJSONView from "../../view/molecules/GeoJSONView";
import PartitionView from "../../view/molecules/PartitionView";
import AbstractInnerPage from "../../view/pages/AbstractInnerPage";

const DEFAULT_N_SEATS = 2;
const DEFAULT_MAX_SEATS_PER_GROUP = 1;
const DEFAULT_SUBREGION_TYPE = "dsd";
const DEFAULT_REGION_ID = "LK-11";

const STYLE_PAPER_OPTIONS = {
  position: "fixed",
  right: 0,
  top: 0,
  width: 230,
  m: 1,
  p: 2,
  zIndex: 1,
};

const STYLE_BOX_GEOJSONVIEW = {
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 0,
};

const STYLE_PAPER_RESULTS = {
  position: "fixed",
  bottom: 0,
  left: 0,
  maxWidth: 800,
  maxHeight: 300,
  overflow: "scroll",
  m: 1,
  p: 2,
  zIndex: 2,
};

export default class MapPage extends AbstractInnerPage {
  constructor(props) {
    super(props);
    this.state = {
      geoJSON: null,
      partition: null,
      groupToIDListAndNSeats: null,
      nSeats: DEFAULT_N_SEATS,
      maxSeatsPerGroup: DEFAULT_MAX_SEATS_PER_GROUP,
      regionID: DEFAULT_REGION_ID,
      subRegionType: DEFAULT_SUBREGION_TYPE,
      commonStoreSingleton: null,
    };
  }
  get page() {
    return "MapPage";
  }
  get Icon() {
    return PlaylistAddCheckIcon;
  }

  get label() {
    return "Map";
  }

  get color() {
    return AppColors.Primary;
  }

  async setNSeats(nSeats) {
    const { maxSeatsPerGroup, geoJSON } = this.state;
    const { partition, groupToIDListAndNSeats } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({ geoJSON, partition, groupToIDListAndNSeats, nSeats });
  }

  async setMaxSeatsPerGroup(maxSeatsPerGroup) {
    const { nSeats, geoJSON } = this.state;
    const { partition, groupToIDListAndNSeats } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({
      geoJSON,
      partition,
      groupToIDListAndNSeats,
      maxSeatsPerGroup,
    });
  }

  async setSubRegionType(subRegionType) {
    const { regionID, nSeats, maxSeatsPerGroup } = this.state;
    const geoJSON = await new GeoJSON(regionID, subRegionType).read();
    const { partition, groupToIDListAndNSeats } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({
      subRegionType,
      geoJSON,
      partition,
      groupToIDListAndNSeats,
    });
  }

  async setRegionID(regionID) {
    const { subRegionType, nSeats, maxSeatsPerGroup } = this.state;
    const geoJSON = await new GeoJSON(regionID, subRegionType).read();
    const { partition, groupToIDListAndNSeats } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({
      regionID,
      geoJSON,
      partition,
      groupToIDListAndNSeats,
    });
  }

  async loadStateGeo(nSeats, maxSeatsPerGroup, geoJSON) {
    const partition = Partition.fromGeoJSONFeatures(geoJSON.features, nSeats);
    partition.partitionAll(maxSeatsPerGroup);
    const groupToIDListAndNSeats = partition.groupToIDListAndNSeats;
    return { partition, groupToIDListAndNSeats };
  }
  async componentDidMount() {
    const commonStoreSingleton = await CommonStore.loadSingleton();

    const { nSeats, maxSeatsPerGroup, regionID, subRegionType } = this.state;
    const geoJSON = await new GeoJSON(regionID, subRegionType).read();
    const regionDataIndex = await Ents.getEntIndexByType(ENT_TYPES.DISTRICT);
    const { partition, groupToIDListAndNSeats } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({
      geoJSON,
      partition,
      groupToIDListAndNSeats,
      regionDataIndex,
      commonStoreSingleton,
    });
  }

  render() {
    const {
      nSeats,
      maxSeatsPerGroup,
      subRegionType,
      geoJSON,
      partition,
      regionDataIndex,
      groupToIDListAndNSeats,
      regionID,
      commonStoreSingleton,
    } = this.state;

    if (!commonStoreSingleton) {
      return "Loading...";
    }
    return (
      <Box>
        <Paper sx={STYLE_PAPER_OPTIONS}>
          <SelectRegionID
            regionID={regionID}
            setRegionID={this.setRegionID.bind(this)}
            regionDataIndex={regionDataIndex}
          />
          <SliderSubRegionType
            subRegionType={subRegionType}
            setSubRegionType={this.setSubRegionType.bind(this)}
          />
          <SliderMaxSeatsPerGroup
            maxSeatsPerGroup={maxSeatsPerGroup}
            setMaxSeatsPerGroup={this.setMaxSeatsPerGroup.bind(this)}
          />
          <SliderSeats nSeats={nSeats} setNSeats={this.setNSeats.bind(this)} />
        </Paper>
        <Box sx={STYLE_BOX_GEOJSONVIEW}>
          <GeoJSONView
            geoJSON={geoJSON}
            groupToIDListAndNSeats={groupToIDListAndNSeats}
          />
        </Box>
        <Paper sx={STYLE_PAPER_RESULTS}>
          <PartitionView partition={partition} nSeats={nSeats} />
        </Paper>
      </Box>
    );
  }
}
