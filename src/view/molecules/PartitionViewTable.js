import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";

import PartitionViewTableHeader from "../../view/molecules/PartitionViewTableHeader";
import PartitionViewTableRow from "../../view/molecules/PartitionViewTableRow";
import PartitionViewTableTotalRow from "../../view/molecules/PartitionViewTableTotalRow";

export default function PartitionViewTable({
  rows,
  partitionRegionIdx,
  totalPop,
  nSeats,
  nGroups,
}) {
  const totalNSeats = nSeats;
  const totalNSeats2 = nSeats;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <PartitionViewTableHeader />
        <TableBody>
          {rows.map(function (row) {
            return (
              <PartitionViewTableRow
                key={row.group}
                row={row}
                partitionRegionIdx={partitionRegionIdx}
                totalPop={totalPop}
                nSeats={nSeats}
                nGroups={nGroups}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <PartitionViewTableTotalRow
            totalNSeats={totalNSeats}
            totalNSeats2={totalNSeats2}
            totalPop={totalPop}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
