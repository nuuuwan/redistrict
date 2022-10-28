import { Component } from "react";

import { ENT_TYPES } from "../../nonview/base/EntTypes";
import Ents from "../../nonview/base/Ents";
import GeoJSON from "../../nonview/base/geo/GeoJSON";
import CommonStore from "../../nonview/core/CommonStore";
import Partition from "../../nonview/core/Partition";

const DEFAULT_N_SEATS = 2;
const DEFAULT_MAX_SEATS_PER_GROUP = 1;
const DEFAULT_SUBREGION_TYPE = "dsd";
const DEFAULT_REGION_ID = "LK-11";

export default class MapPageState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commonStoreSingleton: null,
      geoJSON: null,
      groupToIDListAndNSeats: null,
      maxSeatsPerGroup: DEFAULT_MAX_SEATS_PER_GROUP,
      nSeats: DEFAULT_N_SEATS,
      partition: null,
      regionID: DEFAULT_REGION_ID,
      subRegionType: DEFAULT_SUBREGION_TYPE,
    };
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

  async setNSeats(nSeats) {
    const { maxSeatsPerGroup, geoJSON } = this.state;
    const { partition, groupToIDListAndNSeats } = await this.loadStateGeo(
      nSeats,
      maxSeatsPerGroup,
      geoJSON
    );
    this.setState({ geoJSON, partition, groupToIDListAndNSeats, nSeats });
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
}
