import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";
import Weight from "../../nonview/core/Weight";

export default function WeightView({ weight }) {
  const color = Weight.getColor(weight);

  return (
    <Stack
      direction="column"
      sx={{ textAlign: "right", width: 100 }}
      color={color}
    >
      <Typography variant="h6">{Weight.signed(weight)}</Typography>
      <Typography variant="caption">
        {t(Weight.getMagnitudeText(weight))}
      </Typography>
      <Typography variant="caption">
        {t(Weight.getDirectionText(weight))}
      </Typography>
    </Stack>
  );
}
