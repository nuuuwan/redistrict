import KMeansClustering from "./KMeansClustering";
import Partition from "../../nonview/core/Partition";
import RegionIdx from "./RegionIdx";
import Vector from "./Vector";

const K_SPACE = 10;

export default class PartitionByClustering extends Partition {
  partitionAll(maxSeatsPerGroup) {
    const nSeats = Object.values(this.groupToIDListAndNSeats)[0].nSeats;
    const k = parseInt(nSeats / maxSeatsPerGroup);
    const dataList = Object.values(this.regionIdx.idx);
    const n = dataList.length;
    const funcIToVector = function (i) {
      const data = dataList[i];
      const { buddhist, christian, islam, hindu } = RegionIdx.getReligionInfo([
        data.id,
      ]);
      const [lat, lng] = data.centroid;
      const values = [islam, lat * K_SPACE, lng * K_SPACE];

      return new Vector(values);
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
