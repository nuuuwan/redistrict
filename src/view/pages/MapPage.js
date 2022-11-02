import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SelectRegionID from "../../view/atoms/SelectRegionID";
import SelectColorMode from "../../view/atoms/SelectColorMode";
import GeoJSONView from "../../view/molecules/GeoJSONView";
import SliderMaxSeatsPerGroup from "../../view/atoms/SliderMaxSeatsPerGroup";
import SliderSeats from "../../view/atoms/SliderSeats";
import SliderSubRegionType from "../../view/atoms/SliderSubRegionType";

import PartitionView from "../../view/molecules/PartitionView";

import {
  MIN_SCREEN_WIDTH,
  STYLE_PAPER_OPTIONS,
  STYLE_BOX_GEOJSONVIEW,
  STYLE_PAPER_RESULTS,
} from "../../view/pages/MAP_PAGE_STYLE";

import MapPageState from "../../view/pages/MapPageState";

export default class MapPage extends MapPageState {
  renderAlert() {
    return (
      <Alert severity="warning">
        This app is designed for screen widths of {MIN_SCREEN_WIDTH} pixels or
        more.
      </Alert>
    );
  }
  render() {
    if (window.innerWidth < MIN_SCREEN_WIDTH) {
      return this.renderAlert();
    }
    const {
      // no deps
      maxSeatsPerGroup,
      nSeats,
      regionID,
      subRegionType,
      colorMode,
      // deps
      geoJSON,
      partition,
      // house-keeping...
      isLoaded,
    } = this.state;

    if (!isLoaded) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <Paper sx={STYLE_PAPER_OPTIONS}>
          <SelectRegionID
            regionID={regionID}
            setRegionID={this.setRegionID.bind(this)}
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
          <SelectColorMode
            colorMode={colorMode}
            setColorMode={this.setColorMode.bind(this)}
          />
        </Paper>
        <Box sx={STYLE_BOX_GEOJSONVIEW}>
          <GeoJSONView
            nSeats={nSeats}
            geoJSON={geoJSON}
            partition={partition}
            colorMode={colorMode}
          />
        </Box>
        <Paper sx={STYLE_PAPER_RESULTS}>
          <PartitionView
            partition={partition}
            nSeats={nSeats}
            subRegionType={subRegionType}
          />
        </Paper>
      </Box>
    );
  }
}
