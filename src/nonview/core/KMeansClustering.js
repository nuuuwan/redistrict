import MathX from "../../nonview/base/MathX";
import Vector from "./Vector";

const MAX_EPOCHS = 30;
const EXTRA_FACTOR = 1.01;

export default class KMeansClustering {
  constructor(k, n, funcIToVector, funcIToSize) {
    this.k = k;
    this.n = n;
    this.funcIToVector = funcIToVector;
    this.funcIToSize = funcIToSize;
  }
  cluster() {
    // Generate Vectors
    const vectors = MathX.range(0, this.n).map(
      function (i) {
        return this.funcIToVector(i);
      }.bind(this)
    );
    const totalSize = MathX.range(0, this.n).reduce(
      function (totalSize, i) {
        return totalSize + this.funcIToSize(i);
      }.bind(this),
      0
    );
    const meanSizePerCluster = totalSize / this.k;
    const maxSizePerCluster = meanSizePerCluster * EXTRA_FACTOR;

    // Initial Assignment of Vectors to Clusters
    let clusterToI = [];
    let clusterToSize = [];
    for (let iCluster = 0; iCluster < this.k; iCluster++) {
      clusterToI.push([]);
      clusterToSize.push(0);
    }

    for (let iVector = 0; iVector < this.n; iVector++) {
      const iCluster = iVector % this.k;
      clusterToI[iCluster].push(iVector);
    }

    // Iterate for Epochs
    let clusterMeanVectors;
    let prevClusterMeanVectors;
    for (let epoch = 0; epoch < MAX_EPOCHS; epoch++) {
      prevClusterMeanVectors = clusterMeanVectors;
      clusterMeanVectors = [];

      for (let iCluster = 0; iCluster < this.k; iCluster++) {
        const clusterVectors = clusterToI[iCluster].map(
          (iVector) => vectors[iVector]
        );
        let clusterMeanVector;
        if (clusterVectors.length > 0) {
          clusterMeanVector = Vector.mean(clusterVectors);
        } else {
          clusterMeanVector = prevClusterMeanVectors[iCluster];
        }
        clusterMeanVectors.push(clusterMeanVector);
        clusterToI[iCluster] = [];
        clusterToSize[iCluster] = 0;
      }

      let runList = [];
      for (let iVector = 0; iVector < this.n; iVector++) {
        const vector = vectors[iVector];
        for (let iCluster = 0; iCluster < this.k; iCluster++) {
          const clusterMeanVector = clusterMeanVectors[iCluster];
          const distance = vector.getDistanceSquare(clusterMeanVector);
          runList.push({
            iVector,
            iCluster,
            distance,
          });
        }
      }

      const sortedRunList = runList.sort(function (a, b) {
        return a.distance - b.distance;
      });

      let vectorToCluster = {};
      const isLastEpoch = epoch === MAX_EPOCHS - 1;
      for (let { iVector, iCluster } of sortedRunList) {
        const size = this.funcIToSize(iVector);
        if (vectorToCluster[iVector] !== undefined) {
          continue;
        }
        if (!isLastEpoch) {
          if (clusterToSize[iCluster] + size > maxSizePerCluster) {
            continue;
          }
        }

        clusterToI[iCluster].push(iVector);
        vectorToCluster[iVector] = iCluster;
        clusterToSize[iCluster] += size;
      }
    }
    //
    return clusterToI;
  }
}
