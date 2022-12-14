import Seats from "../../nonview/core/Seats";

import PartitionViewTable from "../../view/molecules/PartitionViewTable";

export default function PartitionView({ nSeats, partition, subRegionType }) {
  const groupToIDList = partition.getGroupToIDList();
  const groupToName = partition.getGroupToName();
  const groupToSeats = Seats.divideSeatsForPartition(nSeats, partition);

  const regionIdx = partition.regionIdx;
  const totalPop = regionIdx.getTotalPop(regionIdx.idList);

  const sortedGroups = Object.keys(groupToIDList).sort();
  const nGroups = sortedGroups.length;

  const rows = sortedGroups.map(function (group, iGroup) {
    const idList = groupToIDList[group];
    return {
      iGroup,
      group,
      groupName: groupToName[group],
      idList,
      nSeats: groupToSeats[group],
    };
  });
  return (
    <PartitionViewTable
      rows={rows}
      subRegionType={subRegionType}
      regionIdx={regionIdx}
      totalPop={totalPop}
      nGroups={nGroups}
      nSeats={nSeats}
    />
  );
}
