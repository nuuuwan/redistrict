import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import GIG2TableStyle from "../../nonview/base/GIG2TableStyle";
import MathX from "../../nonview/base/MathX";
import StringX from "../../nonview/base/StringX";
import Seats from "../../nonview/core/Seats";

const STYLE = { fontSize: "70%", p: 0, m: 0 };

export default function DemographicView({ demographicInfo, nSeats }) {
  const totalPop = MathX.sumGeneric(Object.values(demographicInfo), (x) => x);
  const ethToSeats = Seats.divideSeats(nSeats, demographicInfo);
  return Object.entries(demographicInfo)
    .sort((a, b) => b[1] - a[1])
    .map(function ([k, v]) {
      const color = GIG2TableStyle.getValueKeyColor(k);
      const nSeatsForEth = ethToSeats[k];
      return (
        <Grid key={"demo-" + k} container sx={{ width: 64, color }}>
          <Grid item xs={2}>
            <Typography variant="caption" sx={STYLE}>
              {nSeatsForEth ? nSeatsForEth : ""}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="caption" align="right" sx={STYLE}>
              {StringX.formatPercent(v, totalPop)}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" sx={STYLE}>
              {StringX.toTitleCase(k)}
            </Typography>
          </Grid>
        </Grid>
      );
    });
}
