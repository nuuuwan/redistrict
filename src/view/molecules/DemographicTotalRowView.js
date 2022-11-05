import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import StringX from "../../nonview/base/StringX";
import RegionIdx from "../../nonview/core/RegionIdx";

import DemographicInnerView from "../../view/molecules/DemographicInnerView";

export default function DemographicTotalRowView({
  idList,
  funcDemographicsInfo,
  nSeats,
  fairSeats,
  totalUnfairness,
}) {
  const unfairness = RegionIdx.getUnfairness(
    idList,
    nSeats,
    funcDemographicsInfo
  );

  const prWithBonusSeatUnfairness = RegionIdx.getUnfairness(
    idList,
    nSeats,
    funcDemographicsInfo,
    1,
    0.05
  );

  return (
    <DemographicInnerView
      idList={idList}
      funcDemographicsInfo={funcDemographicsInfo}
      nSeats={nSeats}
      fairSeats={fairSeats}
    >
      <TableRow>
        <TableCell>
          <Typography variant="caption">{"Unfairness"}</Typography>
        </TableCell>
        <TableCell/>
        <TableCell align="right">
          <Typography variant="caption">
            {StringX.formatPercent(totalUnfairness)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="caption">
            {StringX.formatPercent(unfairness)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="caption">
            {StringX.formatPercent(prWithBonusSeatUnfairness)}
          </Typography>
        </TableCell>
      </TableRow>
    </DemographicInnerView>
  );
}
