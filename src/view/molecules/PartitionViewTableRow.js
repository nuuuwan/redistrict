import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function PartitionViewTableRow({ row, partitionRegionIdx }) {
  const regions = row.idList
    .map((id) => partitionRegionIdx.get(id).name)
    .join(", ");
  return (
    <TableRow>
      <TableCell align="left">{row.group}</TableCell>
      <TableCell align="left">{regions}</TableCell>
      <TableCell align="right">{row.nSeats}</TableCell>
    </TableRow>
  );
}
