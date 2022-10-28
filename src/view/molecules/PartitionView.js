import Seats from "../../nonview/core/Seats";

import PartitionViewTable from "../../view/molecules/PartitionViewTable";

export default function PartitionView({ nSeats, partition }) {
  const regionEntIdx = partition.regionEntIdx;
  const groupToSeats = Seats.divideSeats(nSeats, partition);
  const totalPop = regionEntIdx.getTotalPop(regionEntIdx.idList);
  const groupToIDList = partition.getGroupToIDList();
  const sortedGroups = Object.keys(groupToIDList).sort();
  const nGroups = sortedGroups.length;
  const groupToName = partition.getGroupToName();
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
      regionEntIdx={regionEntIdx}
      totalPop={totalPop}
      nGroups={nGroups}
      nSeats={nSeats}
    />
  );
}
