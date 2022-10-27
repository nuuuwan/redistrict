import Box from "@mui/material/Box";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import GeoJSON from "../../nonview/base/geo/GeoJSON";
import Partition from "../../nonview/core/Partition";

import AppColors from "../../view/_constants/AppColors";
import SliderSeats from "../../view/atoms/SliderSeats";
import GeoJSONView from "../../view/molecules/GeoJSONView";
import PartitionView from "../../view/molecules/PartitionView";
import AbstractInnerPage from "../../view/pages/AbstractInnerPage";
const DEFAULT_N_SEATS = 3;
export default class MapPage extends AbstractInnerPage {
  constructor(props) {
    super(props);
    this.state = { geoJSON: null, partition: null, idToGroup: null, nSeats: DEFAULT_N_SEATS };
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
    const { geoJSON, partition, idToGroup } = await this.loadStateGeo(nSeats);
    this.setState({ geoJSON, partition, idToGroup, nSeats });
  }

  async loadStateGeo(nSeats) {
    const geoJSON = await new GeoJSON("LK-11", "dsd").read();
    const partition = Partition.fromGeoJSONFeatures(geoJSON.features, nSeats);
    partition.partitionAll();
    const idToGroup = partition.idToGroup;
    return { geoJSON, partition, idToGroup };
  }
  async componentDidMount() {
    const { nSeats } = this.state;
    const { geoJSON, partition, idToGroup } = await this.loadStateGeo(nSeats);
    this.setState({ geoJSON, partition, idToGroup });
  }

  render() {
    const { geoJSON, partition, idToGroup, nSeats } = this.state;
    if (!geoJSON) {
      return "Loading...";
    }
    return (
      <Box>
        <GeoJSONView geoJSON={geoJSON} idToGroup={idToGroup} />
        <SliderSeats nSeats={nSeats} setNSeats={this.setNSeats.bind(this)} />
        <PartitionView partition={partition} />
      </Box>
    );
  }
}
