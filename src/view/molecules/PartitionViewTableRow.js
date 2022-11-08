import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Color from "../../nonview/base/Color";
import StringX from "../../nonview/base/StringX";
import Partition from "../../nonview/core/Partition";
import { FUNC_DEMOGRAPHICS_INFO_IDX } from "../../nonview/core/RegionIdx";

import DemographicRowView from "../../view/molecules/DemographicRowView";

const STYLE_GROUP = {};
const MAX_IDS_TO_DISPLAY = 5;

export default function PartitionViewTableRow({
  row,
  regionIdx,
  nSeats,
  totalPop,
  nGroups,
}) {
  let regions = row.idList
    .slice(0, MAX_IDS_TO_DISPLAY)
    .map((id) => regionIdx.get(id).name)
    .join(", ");
  if (row.idList.length > MAX_IDS_TO_DISPLAY) {
    regions += `...(${row.idList.length})`;
  }

  const totalGroupPop = regionIdx.getTotalPop(row.idList);
  const sx = {
    ...{ background: Color.getForIter(row.iGroup, nGroups) },
    ...STYLE_GROUP,
  };
  const nSeatsFair = (totalGroupPop * nSeats) / totalPop;
  const nSeatsFairPerNSeats2 = nSeatsFair / row.nSeats;

  const popPerSeat = totalGroupPop / row.nSeats;
  const balance = nSeatsFairPerNSeats2 - 1;
  const colorBalance = Partition.getColorBalance(nSeatsFairPerNSeats2);

  return (
    <TableRow>
      <TableCell align="left" sx={sx}>
        {row.groupName}
      </TableCell>
      <TableCell align="left">{regions}</TableCell>

      <TableCell align="right">{StringX.formatInt(totalGroupPop)}</TableCell>
      <TableCell align="right">{StringX.formatIntSmall(row.nSeats)}</TableCell>
      <TableCell align="right" sx={{ background: colorBalance }}>
        {StringX.formatInt(popPerSeat)}
      </TableCell>

      <TableCell align="right" sx={{ background: colorBalance }}>
        {StringX.formatFloat(nSeatsFair)}
      </TableCell>
      <TableCell align="right" sx={{ background: colorBalance }}>
        {StringX.formatPercentSigned(balance)}
      </TableCell>

      {Object.entries(FUNC_DEMOGRAPHICS_INFO_IDX).map(function (
        [kDemographics, funcDemographicsInfo],
        i
      ) {
        return (
          <TableCell
            align="left"
            key={"table-cell-demographics-" + kDemographics}
          >
            <DemographicRowView
              idList={row.idList}
              funcDemographicsInfo={funcDemographicsInfo}
              nSeats={row.nSeats}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
