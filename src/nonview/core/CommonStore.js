import Ents from "../../nonview/base/Ents";

let commonStoreSingleton = undefined;

export default class CommonStore {
  static async loadSingleton() {
    commonStoreSingleton = new CommonStore();
    await commonStoreSingleton.load();
    return commonStoreSingleton;
  }

  static getSingleton() {
    return commonStoreSingleton;
  }

  constructor() {
    this.allEntIndex = null;
  }

  async load() {
    this.allEntIndex = await Ents.getAllEntIndex();
  }
}
