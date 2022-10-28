import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SelectRegionID({ regionDataIndex, regionID, setRegionID }) {
  const onChange = function (e) {
    setRegionID(e.target.value);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Region ID</InputLabel>
        <Select value={regionID} label="Region ID" onChange={onChange}>
          {Object.values(regionDataIndex).map(function (region) {
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
