import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function PartitionViewTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Group</TableCell>
        <TableCell>Regions</TableCell>
        <TableCell>Pop.</TableCell>
        <TableCell>Seats</TableCell>
      </TableRow>
    </TableHead>
  );
}
