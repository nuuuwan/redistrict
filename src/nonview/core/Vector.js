export default class Vector {
  constructor(values) {
    this.values = values;
  }

  get dim() {
    return this.values.length;
  }

  static sum(vectors) {
    const sumValues = vectors.reduce(function (sumValues, vector, i) {
      if (i === 0) {
        return vector.values;
      }

      return sumValues.map(function (sumValue, i) {
        return sumValue + vector.values[i];
      });
    }, []);
    return new Vector(sumValues);
  }

  static mean(vectors) {
    const nVectors = vectors.length;
    const vectorSum = Vector.sum(vectors);
    const meanValues = vectorSum.values.map((sumValue) => sumValue / nVectors);
    return new Vector(meanValues);
  }

  getDistanceL2(other) {
    const sum2 = this.values.reduce(function (sum2, value, i) {
      return sum2 + (other.values[i] - value) ** 2;
    }, 0);
    return sum2 / this.dim;
  }

  getDistanceL1(other) {
    const sum2 = this.values.reduce(function (sum2, value, i) {
      return sum2 + Math.abs(other.values[i] - value);
    }, 0);
    return sum2 / this.dim;
  }

  getDistanceSquare(other) {
    return this.values.reduce(function (maxDiff, value, i) {
      return Math.max(maxDiff, Math.abs(other.values[i] - value));
    }, 0);
  }
}
