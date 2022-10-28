import Ents from "../../nonview/base/Ents";
import GIG2 from "../../nonview/base/GIG2";

let commonStoreSingleton = undefined;
const ETHNICITY_TABLE_NAME = "population-ethnicity.regions.2012";

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
    this.ethnicityTable = null;
  }

  async load() {
    this.allEntIndex = await Ents.getAllEntIndex();
    this.ethnicityTable = await GIG2.getTable(ETHNICITY_TABLE_NAME);
  }
}
