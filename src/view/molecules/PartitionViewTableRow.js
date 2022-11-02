import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Color from "../../nonview/base/Color";
import StringX from "../../nonview/base/StringX";
import Partition from "../../nonview/core/Partition";
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

  const popPerSeat = totalGroupPop / row.nSeats;
  const balance = nSeatsFairPerNSeats2 - 1;
  const colorFairness = Partition.getColorFairness(nSeatsFairPerNSeats2);

  return (
    <TableRow>
      <TableCell align="left" sx={sx}>
        {row.groupName}
      </TableCell>
      <TableCell align="left">{regions}</TableCell>

      <TableCell align="right">{StringX.formatInt(totalGroupPop)}</TableCell>
      <TableCell align="right">{StringX.formatIntSmall(row.nSeats)}</TableCell>
      <TableCell align="right" sx={{ background: colorFairness }}>
        {StringX.formatInt(popPerSeat)}
      </TableCell>

      <TableCell align="right" sx={{ background: colorFairness }}>
        {StringX.formatFloat(nSeatsFair)}
      </TableCell>
      <TableCell align="right" sx={{ background: colorFairness }}>
        {StringX.formatPercentSigned(balance)}
      </TableCell>

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
