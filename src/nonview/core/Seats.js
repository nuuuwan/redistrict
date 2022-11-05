import MathX from "../../nonview/base/MathX";

export default class Seats {
  static divideSeats(nSeatsOriginal, groupToPOriginal, bonus = 0, limit = 0) {
    const nSeats = nSeatsOriginal - bonus;
    let groupToSeats = {};
    let remSeats = nSeats;
    let groupAndRem = [];

    const groupAndPLimited = Object.entries(groupToPOriginal).filter(function ([
      group,
      p,
    ]) {
      return p > limit;
    });

    const newTotalP = MathX.sum(groupAndPLimited.map((x) => x[1]));
    const groupAndP = groupAndPLimited.map(function ([group, p]) {
      return [group, p / newTotalP];
    });

    for (let [group, p] of groupAndP) {
      const seatsFloat = nSeats * p;
      const seatsInt = parseInt(seatsFloat);
      groupToSeats[group] = seatsInt;
      const rem = seatsFloat - seatsInt;
      remSeats -= seatsInt;
      groupAndRem.push([group, rem]);
    }

    const topGroup = groupAndP.sort(function (a, b) {
      return b[1] - a[1];
    })[0][0];
    groupToSeats[topGroup] += bonus;

    const sortedGroupAndRem = groupAndRem.sort((a, b) => b[1] - a[1]);
    for (let i of MathX.range(0, remSeats)) {
      const group = sortedGroupAndRem[i][0];
      groupToSeats[group] += 1;
    }

    return groupToSeats;
  }

  static divideSeatsForPartition(nSeats, partition) {
    let groupToPop = {};
    let totalPop = 0;
    const groupToIDList = partition.getGroupToIDList();
    for (let [group, idList] of Object.entries(groupToIDList)) {
      const pop = partition.regionIdx.getTotalPop(idList);
      totalPop += pop;
      groupToPop[group] = pop;
    }

    let groupToP = {};
    for (let [group, pop] of Object.entries(groupToPop)) {
      groupToP[group] = pop / totalPop;
    }

    return Seats.divideSeats(nSeats, groupToP);
  }
}
