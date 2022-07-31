import React from "react";

import Box from "@mui/material/Box";

import HelpMenu from "./HelpMenu.js";

const STYLE = {
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: 1,
};

export default function CustomAppBar() {
  return (
    <Box sx={STYLE}>
      <HelpMenu />
    </Box>
  );
}
