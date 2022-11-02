function getRandomInt(min, max) {
  return parseInt(min + Math.random() * (max - min));
}

let keyToColor = {};
const COLOR_DEFAULTS = { h: 0, s: 100, l: 50, a: 1 };

export default class Color {
  static getForKey(key) {
    if (!keyToColor[key]) {
      keyToColor[key] = Color.getRandom();
    }
    return keyToColor[key];
  }

  static getForIter(i, n) {
    const h = parseInt((i * 360) / n);
    const l = [40, 60, 80][i % 3];
    const { s, a } = COLOR_DEFAULTS;
    return Color.hsla(h, s, l, a);
  }

  static getRandom() {
    const h = getRandomInt(0, 240);
    const { s, l, a } = COLOR_DEFAULTS;
    return Color.hsla(h, s, l, a);
  }

  static rgba(r, g, b, a) {
    return `rgba(${r},${g}%,${b}%,${a})`;
  }

  static hsla(h, s, l, a) {
    return `hsla(${h},${s}%,${l}%,${a})`;
  }
}
