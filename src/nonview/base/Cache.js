export default class Cache {
  static async get(cacheKey, asyncFallback) {
    const hotItem = localStorage.getItem(cacheKey);
    if (hotItem) {
      return JSON.parse(hotItem);
    }

    console.debug('Cache.get: ', cacheKey);
    const coldItem = await asyncFallback();
    try {
      localStorage.setItem(cacheKey, JSON.stringify(coldItem));
    } catch (QuotaExceededError) {
      localStorage.clear();
      console.warn('Cache.get: localStorage.clear()');
    }
    return coldItem;
  }
}
