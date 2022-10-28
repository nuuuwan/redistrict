import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import AppColors from "../../view/_constants/AppColors";
import SelectRegionID from "../../view/atoms/SelectRegionID";
import SliderMaxSeatsPerGroup from "../../view/atoms/SliderMaxSeatsPerGroup";
import SliderSeats from "../../view/atoms/SliderSeats";
import SliderSubRegionType from "../../view/atoms/SliderSubRegionType";
import GeoJSONView from "../../view/molecules/GeoJSONView";
import PartitionView from "../../view/molecules/PartitionView";

import {
  STYLE_PAPER_OPTIONS,
  STYLE_BOX_GEOJSONVIEW,
  STYLE_PAPER_RESULTS,
} from "../../view/pages/MAP_PAGE_STYLE";
import MapPageState from "../../view/pages/MapPageState";

export default class MapPage extends MapPageState {
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
