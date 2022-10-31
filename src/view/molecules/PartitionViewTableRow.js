import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Color from "../../nonview/base/Color";
import StringX from "../../nonview/base/StringX";
import RegionEntIdx from "../../nonview/core/RegionEntIdx";

import DemographicView from "../../view/molecules/DemographicView";

const STYLE_GROUP = {};
const MAX_IDS_TO_DISPLAY = 5;

export default function PartitionViewTableRow({
  row,
  regionEntIdx,
  nSeats,
  totalPop,
  nGroups,
}) {
  let regions = row.idList
    .slice(0, MAX_IDS_TO_DISPLAY)
    .map((id) => regionEntIdx.get(id).name)
    .join(", ");
  if (row.idList.length > MAX_IDS_TO_DISPLAY) {
    regions += `...(${row.idList.length})`;
  }

  const totalGroupPop = regionEntIdx.getTotalPop(row.idList);
  const sx = {
    ...{ background: Color.getForIter(row.iGroup, nGroups) },
    ...STYLE_GROUP,
  };
  const nSeatsFair = (totalGroupPop * nSeats) / totalPop;
  const nSeatsFairPerNSeats2 = nSeatsFair / row.nSeats;

  const log2NSeatsFairPerNSeats2 = Math.log(nSeatsFairPerNSeats2) / Math.log(2);
  const h = nSeatsFairPerNSeats2 < 1 ? 240 : 0;
  const p = Math.pow(Math.abs(log2NSeatsFairPerNSeats2), 2);
  const l = 100 - (40 * Math.min(1, p)) / 2;
  const colorFairness = Color.hsla(h, 100, l, 1);
  const popPerSeat = totalGroupPop / row.nSeats;

  return (
    <TableRow>
      <TableCell align="left" sx={sx}>
        {row.groupName}
      </TableCell>
      <TableCell align="right">{StringX.formatIntSmall(row.nSeats)}</TableCell>
      <TableCell align="right" sx={{ background: colorFairness }}>
        {"[" + StringX.formatFloat(nSeatsFair) + "]"}
      </TableCell>
      <TableCell align="right">{StringX.formatInt(totalGroupPop)}</TableCell>
      <TableCell align="right">{StringX.formatInt(popPerSeat)}</TableCell>
      <TableCell align="left">{regions}</TableCell>
      <TableCell align="left">
        <DemographicView
          idList={row.idList}
          funcDemographicsInfo={RegionEntIdx.getEthnicityInfo}
          nSeats={row.nSeats}
        />
      </TableCell>
      <TableCell align="left">
        <DemographicView
          idList={row.idList}
          funcDemographicsInfo={RegionEntIdx.getReligionInfo}
          nSeats={row.nSeats}
        />
      </TableCell>
    </TableRow>
  );
}
