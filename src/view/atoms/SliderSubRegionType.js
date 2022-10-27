import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const SUB_REGION_TYPES = ["dsd", "gnd"];

export default function SliderSubRegionType({
  subRegionType,
  setSubRegionType,
}) {
  const selectedValue = SUB_REGION_TYPES.reduce(function (
    selectedValue,
    subRegionType2,
    value
  ) {
    if (subRegionType === subRegionType2) {
      return value;
    }
    return selectedValue;
  },
  undefined);

  const marks = SUB_REGION_TYPES.map(function (subRegionType, value) {
    return { value, subRegionType, label: subRegionType.toUpperCase() };
  });

  const onChange = function (_, newValue) {
    const subRegionType = marks[newValue].subRegionType;
    console.debug(subRegionType);
    setSubRegionType(subRegionType);
  };

  return (
    <Box width={100}>
      <Typography variant="caption">Sub-Region Type</Typography>
      <Slider
        value={selectedValue}
        min={0}
        max={marks.length - 1}
        marks={marks}
        onChange={onChange}
        aria-label="Small"
        size="small"
      />
    </Box>
  );
}
