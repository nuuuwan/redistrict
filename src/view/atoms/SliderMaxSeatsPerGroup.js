import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import MathX from "../../nonview/base/MathX";

const [MIN, MAX] = [1, 20];

export default function SliderMaxSeatsPerGroup({
  maxSeatsPerGroup,
  setMaxSeatsPerGroup,
}) {
  const onChange = function (_, maxSeatsPerGroup) {
    setMaxSeatsPerGroup(maxSeatsPerGroup);
  };
  const marks = MathX.range(MIN, MAX + 1).map(function (value) {
    return { value, label: value };
  });
  return (
    <Box width={500}>
      <Typography variant="caption">Max. Seats per Group</Typography>
      <Slider
        min={MIN}
        max={MAX}
        value={maxSeatsPerGroup}
        marks={marks}
        onChange={onChange}
        aria-label="Small"
        size="small"
        valueLabelDisplay="on"
      />
    </Box>
  );
}
