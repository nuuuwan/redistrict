import PartitionViewTable from "../../view/molecules/PartitionViewTable";

export default function PartitionView({ partition }) {
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
  return <PartitionViewTable rows={rows} />;
}
