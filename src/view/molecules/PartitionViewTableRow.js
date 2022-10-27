import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Color from "../../nonview/base/Color";
import StringX from "../../nonview/base/StringX";

const STYLE_GROUP = {};

export default function PartitionViewTableRow({ row, partitionRegionIdx, nSeats, totalPop }) {
  const regions = row.idList
    .map((id) => partitionRegionIdx.get(id).name)
    .join(", ");
  const totalGroupPop = partitionRegionIdx.getTotalPop(row.idList);
  const sx = {
    ...{ background: Color.getForKey(row.group) },
    ...STYLE_GROUP,
  };
  const nSeatsFair = totalGroupPop * nSeats / totalPop;
  const fairness = nSeatsFair - row.nSeats2

  return (
    <TableRow>
      <TableCell align="left" sx={sx}>
        {row.group}
      </TableCell>
      <TableCell align="right">{row.nSeats}</TableCell>
      <TableCell align="right">{row.nSeats2}</TableCell>
      <TableCell align="right">{StringX.formatInt(totalGroupPop)}</TableCell>
      <TableCell align="left">{StringX.formatFloat(fairness)}</TableCell>
      <TableCell align="left">{regions}</TableCell>

    </TableRow>
  );
}
