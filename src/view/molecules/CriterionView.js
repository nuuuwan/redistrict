import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";
import Weight from "../../nonview/core/Weight";

import WeightView from "../../view/molecules/WeightView";

export default function CriterionView({
  iCriterion,
  criterionID,
  onChangeCriterionWeight,
  criterionWeights,
}) {
  const [criterionWeight, setCriterionValue] = useState(
    criterionWeights[iCriterion]
  );

  const onChange = function (e) {
    setCriterionValue(parseInt(e.target.value));
  };

  const onChangeCommitted = function (e) {
    onChangeCriterionWeight(iCriterion, criterionWeight);
  };

  const color = Weight.getColor(criterionWeight);

  return (
    <Card sx={{ m: 1, p: 1 }}>
      <Stack direction="row" gap={1}>
        <Typography variant="caption" color="lightgray">
          {iCriterion + 1}.
        </Typography>
        <Box>
          <Typography variant="body2">{t(criterionID)}</Typography>
          <Box sx={{ m: 1, marginBottom: 0 }}>
            <Slider
              value={criterionWeight}
              min={-100}
              max={100}
              onChange={onChange}
              onChangeCommitted={onChangeCommitted}
              color="neutral"
              sx={{ width: window.innerWidth * 0.5, color }}
            />
          </Box>
        </Box>
        <Typography sx={{ flexGrow: 1 }}> </Typography>
        <WeightView weight={criterionWeight} />
      </Stack>
    </Card>
  );
}
