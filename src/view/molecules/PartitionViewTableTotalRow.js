import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import StringX from "../../nonview/base/StringX";
import RegionIdx from "../../nonview/core/RegionIdx";

import DemographicView from "../../view/molecules/DemographicView";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)({
  color: "#666",
  background: "#f8f8f8",
  borderTop: "1px solid #ccc",
});

export default function PartitionViewTableTotalRow({
  totalNSeats,
  totalPop,
  idList,
  fairSeatsEthnicity,
  fairSeatsReligion,
  totalUnfairnessEthnicity,
  totalUnfairnessReligion,
}) {
  return (
    <TableRow>
      <StyledTableCell align="left">{"Total"}</StyledTableCell>
      <StyledTableCell>(all)</StyledTableCell>

      <StyledTableCell align="right">
        {StringX.formatInt(totalPop)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatIntSmall(totalNSeats)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatInt(totalPop / totalNSeats)}
      </StyledTableCell>

      <StyledTableCell align="right">
        {StringX.formatIntSmall(totalNSeats)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatPercentSigned(0)}
      </StyledTableCell>

      <StyledTableCell>
        <DemographicView
          idList={idList}
          funcDemographicsInfo={RegionIdx.getEthnicityInfo}
          nSeats={totalNSeats}
          fairSeats={fairSeatsEthnicity}
          totalUnfairness={totalUnfairnessEthnicity}
        />
      </StyledTableCell>
      <StyledTableCell>
        <DemographicView
          idList={idList}
          funcDemographicsInfo={RegionIdx.getReligionInfo}
          nSeats={totalNSeats}
          fairSeats={fairSeatsReligion}
          totalUnfairness={totalUnfairnessReligion}
        />
      </StyledTableCell>
      <StyledTableCell />
    </TableRow>
  );
}
