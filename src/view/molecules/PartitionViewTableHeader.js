import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)({
  color: "#ccc",
});

export default function PartitionViewTableHeader({ subRegionType }) {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">New Polling Division</StyledTableCell>
        <StyledTableCell align="left">
          Component {subRegionType.toUpperCase()}s
        </StyledTableCell>

        <StyledTableCell align="right">Pop.</StyledTableCell>
        <StyledTableCell align="right">Seats</StyledTableCell>
        <StyledTableCell align="right">Pop./Seat</StyledTableCell>

        <StyledTableCell align="right">E(Seats)</StyledTableCell>
        <StyledTableCell align="right">Imbalance</StyledTableCell>

        <StyledTableCell align="left">Ethnicity</StyledTableCell>
        <StyledTableCell align="left">Religion</StyledTableCell>
        <StyledTableCell align="left">2020 Parliamentary</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
