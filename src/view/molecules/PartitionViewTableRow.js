import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import StringX from "../../nonview/base/StringX";

export default function PartitionViewTableRow({ row, partitionRegionIdx }) {
  const regions = row.idList
    .map((id) => partitionRegionIdx.get(id).name)
    .join(", ");
  const totalPop = partitionRegionIdx.getTotalPop(row.idList);
  return (
    <TableRow>
      <TableCell align="left">{row.group}</TableCell>
      <TableCell align="left">{regions}</TableCell>
      <TableCell align="left">{StringX.formatInt(totalPop)}</TableCell>
      <TableCell align="right">{row.nSeats}</TableCell>
    </TableRow>
  );
}
