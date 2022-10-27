import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function PartitionViewTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">Group</TableCell>
        <TableCell align="right">Seats</TableCell>
        <TableCell align="right">Seats[2]</TableCell>
        <TableCell align="right">Seats[Fair]</TableCell>
        <TableCell align="right">Pop.</TableCell>
        <TableCell align="left">Regions</TableCell>
      </TableRow>
    </TableHead>
  );
}
