import Box from "@mui/material/Box";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import GeoJSON from "../../nonview/base/geo/GeoJSON";
import Partition from "../../nonview/core/Partition";

import AppColors from "../../view/_constants/AppColors";
import SliderMaxSeatsPerGroup from "../../view/atoms/SliderMaxSeatsPerGroup";
import SliderSeats from "../../view/atoms/SliderSeats";
import GeoJSONView from "../../view/molecules/GeoJSONView";
import PartitionView from "../../view/molecules/PartitionView";
import AbstractInnerPage from "../../view/pages/AbstractInnerPage";

const DEFAULT_N_SEATS = 3;
const DEFAULT_MAX_SEATS_PER_GROUP = 1;
export default class MapPage extends AbstractInnerPage {
  constructor(props) {
    super(props);
    this.state = {
      geoJSON: null,
      partition: null,
      idToGroup: null,
      nSeats: DEFAULT_N_SEATS,
      maxSeatsPerGroup: DEFAULT_MAX_SEATS_PER_GROUP,
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

  async loadStateGeo(nSeats, maxSeatsPerGroup, geoJSON) {
    const partition = Partition.fromGeoJSONFeatures(geoJSON.features, nSeats);
    partition.partitionAll(maxSeatsPerGroup);
    const idToGroup = partition.idToGroup;
    return { partition, idToGroup };
  }
  async componentDidMount() {
    const { nSeats, maxSeatsPerGroup } = this.state;
    const geoJSON = await new GeoJSON("LK-11", "dsd").read();
    const { partition, idToGroup } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({ geoJSON, partition, idToGroup });
  }

  render() {
    const { nSeats, maxSeatsPerGroup, geoJSON, partition, idToGroup } =
      this.state;
    if (!geoJSON) {
      return "Loading...";
    }
    return (
      <Box>
        <GeoJSONView geoJSON={geoJSON} idToGroup={idToGroup} />
        <SliderSeats nSeats={nSeats} setNSeats={this.setNSeats.bind(this)} />
        <SliderMaxSeatsPerGroup
          maxSeatsPerGroup={maxSeatsPerGroup}
          setMaxSeatsPerGroup={this.setMaxSeatsPerGroup.bind(this)}
        />
        <PartitionView partition={partition} />
      </Box>
    );
  }
}
