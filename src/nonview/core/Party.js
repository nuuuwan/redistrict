import IDX from "../../nonview/base/IDX";

export default class Party {
  constructor(id, color, imgFile) {
    this.id = id;
    this.color = color;
    this.imgFile = imgFile;
  }

  static fromDict(d) {
    return new Party(d.id, d.color, d.imgFile);
  }

  static fromID(id) {
    return PARTY_IDX[id];
  }

  get imgSrc() {
    return process.env.PUBLIC_URL + "/images/parties/logo_" + this.id + ".png";
  }
}

const PARTY_D_LIST = [
  { id: "UNP", color: "darkgreen" },
  { id: "SJB", color: "darkgreen" },
  { id: "SLPP", color: "maroon" },
  { id: "SLFP", color: "blue" },
  { id: "ITAK", color: "yellow" },
  { id: "JVP", color: "red" },
];

const PARTY_LIST = PARTY_D_LIST.map((d) => Party.fromDict(d));
const PARTY_IDX = IDX.build(
  PARTY_LIST,
  (x) => x.id,
  (x) => x
);
