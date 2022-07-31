export default class Weight {
  static getMagnitudeText(weight) {
    const absWeight = Math.abs(weight);
    let magnitudeText;
    if (absWeight > 75) {
      magnitudeText = "Extremely";
    } else if (absWeight > 50) {
      magnitudeText = "Quite";
    } else if (absWeight > 25) {
      magnitudeText = "Somewhat";
    } else if (absWeight > 0) {
      magnitudeText = "Slightly";
    } else {
      magnitudeText = "Neutral";
    }
    return magnitudeText;
  }
  static getDirectionText(weight) {
    if (weight > 0) {
      return "Suitable";
    }

    if (weight < 0) {
      return "Unsuitable";
    }
    return "";
  }

  static signed(weight) {
    weight = parseInt(Math.round(weight, 0));
    let signPrefix = "";
    if (weight > 0) {
      signPrefix = "+";
    }
    return signPrefix + weight;
  }

  static getColor(weight) {
    const hue = ((weight + 100) * 120) / 200;
    const absWeight = Math.abs(weight);
    const sat = absWeight;
    const light = (50 * (100 - absWeight)) / 100 + 30;
    return `hsla(${hue},${sat}%,${light}%,1)`;
  }
}
