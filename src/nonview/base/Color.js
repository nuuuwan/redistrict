function getRandomInt(min, max) {
  return parseInt(min + Math.random() * (max - min));
}

let keyToColor = {};
const DEFAULT_SLA = [100, 50, 1];

export default class Color {
  static getForKey(key) {
    if (!keyToColor[key]) {
      keyToColor[key] = Color.getRandom();
    }
    return keyToColor[key];
  }

  static getRandom() {
    const h = getRandomInt(0, 360);
    const [s, l, a] = DEFAULT_SLA;
    return Color.hsla(h, s, l, a);
  }

  static rgba(r, g, b, a) {
    return `rgba(${r},${g}%,${b}%,${a})`;
  }

  static hsla(h, s, l, a) {
    return `hsla(${h},${s}%,${l}%,${a})`;
  }
}
