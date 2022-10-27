function getRandomInt(min, max) {
  return parseInt(min + Math.random() * (max - min));
}

const KEY_COLORS_COLOR0 = getRandomInt(0, 360);
let n = 0;
let keyToN = {};
const DEFAULT_SLA = [100, 50, 1];

export default class Color {
  static getForKey(key) {
    if (!keyToN[key]) {
      keyToN[key] = n;
      n += 1;
    }
    const incr = parseInt(360 / n);
    const h = (KEY_COLORS_COLOR0 + keyToN[key] * incr) % 360;
    const [s, l, a] = DEFAULT_SLA;
    return Color.hsla(h, s, l, a);
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
