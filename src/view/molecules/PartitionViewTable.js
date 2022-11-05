import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import RegionIdx from "../../nonview/core/RegionIdx";
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
  regionIdx,
  subRegionType,
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

  function getTotalUnfairness(funcDemographicsInfo) {
    const [unfairnessSum, seatSum] =
      rows.reduce(
        function ([unfairnessSum, seatSum], row) {
          return [
            unfairnessSum +
              RegionIdx.getUnfairness(
                row.idList,
                row.nSeats,
                funcDemographicsInfo
              ),
            seatSum + row.nSeats,
          ];
        },
        [0, 0]
      );
    return unfairnessSum / seatSum;
  }

  const fairSeatsEthnicity = getFairSeats(RegionIdx.getEthnicityInfo);
  const fairSeatsReligion = getFairSeats(RegionIdx.getReligionInfo);

  const totalUnfairnessEthnicity = getTotalUnfairness(
    RegionIdx.getEthnicityInfo
  );
  const totalUnfairnessReligion = getTotalUnfairness(RegionIdx.getReligionInfo);

  return (
    <TableContainer component={Box}>
      <Table sx={STYLE_TABLE} size="small">
        <PartitionViewTableHeader subRegionType={subRegionType} />
        <TableBody>
          <PartitionViewTableTotalRow
            totalNSeats={totalNSeats}
            totalPop={totalPop}
            idList={regionIdx.idList}
            fairSeatsEthnicity={fairSeatsEthnicity}
            fairSeatsReligion={fairSeatsReligion}
            totalUnfairnessEthnicity={totalUnfairnessEthnicity}
            totalUnfairnessReligion={totalUnfairnessReligion}
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
