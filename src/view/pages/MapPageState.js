import { Component } from "react";

import { ENT_TYPES } from "../../nonview/base/EntTypes";
import Ents from "../../nonview/base/Ents";
import CommonStore from "../../nonview/core/CommonStore";
import Partition from "../../nonview/core/Partition";

const DEFAULT_N_SEATS = 20;
const DEFAULT_MAX_SEATS_PER_GROUP = 1;
const DEFAULT_SUBREGION_TYPE = ENT_TYPES.DSD;
const DEFAULT_REGION_ID = "EC-01";
const DEFAULT_COLOR_MODE = "Polling Divisions";

export default class MapPageState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // No Dependencies
      maxSeatsPerGroup: null,
      nSeats: null,
      regionID: null,
      subRegionType: null,
      colorMode: DEFAULT_COLOR_MODE,

      // Depends on: regionID, subRegionType, maxSeatsPerGroup, nSeats
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
    {
      newRegionID,
      newSubRegionType,
      newMaxSeatsPerGroup,
      newNSeats,
      newColorMode,
    },
    otherState = {}
  ) {
    let {
      regionID,
      subRegionType,
      maxSeatsPerGroup,
      nSeats,
      colorMode,
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

    const isChangedColorMode = isChanged(newColorMode, colorMode);
    if (isChangedColorMode) {
      colorMode = newColorMode;
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

    if (
      isChangedRegionID ||
      isChangedSubRegionType ||
      isChangedMaxSeatsPerGroup ||
      isChangedNSeats
    ) {
      const regionIdx = Ents.getEntIndexForSubRegions(
        commonStoreSingleton.allEntIndex,
        regionID,
        subRegionType
      );
      partition = new Partition(regionIdx, nSeats);
      partition.partitionAll(maxSeatsPerGroup);
    }

    this.setState({
      ...{
        regionID,
        subRegionType,
        maxSeatsPerGroup,
        nSeats,
        colorMode,
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

  async setColorMode(newColorMode) {
    await this.setStateWithDependencies({ newColorMode });
  }

  async componentDidMount() {
    const commonStoreSingleton = await CommonStore.loadSingleton();

    await this.setStateWithDependencies(
      {
        newMaxSeatsPerGroup: DEFAULT_MAX_SEATS_PER_GROUP,
        newNSeats: DEFAULT_N_SEATS,
        newRegionID: DEFAULT_REGION_ID,
        newSubRegionType: DEFAULT_SUBREGION_TYPE,
        newColorMode: DEFAULT_COLOR_MODE,
      },
      { commonStoreSingleton }
    );
  }
}
