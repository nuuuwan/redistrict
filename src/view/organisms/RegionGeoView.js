import { Component } from "react";

import Geo from "../../nonview/base/geo/Geo";

import PolygonView from "../../view/molecules/PolygonView";

export default class RegionGeoView extends Component {
  constructor(props) {
    super(props);
    this.state = { polygonList: null };
  }

  async componentDidMount() {
    const { regionID } = this.props;
    const polygonList = await Geo.getPolygonList(regionID);
    this.setState({ polygonList });
  }

  render() {
    const { polygonList } = this.state;
    if (!polygonList) {
      return null;
    }
    const { funcTransform, color, regionID } = this.props;
    return polygonList.map(function (polygon, iPolygon) {
      return (
        <PolygonView
          key={`region-geo-${regionID}-${iPolygon}`}
          funcTransform={funcTransform}
          polygon={polygon}
          color={color}
        />
      );
    });
  }
}
