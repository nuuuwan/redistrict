const COLOR_TO_POLITICAL_PARTIES = {
  blue: ["Blue+", "SLFP", "PA", "UPFA"],
  green: ["Green+", "UNP", "NDF"],
  lightgreen: ["SJB"],
  maroon: ["SLPP"],
  orange: ["Tamil+","ACTC"],
  pink: ["NPP"],
  red: ["Red+", "JVP", "LSSP", "EPDP", "NMPP", "JJB", "TMVP", "TULF", "DPLF"],
  yellow: ["ITAK", "AITC"],
  darkgreen: ["Muslim+", "MNA", "SLMC"],
};

const POLITICAL_PARTY_TO_COLOR = Object.entries(
  COLOR_TO_POLITICAL_PARTIES
).reduce(function (COLOR_TO_POLITICAL_PARTIES, [color, polical_parties]) {
  for (let political_party of polical_parties) {
    COLOR_TO_POLITICAL_PARTIES[political_party] = color;
  }
  return COLOR_TO_POLITICAL_PARTIES;
}, {});

export default POLITICAL_PARTY_TO_COLOR;
