import ETHNO_RELIGION_TO_COLOR from "../../nonview/constants/ETHNO_RELIGION_TO_COLOR";
import POLITICAL_PARTY_TO_COLOR from "../../nonview/constants/POLITICAL_PARTY_TO_COLOR";

const FIELD_NAME_TO_COLOR_INNER = {
  Others: "ghostwhite",
  other: "ghostwhite",
  others: "ghostwhite",

  // gender_of_population
  female: "pink",
  male: "lightblue",
  // age_group_of_population
  // relationship_to_household_head_of_population
  son_or_daughter: "green",
  head: "blue",
  wife_or_husband: "pink",
  grandchild_or_great_grand_child: "darkgreen",
  other_relative: "yellow",
  non_relative: "silver",
  son_or_daughter_in_law: "lightgreen",
  parent_of_head_or_spouse: "red",
  boarder: "gray",
  domestic_employee: "brown",
  clergy: "yellow", //
  // communication_items_owned_by_household
  tv: "green",
  mobile: "purple",
  radio: "maroon",
  fixed_tp: "blue",
  pc: "red",
  laptop: "pink",
  fax: "silver",
  // cooking_fuel_of_household
  fire_wood: "brown",
  gas: "orange",
  kerosene: "purple",
  electricity: "blue",
  // roof_type_in_housing_unit

  // rooms_in_housing_unit
  // floor_type_in_housing_unit
  asbestos: "gray",
  tile: "darkred",
  metal_sheet: "silver",
  concrete: "green",
  zink_aluminium_sheet: "blue",
  cement: "lightgray",
  tile_or_granite_or_terrazo: "orange",
  mud: "darkbrown",
  wood: "brown",
  // solid_waste_disposal_by_household
  occupants_burn: "red",
  occupants_bury: "orange",
  collected_by_local_authorities: "blue",
  occupants_composting_solid_waste: "green",
  // source_of_drinking_water_of_household
  tap_within_unit_main_line: "darkgreen",
  tap_within_premises_but_outside_unit_main_line: "green",
  tap_outside_premises_main_line: "orange",
  protected_well_within_premises: "blue",
  protected_well_outside_premises: "lightblue",
  unprotected_well: "purple",
  tube_well: "cyan",
  rural_water_projects: "pink",
  river_or_tank_or_stream: "red", //
  bottled_water: "silver",
  // structure_of_housing_units
  single_house_single_floor: "darkgreen",
  single_house_double_floor: "green",
  single_house_more_than_2_floors: "lightgreen",
  row_house_or_line_room: "orange",
  attached_house_or_annex: "silver",
  twin_house: "cyan",
  flat: "blue",
  condominium: "purple",
  hut_or_shanty: "red",

  // housing_ownership_status_of_household
  owned_by_a_household_member: "green",
  rent_or_lease_privately_owned: "blue",
  rent_or_lease_government_owned: "cyan",
  occupied_free_of_rent: "orange",
  encroached: "red",
  // toilet_facilities_of_household
  water_seal_and_connected_to_a_piped_sewer_system: "green",
  water_seal_and_connected_to_a_septic_tank: "lightgreen",
  pour_flush_toilet_not_water_seal: "orange",
  direct_pit: "red",
  not_using_a_toilet: "black",
  // lighting_of_household
  electricity_national_electricity_network: "blue",
  solar_power: "yellow",
  bio_gas: "orange",
  // living_quarters
  housing_unit: "green",
  collective_living_quarter: "orange",
  non_housing_unit: "red",
  // type_of_housing_unit
  semi_permanent: "orange",
  permanent: "green",
  improvised: "red",
  unclassified: "black",
  // marital_status_of_population
  married_registered: "blue",
  never_married: "green",
  widowed: "orange",
  married_customary: "lightblue",
  separated_not_legally: "pink",
  divorced: "red",
  legally_separated: "maroon",
  // wall_type_in_housing_units
  cement_block_or_stone: "darkgray",
  brick: "maroon",
  cabook: "orange",
  soil_bricks: "green",
  plank_or_metal_sheet: "silver",
  // occupation_status_of_housing_units
  cadjan_or_palmyrah: "orange",
  occupied: "green",
  vacant: "red",
  // year_of_construction_of_housing_unit
  // persons_living_in_housing_unit,
};
const FIELD_NAME_TO_COLOR = {
  ...POLITICAL_PARTY_TO_COLOR,
  ...ETHNO_RELIGION_TO_COLOR,
  ...FIELD_NAME_TO_COLOR_INNER,
};
export default FIELD_NAME_TO_COLOR;
