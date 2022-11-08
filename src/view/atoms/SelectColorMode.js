import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { FUNC_DEMOGRAPHICS_INFO_IDX } from "../../nonview/core/RegionIdx";

const COLOR_MODE_LIST = [].concat(
  ["Polling Divisions", "Balance"],
  Object.keys(FUNC_DEMOGRAPHICS_INFO_IDX)
);

export default function SelectColorMode({ colorMode, setColorMode }) {
  const onChange = function (e) {
    setColorMode(e.target.value);
  };

  return (
    <Box sx={{ width: 160 }}>
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
