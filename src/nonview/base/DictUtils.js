export default class DictUtils {
  static filterDict(d, keyList) {
    return Object.entries(d).reduce(function (filteredDict, [k, v]) {
      if (keyList.includes(k)) {
        filteredDict[k] = v;
      }
      return filteredDict;
    }, {});
  }

  static mapValues(d, funcMapValue) {
    return Object.entries(d).reduce(function (d2, [k, v]) {
      d2[k] = funcMapValue(v);
      return d2;
    }, {});
  }
}
