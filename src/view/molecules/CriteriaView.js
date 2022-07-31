import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";
import GroundTruth from "../../nonview/core/GroundTruth";

import CriterionView from "../../view/molecules/CriterionView";

export default function CriteriaView({
  version,
  onChangeCriterionWeight,
  criterionWeights,
  refHomePage,
}) {
  const criteria = GroundTruth.getCriteria(version);
  return (
    <Stack gap={1} ref={refHomePage}>
      <Typography sx={{ color: "lightgray", fontSize: "50%" }}>
        {t("000 Version", version)}
      </Typography>
      {criteria.map(function (criterionID, iCriterion) {
        const key = "criterion-" + version + "-" + criterionID;
        return (
          <CriterionView
            key={key}
            iCriterion={iCriterion}
            criterionID={criterionID}
            criterionWeights={criterionWeights}
            onChangeCriterionWeight={onChangeCriterionWeight}
          />
        );
      })}
    </Stack>
  );
}
