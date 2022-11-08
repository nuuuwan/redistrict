import Ents from "../../nonview/base/Ents";
import GIG2 from "../../nonview/base/GIG2";

let commonStoreSingleton = undefined;
const ETHNICITY_TABLE_NAME = "population-ethnicity.regions.2012";
const RELIGION_TABLE_NAME = "population-religion.regions.2012";
const PARLIAMENTARY_2015_ELECTION_TABLE_NAME =
  "government-elections-parliamentary.regions-ec.2015";
const PARLIAMENTARY_2020_ELECTION_TABLE_NAME =
  "government-elections-parliamentary.regions-ec.2020";

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
    this.isLoaded = false;
    this.allEntIndex = null;
    this.ethnicityTable = null;
    this.religionTable = null;
    this.election2015Table = null;
    this.election2020Table = null;
  }

  async load() {
    this.allEntIndex = await Ents.getAllEntIndex();
    this.ethnicityTable = await GIG2.getTable(ETHNICITY_TABLE_NAME);
    this.religionTable = await GIG2.getTable(RELIGION_TABLE_NAME);
    this.election2015Table = await GIG2.getTable(
      PARLIAMENTARY_2015_ELECTION_TABLE_NAME
    );
    this.election2020Table = await GIG2.getTable(
      PARLIAMENTARY_2020_ELECTION_TABLE_NAME
    );
    this.isLoaded = true;
  }
}
