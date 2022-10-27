import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import MathX from "../../nonview/base/MathX";

const MAX_SEATS = 20;

export default function SliderSeats({ nSeats, setNSeats }) {
  const onChange = function (_, nSeats) {
    setNSeats(nSeats);
  };
  const marks = MathX.range(1, MAX_SEATS).map(function (value) {
    return { value, label: value };
  });
  return (
    <Box width={300}>
      <Slider
        min={1}
        max={20}
        value={nSeats}
        marks={marks}
        onChange={onChange}
        aria-label="Small"
        size="small"
        valueLabelDisplay="on"
      />
    </Box>
  );
}
