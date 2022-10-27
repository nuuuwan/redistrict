import Box from "@mui/material/Box";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import GeoJSON from "../../nonview/base/geo/GeoJSON";
import Partition from "../../nonview/core/Partition";

import AppColors from "../../view/_constants/AppColors";
import GeoJSONView from "../../view/molecules/GeoJSONView";
import PartitionView from "../../view/molecules/PartitionView";
import AbstractInnerPage from "../../view/pages/AbstractInnerPage";

export default class MapPage extends AbstractInnerPage {
  constructor(props) {
    super(props);
    this.state = { geoJSON: null };
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

  async componentDidMount() {
    const geoJSON = await new GeoJSON("LK-11", "dsd").read();

    const partition = Partition.fromGeoJSONFeatures(geoJSON.features, 5);
    partition.partitionAll();
    const idToGroup = partition.idToGroup;

    this.setState({ geoJSON, partition, idToGroup });
  }

  render() {
    const { geoJSON, partition, idToGroup } = this.state;
    if (!geoJSON) {
      return "Loading...";
    }
    return (
      <Box>
        <GeoJSONView geoJSON={geoJSON} idToGroup={idToGroup} />
        <PartitionView partition={partition} />
      </Box>
    );
  }
}
