import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { ENT_TYPES } from "../../nonview/base/EntTypes";
import CommonStore from "../../nonview/core/CommonStore";

export default function SelectRegionID({ regionID, setRegionID }) {
  const onChange = function (e) {
    setRegionID(e.target.value);
  };

  const commonStore = CommonStore.getSingleton();
  const regionIndex = commonStore.allEntIndex[ENT_TYPES.ED];

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Electoral District</InputLabel>
        <Select value={regionID} label="Electoral District" onChange={onChange}>
          {Object.values(regionIndex).map(function (region) {
            return (
              <MenuItem key={"region-" + region.id} value={region.id}>
                {region.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
