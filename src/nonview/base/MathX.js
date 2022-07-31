export default class MathX {
  static sumGeneric(arr, funcMap) {
    return arr.reduce(function (s, arrItem) {
      return s + funcMap(arrItem);
    }, 0);
  }

  static sum(arr) {
    return MathX.sumGeneric(arr, (x) => x);
  }

  static sumL1(arr) {
    return MathX.sumGeneric(arr, (x) => Math.abs(x));
  }

  static sumL2(arr) {
    return MathX.sumGeneric(arr, (x) => x * x);
  }
}
