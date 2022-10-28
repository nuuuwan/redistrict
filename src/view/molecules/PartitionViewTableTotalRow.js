import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import StringX from "../../nonview/base/StringX";

import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)({
  color: "#666",
  background: "#eee",
});

export default function PartitionViewTableTotalRow({ totalNSeats, totalPop }) {
  return (
    <TableRow>
      <StyledTableCell align="left">{"Total"}</StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatIntSmall(totalNSeats)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatIntSmall(totalNSeats)}
      </StyledTableCell>
      <StyledTableCell align="right">{0}</StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatInt(totalPop)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatInt(totalPop / totalNSeats)}
      </StyledTableCell>
      <StyledTableCell />
      <StyledTableCell />
    </TableRow>
  );
}
