function getRandomInt(min, max) {
  return parseInt(min + Math.random() * (max - min));
}
export default class Color {
  static getRandom() {
    const h = getRandomInt(0, 360);
    const [s, l, a] = [100, 50, 1];
    return Color.hsla(h, s, l, a);
  }

  static rgba(r, g, b, a) {
    return `rgba(${r},${g}%,${b}%,${a})`;
  }

  static hsla(h, s, l, a) {
    return `hsla(${h},${s}%,${l}%,${a})`;
  }
}
