import IDX from "../../nonview/base/IDX";

export default class Candidate {
  constructor(id, firstName, lastName, twtrHandle, imgFile, party) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.twtrHandle = twtrHandle;
    this.imgFile = imgFile;
    this.party = party;
  }

  static fromDict(d) {
    return new Candidate(
      d.id,
      d.firstName,
      d.lastName,
      d.twtrHandle,
      d.imgFile,
      d.party
    );
  }

  static fromId(id) {
    return CANDIDATE_IDX[id];
  }

  get imgSrc() {
    return process.env.PUBLIC_URL + "/images/candidates/" + this.imgFile;
  }
}

const CANDIDATE_D_LIST = [
  {
    id: "RW",
    firstName: "Ranil",
    lastName: "Wickramasinghe",
    twtrHandle: "RW_UNP",
    imgFile: "1244.jpg",
    party: "UNP",
  },
  {
    id: "SP",
    firstName: "Sajith",
    lastName: "Premadasa",
    twtrHandle: "SajithPremadasa",
    imgFile: "140.jpg",
    party: "SJB",
  },
  {
    id: "SF",
    firstName: "Sarath",
    lastName: "Fonseka",
    twtrHandle: "GeneralFonseka",
    imgFile: "3135.jpg",
    party: "SJB",
  },
  {
    id: "MAS",
    firstName: "Mathiaparanan Abraham",
    lastName: "Sumanthiran",
    twtrHandle: "MASumanthiran",
    imgFile: "3194.jpg",
    party: "ITAK",
  },
  {
    id: "DA",
    firstName: "Dullas",
    lastName: "Alahapperuma",
    twtrHandle: "DullasOfficial",
    imgFile: "2868.jpg",

    party: "SLPP",
  },
  {
    id: "HdS",
    firstName: "Harsha",
    lastName: "de Silva",
    twtrHandle: "HarshadeSilvaMP",
    imgFile: "3201.jpg",
    party: "SJB",
  },
  {
    id: "AKD",
    firstName: "Anura Kumara",
    lastName: "Disanayake",
    twtrHandle: "AnuraDisanayake",
    imgFile: "112.jpg",
    party: "JVP",
  },
  {
    id: "MS",
    firstName: "Maithripala",
    lastName: "Sirisena",
    twtrHandle: "MaithripalaS",
    imgFile: "191.jpg",
    party: "SLFP",
  },
  {
    id: "PCR",
    firstName: "Patali Champika",
    lastName: "Ranawaka",
    twtrHandle: "PCRanawaka",
    imgFile: "3076.jpg",
    party: "SJB",
  },
];

export const CANDIDATE_LIST = CANDIDATE_D_LIST.map((d) =>
  Candidate.fromDict(d)
);

export const CANDIDATE_IDX = IDX.build(
  CANDIDATE_LIST,
  (x) => x.id,
  (x) => x
);
