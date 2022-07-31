import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";

import { t } from "../../nonview/base/I18N";

import AlignCenter from "../../view/atoms/AlignCenter";

const DEFAULT_ICON = CircleIcon;
const LABEL_TO_ICON = {};

export default function IconLabel({
  label,
  star,
  children,
  color,
  additionalText,
}) {
  let Icon = LABEL_TO_ICON[label];
  if (!Icon) {
    Icon = DEFAULT_ICON;
  }

  const starStr = star ? "*" : "";
  return (
    <AlignCenter>
      <Icon sx={{ opacity: 0.33, color }} />
      <Typography variant="caption" sx={{ opacity: 0.5, color }}>
        {additionalText ? additionalText : t(label) + starStr}
      </Typography>
      {children}
    </AlignCenter>
  );
}

// import IconLabel from "../../view/atoms/IconLabel";
