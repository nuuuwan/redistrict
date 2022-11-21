import MathX from "../../nonview/base/MathX";
import Vector from "./Vector";

const MAX_EPOCHS = 20;
const EXTRA_FACTOR = 1.05;

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
      for (let { iVector, iCluster, distance } of sortedRunList) {
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
