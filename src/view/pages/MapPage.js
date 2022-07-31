import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import AppColors from "../../view/_constants/AppColors";
import AbstractInnerPage from "../../view/pages/AbstractInnerPage";

export default class MapPage extends AbstractInnerPage {
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
    return "TODO";
  }
}
