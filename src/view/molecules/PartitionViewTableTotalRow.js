import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import StringX from "../../nonview/base/StringX";

export default function PartitionViewTableTotalRow({
  totalNSeats,
  totalPop,
  totalNSeats2,
}) {
  return (
    <TableRow>
      <TableCell align="left">{"Total"}</TableCell>
      <TableCell align="right">{totalNSeats}</TableCell>
      <TableCell align="right">{totalNSeats2}</TableCell>
      <TableCell align="right">{totalNSeats2}</TableCell>
      <TableCell align="right">{0}</TableCell>
      <TableCell align="right">{StringX.formatInt(totalPop)}</TableCell>
      <TableCell align="right">
        {StringX.formatInt(totalPop / totalNSeats2)}
      </TableCell>
      <TableCell />
    </TableRow>
  );
}
