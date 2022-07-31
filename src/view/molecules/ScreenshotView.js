import React from "react";

import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Tooltip from "@mui/material/Tooltip";
import ScreenshotIcon from "@mui/icons-material/Screenshot";

import AppColors from "../../view/_constants/AppColors";
import download from "downloadjs";
import { toPng } from "html-to-image";

export default function ScreenshotView({ refHomePage }) {
  const takeScreenshot = async (node) => {
    const dataURI = await toPng(node, { backgroundColor: "#fefefe" });
    download(dataURI, "politicians.png");
  };

  const onClickGetImage = function () {
    takeScreenshot(refHomePage.current);
  };

  return (
    <Tooltip title={"Screenshot"}>
      <BottomNavigationAction
        icon={<ScreenshotIcon sx={{ color: AppColors.VeryLight }} />}
        onClick={onClickGetImage}
      />
    </Tooltip>
  );
}
