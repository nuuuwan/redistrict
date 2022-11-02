import EntTypes from "../../nonview/base/EntTypes";

export default class Ent {
  constructor(d) {
    this.d = d;
  }

  get id() {
    return this.d.id;
  }

  get name() {
    return this.d.name;
  }

  get entType() {
    return EntTypes.getEntType(this.id);
  }

  getParentID(parentEntType) {
    return this.d[EntTypes.getIDField(parentEntType)];
  }
}
