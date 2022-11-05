import MathX from "../../nonview/base/MathX";

export default class GIG2TableRow {
  static isValueKey(k) {
    return !(
      k.includes("total_") ||
      k.includes("_id") ||
      k.includes("result_ut") ||
      k.includes("valid") ||
      k.includes("rejected") ||
      k.includes("polled") ||
      k.includes("electors")
    );
  }

  constructor(dRaw) {
    [this.d, this.sumValue] = Object.entries(dRaw).reduce(
      function ([d, sumValue], [k, v]) {
        if (GIG2TableRow.isValueKey(k)) {
          v = parseFloat(v);
          if (!v) {
            v = 0;
          }
          d[k] = v;
          sumValue += v;
        }
        return [d, sumValue];
      },
      [{}, 0]
    );
  }

  get total() {
    return MathX.sum(Object.values(this.d));
  }

  getValue(k) {
    return this.d[k];
  }

  getMaxValueKeyAndValue() {
    return Object.entries(this.d).reduce(
      function ([maxValueKey, maxValue], [k, v]) {
        if (maxValue === undefined || maxValue < v) {
          return [k, v];
        }
        return [maxValueKey, maxValue];
      },
      [undefined, undefined]
    );
  }

  getPValue(valueKey) {
    return this.d[valueKey] / this.sumValue;
  }
}
