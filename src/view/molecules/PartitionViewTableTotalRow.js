import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import StringX from "../../nonview/base/StringX";

import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)({
  color: "#666",
});

export default function PartitionViewTableTotalRow({
  totalNSeats,
  totalPop,
  totalNSeats2,
}) {
  return (
    <TableRow>
      <StyledTableCell align="left">{"Total"}</StyledTableCell>
      <StyledTableCell align="right">{totalNSeats}</StyledTableCell>
      <StyledTableCell align="right">{totalNSeats2}</StyledTableCell>
      <StyledTableCell align="right">{totalNSeats2}</StyledTableCell>
      <StyledTableCell align="right">{0}</StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatInt(totalPop)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatInt(totalPop / totalNSeats2)}
      </StyledTableCell>
      <StyledTableCell />
    </TableRow>
  );
}
