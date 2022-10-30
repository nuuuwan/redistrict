import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import RegionEntIdx from "../../nonview/core/RegionEntIdx";
import Seats from "../../nonview/core/Seats";

import PartitionViewTableHeader from "../../view/molecules/PartitionViewTableHeader";
import PartitionViewTableRow from "../../view/molecules/PartitionViewTableRow";
import PartitionViewTableTotalRow from "../../view/molecules/PartitionViewTableTotalRow";

const STYLE_TABLE = {
  [`& .${tableCellClasses.root}`]: {
    borderBottom: "1px solid #ccc",
    padding: 0.5,
    width: "fit-content",
    maxWidth: 200,
    verticalAlign: "top",
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

  function getFairSeats(funcDemographicInfo) {
    return rows.reduce(function (fairSeats, row) {
      const demographicInfo = funcDemographicInfo(row.idList);
      const itemToSeats = Seats.divideSeats(row.nSeats, demographicInfo);
      for (let [item, seats] of Object.entries(itemToSeats)) {
        if (!fairSeats[item]) {
          fairSeats[item] = 0;
        }
        fairSeats[item] += seats;
      }
      return fairSeats;
    }, {});
  }

  const fairSeatsEthnic = getFairSeats(RegionEntIdx.getEthnicityInfo);
  const fairSeatsReligion = getFairSeats(RegionEntIdx.getReligionInfo);

  return (
    <TableContainer component={Box}>
      <Table sx={STYLE_TABLE} size="small">
        <PartitionViewTableHeader />
        <TableBody>
          <PartitionViewTableTotalRow
            totalNSeats={totalNSeats}
            totalPop={totalPop}
            idList={regionEntIdx.idList}
            fairSeatsEthnic={fairSeatsEthnic}
            fairSeatsReligion={fairSeatsReligion}
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
