import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import StringX from "../../nonview/base/StringX";
import RegionIdx, {
  FUNC_DEMOGRAPHICS_INFO_LIST,
} from "../../nonview/core/RegionIdx";

import DemographicTotalRowView from "../../view/molecules/DemographicTotalRowView";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)({
  color: "#666",
  background: "#f8f8f8",
  borderTop: "1px solid #ccc",
});

export default function PartitionViewTableTotalRow({
  totalNSeats,
  totalPop,
  idList,
  totalAbsBalance,
  rows,
  regionIdx,
}) {
  return (
    <TableRow>
      <StyledTableCell align="left">{"Total"}</StyledTableCell>
      <StyledTableCell>(all)</StyledTableCell>

      <StyledTableCell align="right">
        {StringX.formatInt(totalPop)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatIntSmall(totalNSeats)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatInt(totalPop / totalNSeats)}
      </StyledTableCell>

      <StyledTableCell align="right">
        {StringX.formatIntSmall(totalNSeats)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {StringX.formatPercent(totalAbsBalance)}
        <Typography variant="body1" sx={{ fontSize: "75%" }}>
          (weighted abs sum)
        </Typography>
      </StyledTableCell>

      {FUNC_DEMOGRAPHICS_INFO_LIST.map(function (funcDemographicInfo, i) {
        return (
          <StyledTableCell key={"demographic-" + i}>
            <DemographicTotalRowView
              idList={idList}
              funcDemographicsInfo={funcDemographicInfo}
              nSeats={totalNSeats}
              rows={rows}
              regionIdx={regionIdx}
            />
          </StyledTableCell>
        );
      })}
      <StyledTableCell />
    </TableRow>
  );
}
