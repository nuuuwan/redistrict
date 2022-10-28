import React, { Component } from "react";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppColors from "./view/_constants/AppColors";
import MapPage from "./view/pages/MapPage.js";
import { FONT_FAMILY_LIST } from "./APP_STYLES.js";

const THEME = createTheme({
  palette: {
    primary: {
      main: AppColors.Primary,
    },
    secondary: {
      main: AppColors.Secondary,
    },
    success: {
      main: AppColors.Success,
    },
    neutral: {
      main: AppColors.Light,
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_LIST.join(","),
  },
});

const STYLE = {
  maxWidth: 800,
  margin: "auto",
  marginBottom: 10,
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <Box sx={STYLE}>
          <MapPage />
        </Box>
      </ThemeProvider>
    );
  }
}
