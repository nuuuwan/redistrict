import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import AppColors from "../../view/_constants/AppColors";
import CriteriaView from "../../view/molecules/CriteriaView";
import AbstractInnerPage from "../../view/pages/AbstractInnerPage";

export default class CriteriaPage extends AbstractInnerPage {
  get page() {
    return "CriteriaPage";
  }
  get Icon() {
    return PlaylistAddCheckIcon;
  }

  get label() {
    return "Criteria";
  }

  get color() {
    return AppColors.Criterion;
  }

  render() {
    const { context, onChangeCriterionWeight, criterionWeights, refHomePage } =
      this.props;
    const version = context.version;
    return (
      <CriteriaView
        refHomePage={refHomePage}
        version={version}
        onChangeCriterionWeight={onChangeCriterionWeight}
        criterionWeights={criterionWeights}
      />
    );
  }
}
