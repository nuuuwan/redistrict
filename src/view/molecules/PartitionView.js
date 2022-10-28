import Seats from "../../nonview/core/Seats";

import PartitionViewTable from "../../view/molecules/PartitionViewTable";

export default function PartitionView({ nSeats, partition }) {
  const regionEntIdx = partition.regionEntIdx;
  const groupToSeats2 = Seats.divideSeats(nSeats, partition);
  const totalPop = regionEntIdx.getTotalPop(regionEntIdx.idList);

  const sortedGroups = Object.keys(partition.groupToIDListAndNSeats).sort();
  const nGroups = sortedGroups.length;
  const rows = sortedGroups.map(function (group, iGroup) {
    const { idList, nSeats } = partition.groupToIDListAndNSeats[group];
    return {
      iGroup,
      group,
      idList,
      nSeats,
      nSeats2: groupToSeats2[group],
    };
  });
  return (
    <PartitionViewTable
      rows={rows}
      regionEntIdx={regionEntIdx}
      totalPop={totalPop}
      nSeats={nSeats}
      nGroups={nGroups}
    />
  );
}
