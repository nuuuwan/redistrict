import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Color from "../../nonview/base/Color";
import StringX from "../../nonview/base/StringX";

const STYLE_GROUP = {};
const MAX_IDS_TO_DISPLAY = 20;

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
  const p = Math.pow(Math.abs(log2NSeatsFairPerNSeats2), 2);
  const l = 100 - (40 * Math.min(1, p)) / 2;
  const colorFairness = Color.hsla(h, 100, l, 1);
  const popPerSeat = totalGroupPop / row.nSeats2;

  return (
    <TableRow>
      <TableCell align="left" sx={sx}>
        {row.group}
      </TableCell>
      <TableCell align="right">{StringX.formatIntSmall(row.nSeats2)}</TableCell>
      <TableCell align="right" sx={{ background: colorFairness }}>
        {StringX.formatFloat(nSeatsFair)}
      </TableCell>
      <TableCell align="right" sx={{ background: colorFairness }}>
        {StringX.formatFloatSigned(log2NSeatsFairPerNSeats2)}
      </TableCell>
      <TableCell align="right">{StringX.formatInt(totalGroupPop)}</TableCell>
      <TableCell align="right">{StringX.formatInt(popPerSeat)}</TableCell>
      <TableCell align="left">{regions}</TableCell>
    </TableRow>
  );
}
