function getRandomBit() {
  return parseInt(Math.random() * 256);
}
export default class Color {
  static getRandom() {
    const r = getRandomBit();
    const g = getRandomBit();
    const b = getRandomBit();

    return `rgb(${r},${g},${b})`;
  }
}
