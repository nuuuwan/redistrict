import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Color from "../../nonview/base/Color";
import StringX from "../../nonview/base/StringX";

const STYLE_GROUP = {};
const MAX_IDS_TO_DISPLAY = 3;

export default function PartitionViewTableRow({
  row,
  partitionRegionIdx,
  nSeats,
  totalPop,
  nGroups,
}) {
  let regions = row.idList
    .slice(0, MAX_IDS_TO_DISPLAY)
    .map((id) => partitionRegionIdx.get(id).name)
    .join(", ");
  if (row.idList.length > MAX_IDS_TO_DISPLAY) {
    regions += `...(${row.idList.length})`;
  }

  const totalGroupPop = partitionRegionIdx.getTotalPop(row.idList);
  const sx = {
    ...{ background: Color.getForIter(row.iGroup, nGroups) },
    ...STYLE_GROUP,
  };
  const nSeatsFair = (totalGroupPop * nSeats) / totalPop;
  const nSeatsFairPerNSeats2 = nSeatsFair / row.nSeats2;
  const log2NSeatsFairPerNSeats2 = Math.log(nSeatsFairPerNSeats2) / Math.log(2);
  const h = nSeatsFairPerNSeats2 < 1 ? 240 : 0;
  const l = 100 - 40 * Math.min(1, Math.abs(log2NSeatsFairPerNSeats2));
  const colorFairness = Color.hsla(h, 100, l, 1);

  return (
    <TableRow>
      <TableCell align="left" sx={sx}>
        {row.group}
      </TableCell>
      <TableCell align="right">{row.nSeats}</TableCell>
      <TableCell align="right">{row.nSeats2}</TableCell>
      <TableCell align="left" sx={{ background: colorFairness }}>
        {StringX.formatFloat(nSeatsFair)}
      </TableCell>
      <TableCell align="right">{StringX.formatInt(totalGroupPop)}</TableCell>
      <TableCell align="left">{regions}</TableCell>
    </TableRow>
  );
}
