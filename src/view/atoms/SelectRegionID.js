import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const REGION_LIST = [
  { id: "LK-11", name: "Colombo" },
  { id: "LK-12", name: "Gampaha" },
  { id: "LK-13", name: "Kalutara" },
  { id: "LK-21", name: "Kandy" },
  { id: "LK-22", name: "Matale" },
  { id: "LK-23", name: "Nuwara Eliya" },
  { id: "LK-31", name: "Galle" },
  { id: "LK-32", name: "Matara" },
  { id: "LK-33", name: "Hambantota" },
  { id: "LK-41", name: "Jaffna" },
  { id: "LK-42", name: "Mannar" },
  { id: "LK-43", name: "Vavuniya" },
  { id: "LK-44", name: "Mullaitivu" },
  { id: "LK-45", name: "Kilinochchi" },
  { id: "LK-51", name: "Batticaloa" },
  { id: "LK-52", name: "Ampara" },
  { id: "LK-53", name: "Trincomalee" },
  { id: "LK-61", name: "Kurunegala" },
  { id: "LK-62", name: "Puttalam" },
  { id: "LK-71", name: "Anuradhapura" },
  { id: "LK-72", name: "Polonnaruwa" },
  { id: "LK-81", name: "Badulla" },
  { id: "LK-82", name: "Moneragala" },
  { id: "LK-91", name: "Ratnapura" },
  { id: "LK-92", name: "Kegalle" },
];

export default function SelectRegionID({ regionID, setRegionID }) {
  const onChange = function (e) {
    console.debug(e.target.value);
    setRegionID(e.target.value);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Region ID</InputLabel>
        <Select value={regionID} label="Region ID" onChange={onChange}>
          {REGION_LIST.map(function (region) {
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
