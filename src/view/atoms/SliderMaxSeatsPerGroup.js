import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import MathX from "../../nonview/base/MathX";

const [MIN, MAX] = [0, 25];

export default function SliderMaxSeatsPerGroup({
  maxSeatsPerGroup,
  setMaxSeatsPerGroup,
}) {
  const onChange = function (_, maxSeatsPerGroup) {
    setMaxSeatsPerGroup(maxSeatsPerGroup);
  };
  const marks = MathX.range(MIN, MAX + 1, 5).map(function (value) {
    return { value, label: value };
  });
  return (
    <Box width={200}>
      <Typography variant="caption">{`Max. Seats per Group (${maxSeatsPerGroup})`}</Typography>
      <Slider
        min={MIN}
        max={MAX}
        value={maxSeatsPerGroup}
        marks={marks}
        onChange={onChange}
        aria-label="Small"
        size="small"
      />
    </Box>
  );
}
