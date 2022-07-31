import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import GeoJSON from "../../nonview/core/GeoJSON";

import AppColors from "../../view/_constants/AppColors";
import GeoJSONView from "../../view/molecules/GeoJSONView";
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
    const geoJSON = await new GeoJSON("ed").read();
    this.setState({ geoJSON });
  }

  render() {
    const { geoJSON } = this.state;
    if (!geoJSON) {
      return "Loading...";
    }
    return <GeoJSONView geoJSON={geoJSON} />;
  }
}
