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
    return (
      rows.reduce(function (totalUnfairness, row) {
        return (
          totalUnfairness +
          RegionEntIdx.getUnfairness(
            row.idList,
            row.nSeats,
            funcDemographicsInfo
          )
        );
      }, 0) / rows.length
    );
  }

  const fairSeatsEthnicity = getFairSeats(RegionEntIdx.getEthnicityInfo);
  const fairSeatsReligion = getFairSeats(RegionEntIdx.getReligionInfo);

  const totalUnfairnessEthnicity = getTotalUnfairness(
    RegionEntIdx.getEthnicityInfo
  );
  const totalUnfairnessReligion = getTotalUnfairness(
    RegionEntIdx.getReligionInfo
  );

  return (
    <TableContainer component={Box}>
      <Table sx={STYLE_TABLE} size="small">
        <PartitionViewTableHeader subRegionType={subRegionType} />
        <TableBody>
          <PartitionViewTableTotalRow
            totalNSeats={totalNSeats}
            totalPop={totalPop}
            idList={regionEntIdx.idList}
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
