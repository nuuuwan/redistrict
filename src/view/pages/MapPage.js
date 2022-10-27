import Box from "@mui/material/Box";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import GeoJSON from "../../nonview/base/geo/GeoJSON";
import Partition from "../../nonview/core/Partition";

import AppColors from "../../view/_constants/AppColors";
import SliderMaxSeatsPerGroup from "../../view/atoms/SliderMaxSeatsPerGroup";
import SliderSeats from "../../view/atoms/SliderSeats";
import SliderSubRegionType from "../../view/atoms/SliderSubRegionType";
import GeoJSONView from "../../view/molecules/GeoJSONView";
import PartitionView from "../../view/molecules/PartitionView";
import AbstractInnerPage from "../../view/pages/AbstractInnerPage";

const DEFAULT_N_SEATS = 19;
const DEFAULT_MAX_SEATS_PER_GROUP = 19;
const DEFAULT_SUBREGION_TYPE = "dsd";
const DEFAULT_REGION_ID = "LK-11";
export default class MapPage extends AbstractInnerPage {
  constructor(props) {
    super(props);
    this.state = {
      geoJSON: null,
      partition: null,
      idToGroup: null,
      nSeats: DEFAULT_N_SEATS,
      maxSeatsPerGroup: DEFAULT_MAX_SEATS_PER_GROUP,
      regionID: DEFAULT_REGION_ID,
      subRegionType: DEFAULT_SUBREGION_TYPE,
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
    const { partition, idToGroup } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({ geoJSON, partition, idToGroup, nSeats });
  }

  async setMaxSeatsPerGroup(maxSeatsPerGroup) {
    const { nSeats, geoJSON } = this.state;
    const { partition, idToGroup } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({ geoJSON, partition, idToGroup, maxSeatsPerGroup });
  }

  async setSubRegionType(subRegionType) {
    const { regionID, nSeats, maxSeatsPerGroup } = this.state;
    const geoJSON = await new GeoJSON(regionID, subRegionType).read();
    const { partition, idToGroup } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({ subRegionType, geoJSON, partition, idToGroup });
  }

  async loadStateGeo(nSeats, maxSeatsPerGroup, geoJSON) {
    const partition = Partition.fromGeoJSONFeatures(geoJSON.features, nSeats);
    partition.partitionAll(maxSeatsPerGroup);
    const idToGroup = partition.idToGroup;
    return { partition, idToGroup };
  }
  async componentDidMount() {
    const { nSeats, maxSeatsPerGroup, regionID, subRegionType } = this.state;
    const geoJSON = await new GeoJSON(regionID, subRegionType).read();
    const { partition, idToGroup } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({ geoJSON, partition, idToGroup });
  }

  render() {
    const {
      nSeats,
      maxSeatsPerGroup,
      subRegionType,
      geoJSON,
      partition,
      idToGroup,
    } = this.state;
    if (!geoJSON) {
      return "Loading...";
    }
    return (
      <Box>
        <SliderSubRegionType
          subRegionType={subRegionType}
          setSubRegionType={this.setSubRegionType.bind(this)}
        />
        <SliderMaxSeatsPerGroup
          maxSeatsPerGroup={maxSeatsPerGroup}
          setMaxSeatsPerGroup={this.setMaxSeatsPerGroup.bind(this)}
        />
        <SliderSeats nSeats={nSeats} setNSeats={this.setNSeats.bind(this)} />
        <GeoJSONView geoJSON={geoJSON} idToGroup={idToGroup} />
        <PartitionView partition={partition} nSeats={nSeats} />
      </Box>
    );
  }
}
