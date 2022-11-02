import Ent from "../../nonview/base/Ent";
import { ENT_TYPES } from "../../nonview/base/EntTypes";

export default class Region extends Ent {
  static fromEnt(ent) {
    return new Region(ent.d);
  }
  get pop() {
    return parseInt(this.d.population);
  }

  get isPostal() {
    return this.entType === ENT_TYPES.PD && this.id.substring(5, 6) === "P";
  }

  get centroid() {
    return JSON.parse(this.d.centroid).map((x) => parseFloat(x));
  }

  get lat() {
    return this.centroid[0];
  }

  get lng() {
    return this.centroid[1];
  }

  get lngLat() {
    return { lng: this.lng, lat: this.lat };
  }
}
