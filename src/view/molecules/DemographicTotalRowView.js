import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import StringX from "../../nonview/base/StringX";
import RegionIdx from "../../nonview/core/RegionIdx";
import Seats from "../../nonview/core/Seats";

import DemographicInnerView from "../../view/molecules/DemographicInnerView";

export default function DemographicTotalRowView({
  idList,
  funcDemographicsInfo,
  nSeats,
  rows,
  regionIdx,
}) {
  const unfairness = RegionIdx.getUnfairness(
    idList,
    nSeats,
    funcDemographicsInfo
  );

  const prWithBonusSeatUnfairness = RegionIdx.getUnfairness(
    idList,
    nSeats,
    funcDemographicsInfo,
    1,
    0.05
  );

  function getFairSeats(funcDemographicsInfo) {
    return rows.reduce(function (fairSeats, row) {
      const demographicInfo = funcDemographicsInfo(row.idList);
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

  const fairSeats = getFairSeats(funcDemographicsInfo);
  const totalUnfairness = getTotalUnfairness(funcDemographicsInfo);

  return (
    <DemographicInnerView
      idList={idList}
      funcDemographicsInfo={funcDemographicsInfo}
      nSeats={nSeats}
      fairSeats={fairSeats}
    >
      <TableRow>
        <TableCell>
          <Typography variant="caption">{"Unfairness"}</Typography>
        </TableCell>
        <TableCell />
        <TableCell align="right">
          <Typography variant="caption">
            {StringX.formatPercent(totalUnfairness)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="caption">
            {StringX.formatPercent(unfairness)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="caption">
            {StringX.formatPercent(prWithBonusSeatUnfairness)}
          </Typography>
        </TableCell>
      </TableRow>
    </DemographicInnerView>
  );
}
