import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import MathX from "../../nonview/base/MathX";

const [MIN, MAX] = [1, 25];

export default function SliderSeats({ nSeats, setNSeats }) {
  const onChange = function (_, nSeats) {
    setNSeats(nSeats);
  };
  const marks = MathX.range(MIN, MAX + 1).map(function (value) {
    return { value, label: value };
  });
  return (
    <Box width={400}>
      <Typography variant="caption">Total Seats</Typography>
      <Slider
        min={MIN}
        max={MAX}
        value={nSeats}
        marks={marks}
        onChange={onChange}
        aria-label="Small"
        size="small"
      />
    </Box>
  );
}
