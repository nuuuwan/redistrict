export default class DictUtils {
  static filterDict(d, keyList) {
    return Object.entries(d).reduce(function (filteredDict, [k, v]) {
      if (keyList.includes(k)) {
        filteredDict[k] = v;
      }
      return filteredDict;
    }, {});
  }
}
