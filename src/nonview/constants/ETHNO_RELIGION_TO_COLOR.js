import COLOR_SL_FLAG from "../../nonview/constants/COLOR_SL_FLAG";

const ETHNO_RELIGION_TO_COLOR = {
  // ethnicity_of_population
  bharatha: "cyan",
  burgher: "purple",
  chetty: "blue",
  indian_tamil: COLOR_SL_FLAG.TAMIL,
  malay: COLOR_SL_FLAG.MOOR,
  moor: COLOR_SL_FLAG.MOOR,
  sinhalese: COLOR_SL_FLAG.SINHALA,
  sri_lankan_tamil: COLOR_SL_FLAG.TAMIL,
  // religious_affiliation_of_population
  buddhist: COLOR_SL_FLAG.BUDDHIST,
  islam: COLOR_SL_FLAG.MOOR,
  hindu: COLOR_SL_FLAG.TAMIL,
  roman_catholic: "purple",
  other_christian: "blue",
};

export default ETHNO_RELIGION_TO_COLOR;
