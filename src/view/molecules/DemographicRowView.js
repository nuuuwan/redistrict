import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import StringX from "../../nonview/base/StringX";
import RegionIdx from "../../nonview/core/RegionIdx";

import DemographicInnerView from "../../view/molecules/DemographicInnerView";

export default function DemographicRowView({
  idList,
  funcDemographicsInfo,
  nSeats,
  fairSeats,
}) {
  const unfairness = RegionIdx.getUnfairness(
    idList,
    nSeats,
    funcDemographicsInfo
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
        <TableCell align="right">
          <Typography variant="caption">
            {StringX.formatPercent(unfairness)}
          </Typography>
        </TableCell>
      </TableRow>
    </DemographicInnerView>
  );
}
