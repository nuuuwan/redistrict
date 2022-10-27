import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import PartitionViewTableHeader from "../../view/molecules/PartitionViewTableHeader";
import PartitionViewTableRow from "../../view/molecules/PartitionViewTableRow";

export default function PartitionViewTable({
  rows,
  partitionRegionIdx,
  totalPop,
  nSeats,
  nGroups,
}) {
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
      </Table>
    </TableContainer>
  );
}
