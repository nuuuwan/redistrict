import PartitionViewTable from "../../view/molecules/PartitionViewTable";

export default function PartitionView({ partition }) {
  const partitionRegionIdx = partition.partitionRegionIdx;
  const rows = Object.entries(partition.groupToIDListAndNSeats).map(function ([
    group,
    { idList, nSeats },
  ]) {
    return {
      group,
      idList,
      nSeats,
    };
  });
  return (
    <PartitionViewTable rows={rows} partitionRegionIdx={partitionRegionIdx} />
  );
}
