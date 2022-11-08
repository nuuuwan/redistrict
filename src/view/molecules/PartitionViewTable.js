import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import PartitionViewTableHeader from "../../view/molecules/PartitionViewTableHeader";
import PartitionViewTableRow from "../../view/molecules/PartitionViewTableRow";
import PartitionViewTableTotalRow from "../../view/molecules/PartitionViewTableTotalRow";

const STYLE_TABLE = {
  [`& .${tableCellClasses.root}`]: {
    borderBottom: "1px solid #ccc",
    padding: 0.2,
    width: "fit-content",
    maxWidth: 200,
    verticalAlign: "top",
  },
};

export default function PartitionViewTable({
  rows,
  regionIdx,
  subRegionType,
  totalPop,
  nSeats,
  nGroups,
  groupToName,
}) {
  const totalNSeats = nSeats;

  const [weightedBalanceSum, popSum] = rows.reduce(
    function ([weightedBalanceSum, popSum], row) {
      const totalGroupPop = regionIdx.getTotalPop(row.idList);
      const nSeatsFair = (totalGroupPop * nSeats) / totalPop;
      const nSeatsFairPerNSeats2 = nSeatsFair / row.nSeats;
      const balance = nSeatsFairPerNSeats2 - 1;
      return [
        weightedBalanceSum + Math.abs(balance) * totalGroupPop,
        popSum + totalGroupPop,
      ];
    },
    [0, 0]
  );
  const totalAbsBalance = weightedBalanceSum / popSum;

  return (
    <TableContainer component={Box}>
      <Table sx={STYLE_TABLE} size="small">
        <PartitionViewTableHeader subRegionType={subRegionType} />
        <TableBody>
          <PartitionViewTableTotalRow
            totalNSeats={totalNSeats}
            totalPop={totalPop}
            idList={regionIdx.idList}
            totalAbsBalance={totalAbsBalance}
            rows={rows}
            regionIdx={regionIdx}
          />
          {rows.map(function (row) {
            return (
              <PartitionViewTableRow
                key={row.group}
                row={row}
                regionIdx={regionIdx}
                totalPop={totalPop}
                nSeats={nSeats}
                nGroups={nGroups}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
