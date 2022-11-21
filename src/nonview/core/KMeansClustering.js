import MathX from "../../nonview/base/MathX";
import Vector from "./Vector";

const MAX_EPOCHS = 20;

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
    const EXTRA_FACTOR = 1.05;
    const maxSizePerCluster = meanSizePerCluster * EXTRA_FACTOR;

    // Initial Assignment of Vectors to Clusters
    let clusterToI = [];
    let clusterToSize = [];
    for (let iCluster = 0; iCluster < this.k; iCluster++) {
      clusterToI.push([]);
      clusterToSize.push(0);
    }

    for (let iVector = 0; iVector < this.n; iVector++) {
      const size = this.funcIToSize(iVector);
      while (true) {
        const iCluster = MathX.randInt(0, this.k);
        if (clusterToSize[iCluster] + size < maxSizePerCluster) {
          clusterToI[iCluster].push(iVector);
          clusterToSize[iCluster] += size;
          break;
        }
      }
    }

    // Iterate for Epochs
    for (let epoch = 0; epoch < MAX_EPOCHS; epoch++) {
      let clusterMeanVectors = [];
      for (let iCluster = 0; iCluster < this.k; iCluster++) {
        const clusterVectors = clusterToI[iCluster].map(
          (iVector) => vectors[iVector]
        );

        if (clusterVectors.length === 0) {
          for (let iVector = 0; iVector < this.n; iVector++) {
            clusterToI[iCluster].push(iVector);
          }
        }

        const clusterMeanVector = Vector.mean(clusterVectors);
        clusterMeanVectors.push(clusterMeanVector);
        clusterToI[iCluster] = [];
        clusterToSize[iCluster] = 0;
      }

      for (let iVector = 0; iVector < this.n; iVector++) {
        const vector = vectors[iVector];
        const size = this.funcIToSize(iVector);
        let minDistance = undefined;
        let minICluster = undefined;
        for (let iCluster = 0; iCluster < this.k; iCluster++) {
          if (clusterToSize[iCluster] + size > maxSizePerCluster) {
            continue;
          }
          const clusterMeanVector = clusterMeanVectors[iCluster];
          const distance = vector.getDistanceSquare(clusterMeanVector);
          if (minDistance === undefined || distance < minDistance) {
            minDistance = distance;
            minICluster = iCluster;
          }
        }
        clusterToI[minICluster].push(iVector);
        clusterToSize[minICluster] += size;
      }
    }

    //
    return clusterToI;
  }
}
