import Seats from "../../nonview/core/Seats";

import PartitionViewTable from "../../view/molecules/PartitionViewTable";

export default function PartitionView({ nSeats, partition }) {
  const partitionRegionIdx = partition.partitionRegionIdx;
  const groupToSeats2 = Seats.divideSeats(nSeats, partition);
  const totalPop = partitionRegionIdx.getTotalPop(partitionRegionIdx.idList);

  const rows = Object.entries(partition.groupToIDListAndNSeats).map(function ([
    group,
    { idList, nSeats },
  ]) {
    return {
      group,
      idList,
      nSeats,
      nSeats2: groupToSeats2[group],
    };
  });
  return (
    <PartitionViewTable
      rows={rows}
      partitionRegionIdx={partitionRegionIdx}
      totalPop={totalPop}
      nSeats={nSeats}
    />
  );
}
