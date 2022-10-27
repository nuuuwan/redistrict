import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function PartitionViewTableRow({ row }) {
  return (
    <TableRow>
      <TableCell align="left">{row.group}</TableCell>
      <TableCell align="left">{row.idList}</TableCell>
      <TableCell align="right">{row.nSeats}</TableCell>
    </TableRow>
  );
}
