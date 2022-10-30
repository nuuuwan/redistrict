import { Component } from "react";

import { ENT_TYPES } from "../../nonview/base/EntTypes";
import Ents from "../../nonview/base/Ents";
import GeoJSON from "../../nonview/base/geo/GeoJSON";
import CommonStore from "../../nonview/core/CommonStore";
import Partition from "../../nonview/core/Partition";

const DEFAULT_N_SEATS = 20;
const DEFAULT_MAX_SEATS_PER_GROUP = 20;
const DEFAULT_SUBREGION_TYPE = ENT_TYPES.PD;
const DEFAULT_REGION_ID = "EC-01";

export default class MapPageState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // No Dependencies
      maxSeatsPerGroup: null,
      nSeats: null,
      regionID: null,
      subRegionType: null,

      // Depends on: regionID, subRegionType
      geoJSON: null,

      // Depends on: regionID, subRegionType, maxSeatsPerGroup, nSeats, geoJSON
      partition: null,

      // Other
      commonStoreSingleton: null,

      // House Keeping...
      isLoaded: false,
    };
  }

  async setStateWithDependencies(state, otherState) {
    this.setState(
      { isLoaded: false },
      async function () {
        await this.setStateWithDependenciesInner(state, otherState);
      }.bind(this)
    );
  }

  async setStateWithDependenciesInner(
    { newRegionID, newSubRegionType, newMaxSeatsPerGroup, newNSeats },
    otherState = {}
  ) {
    let {
      regionID,
      subRegionType,
      maxSeatsPerGroup,
      nSeats,
      geoJSON,
      partition,
      commonStoreSingleton,
    } = this.state;

    if (!commonStoreSingleton) {
      commonStoreSingleton = otherState.commonStoreSingleton;
    }

    const isChanged = function (newA, a) {
      return newA !== undefined && newA !== a;
    };

    const isChangedRegionID = isChanged(newRegionID, regionID);
    if (isChangedRegionID) {
      regionID = newRegionID;
    }

    const isChangedSubRegionType = isChanged(newSubRegionType, subRegionType);
    if (isChangedSubRegionType) {
      subRegionType = newSubRegionType;
    }

    const isChangedMaxSeatsPerGroup = isChanged(
      newMaxSeatsPerGroup,
      maxSeatsPerGroup
    );
    if (isChangedMaxSeatsPerGroup) {
      maxSeatsPerGroup = newMaxSeatsPerGroup;
    }

    const isChangedNSeats = isChanged(newNSeats, nSeats);
    if (isChangedNSeats) {
      nSeats = newNSeats;
    }

    const isChangedGeoJSON = isChangedRegionID || isChangedSubRegionType;
    if (isChangedGeoJSON) {
      geoJSON = await new GeoJSON(regionID, subRegionType).read();
    }

    if (
      isChangedRegionID ||
      isChangedSubRegionType ||
      isChangedMaxSeatsPerGroup ||
      isChangedNSeats ||
      isChangedGeoJSON
    ) {
      const regionEntIdx = Ents.getEntIndexForSubRegions(
        commonStoreSingleton.allEntIndex,
        regionID,
        subRegionType
      );
      partition = new Partition(regionEntIdx, nSeats);
      partition.partitionAll(maxSeatsPerGroup);
    }

    this.setState({
      ...{
        regionID,
        subRegionType,
        maxSeatsPerGroup,
        nSeats,
        geoJSON,
        partition,
        isLoaded: true,
      },
      ...otherState,
    });
  }

  async setRegionID(newRegionID) {
    await this.setStateWithDependencies({ newRegionID });
  }

  async setSubRegionType(newSubRegionType) {
    await this.setStateWithDependencies({ newSubRegionType });
  }

  async setMaxSeatsPerGroup(newMaxSeatsPerGroup) {
    await this.setStateWithDependencies({ newMaxSeatsPerGroup });
  }

  async setNSeats(newNSeats) {
    await this.setStateWithDependencies({ newNSeats });
  }

  async componentDidMount() {
    const commonStoreSingleton = await CommonStore.loadSingleton();

    await this.setStateWithDependencies(
      {
        newMaxSeatsPerGroup: DEFAULT_MAX_SEATS_PER_GROUP,
        newNSeats: DEFAULT_N_SEATS,
        newRegionID: DEFAULT_REGION_ID,
        newSubRegionType: DEFAULT_SUBREGION_TYPE,
      },
      { commonStoreSingleton }
    );
  }
}
