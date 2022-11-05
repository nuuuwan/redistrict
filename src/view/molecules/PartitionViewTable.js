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
      const itemToSeats = Seats.divideSeats(row.nSeats, demographicInfo, 0, 0);
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
    const [weightedUnfairnessSum, popSum] = rows.reduce(
      function ([weightedUnfairnessSum, popSum], row) {
        const pop = regionIdx.getTotalPop(row.idList);
        const unfairness = RegionIdx.getUnfairness(
          row.idList,
          row.nSeats,
          funcDemographicsInfo
        );
        return [weightedUnfairnessSum + unfairness * pop, popSum + pop];
      },
      [0, 0]
    );
    return weightedUnfairnessSum / popSum;
  }

  const fairSeatsEthnicity = getFairSeats(RegionIdx.getEthnicityInfo);
  const fairSeatsReligion = getFairSeats(RegionIdx.getReligionInfo);
  const totalUnfairnessEthnicity = getTotalUnfairness(
    RegionIdx.getEthnicityInfo
  );
  const totalUnfairnessReligion = getTotalUnfairness(RegionIdx.getReligionInfo);

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
            fairSeatsEthnicity={fairSeatsEthnicity}
            fairSeatsReligion={fairSeatsReligion}
            totalUnfairnessEthnicity={totalUnfairnessEthnicity}
            totalUnfairnessReligion={totalUnfairnessReligion}
            totalAbsBalance={totalAbsBalance}
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
