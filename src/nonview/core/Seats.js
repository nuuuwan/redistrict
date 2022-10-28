import MathX from "../../nonview/base/MathX";

export default class Seats {
  static divideSeats(nSeats, partition) {
    let groupToPop = {};
    let totalPop = 0;
    const groupToIDList = partition.getGroupToIDList();
    for (let [group, idList] of Object.entries(groupToIDList)) {
      const pop = partition.regionEntIdx.getTotalPop(idList);
      totalPop += pop;
      groupToPop[group] = pop;
    }

    let groupToSeats = {};
    let remSeats = nSeats;
    let groupAndRem = [];
    for (let [group, pop] of Object.entries(groupToPop)) {
      const seatsFloat = (nSeats * pop) / totalPop;
      const seatsInt = parseInt(seatsFloat);
      groupToSeats[group] = seatsInt;
      const rem = seatsFloat - seatsInt;
      remSeats -= seatsInt;
      groupAndRem.push([group, rem]);
    }

    const sortedGroupAndRem = groupAndRem.sort((a, b) => b[1] - a[1]);
    for (let i of MathX.range(0, remSeats)) {
      const group = sortedGroupAndRem[i][0];
      groupToSeats[group] += 1;
    }
    return groupToSeats;
  }
}
