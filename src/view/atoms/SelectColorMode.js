import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const COLOR_MODE_LIST = [
  "Polling Divisions",
  "Fairness",
  "Religion",
  "Ethnicity",
];

export default function SelectColorMode({ colorMode, setColorMode }) {
  const onChange = function (e) {
    setColorMode(e.target.value);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Color Mode</InputLabel>
        <Select value={colorMode} label="Color Mode" onChange={onChange}>
          {COLOR_MODE_LIST.map(function (colorMode) {
            return (
              <MenuItem key={"color-mode-" + colorMode} value={colorMode}>
                {colorMode}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
