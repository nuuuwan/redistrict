import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)({
  color: "#ccc",
});

export default function PartitionViewTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">Group</StyledTableCell>
        <StyledTableCell align="right">Seats</StyledTableCell>
        <StyledTableCell align="right">Seats[Fair]</StyledTableCell>
        <StyledTableCell align="right">log2</StyledTableCell>
        <StyledTableCell align="right">Pop.</StyledTableCell>
        <StyledTableCell align="right">Pop./Seat</StyledTableCell>
        <StyledTableCell align="left">Regions</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
