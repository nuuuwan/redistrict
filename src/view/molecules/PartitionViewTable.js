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
    borderBottom: "none",
    padding: 0.5,
    width: "fit-content",
    maxWidth: 200,
  },
};

export default function PartitionViewTable({
  rows,
  regionEntIdx,
  totalPop,
  nSeats,
  nGroups,
  groupToName,
}) {
  const totalNSeats = nSeats;

  return (
    <TableContainer component={Box}>
      <Table sx={STYLE_TABLE} size="small">
        <PartitionViewTableHeader />
        <TableBody>
          <PartitionViewTableTotalRow
            totalNSeats={totalNSeats}
            totalPop={totalPop}
          />
          {rows.map(function (row) {
            return (
              <PartitionViewTableRow
                key={row.group}
                row={row}
                regionEntIdx={regionEntIdx}
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
