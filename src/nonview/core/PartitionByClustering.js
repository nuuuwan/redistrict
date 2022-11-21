import KMeansClustering from "./KMeansClustering";
import Partition from "../../nonview/core/Partition";
import Vector from "./Vector";

export default class PartitionByClustering extends Partition {
  partitionAll(maxSeatsPerGroup) {
    const nSeats = Object.values(this.groupToIDListAndNSeats)[0].nSeats;
    const k = parseInt(nSeats / maxSeatsPerGroup);
    const dataList = Object.values(this.regionIdx.idx);
    const n = dataList.length;
    const funcIToVector = function (i) {
      return new Vector(dataList[i].centroid);
    };
    const funcIToSize = function (i) {
      return dataList[i].pop;
    };
    const clustering = new KMeansClustering(k, n, funcIToVector, funcIToSize);

    const cluterToI = clustering.cluster();
    const newNSeats = nSeats / k;
    this.groupToIDListAndNSeats = {};
    for (let iCluster = 0; iCluster < k; iCluster++) {
      const vectors = cluterToI[iCluster];
      const idList = vectors.map((iVector) => dataList[iVector].id);

      this.groupToIDListAndNSeats[iCluster] = {
        idList,
        nSeats: newNSeats,
      };
    }
  }
}
