function getRandomBit() {
  return parseInt(Math.random() * 256);
}
export default class Color {
  static getRandom() {
    const r = getRandomBit();
    const g = getRandomBit();
    const b = getRandomBit();

    return Color.rgba(r, g, b, 1);
  }

  static rgba(r, g, b, a) {
    return `rgba(${r},${g}%,${b}%,${a})`;
  }

  static hsla(h, s, l, a) {
    return `hsla(${h},${s}%,${l}%,${a})`;
  }
}
