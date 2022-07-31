import DictUtils from "../../nonview/base/DictUtils";
import {
  ATTR_IDX_HLIYAN,
  ATTR_IDX_NUUUWAN,
} from "../../nonview/core/GroundTruthRawData";

import MathX from "../../nonview/base/MathX";
const ATTR_IDX_IDX = Object({
  "@nuuuwan": ATTR_IDX_NUUUWAN,
  "@nuuuwan (Economic Only)": DictUtils.filterDict(ATTR_IDX_NUUUWAN, [
    "Economic Experience at the National Level",
    "Will work with the IMF",
  ]),
  "@nuuuwan (Constituitional Only)": DictUtils.filterDict(ATTR_IDX_NUUUWAN, [
    "Voted for the 20th Amendment",
    "Will support abolishing the Executive Presidency while in seat",
    "Will support bringing back the 19th Amendment",
  ]),
  "@h_liyan": ATTR_IDX_HLIYAN,
});

export default class GroundTruth {
  static VERSIONS = Object.keys(ATTR_IDX_IDX);
  static DEFAULT_VERSION = GroundTruth.VERSIONS[0];

  static getVersions() {
    return GroundTruth.VERSIONS;
  }

  static getCriterionToCandidateToWeight(version) {
    if (!ATTR_IDX_IDX[version]) {
      version = GroundTruth.DEFAULT_VERSION;
    }
    return ATTR_IDX_IDX[version];
  }

  static getCriteria(version) {
    return Object.keys(GroundTruth.getCriterionToCandidateToWeight(version));
  }

  static getGenericCriterionWeights(version, funcGenerateWeight) {
    const criteria = GroundTruth.getCriteria(version);
    return criteria.map(function (criterion) {
      return funcGenerateWeight(criterion);
    });
  }

  static getInitCriterionWeights(version) {
    return GroundTruth.getGenericCriterionWeights(version, (criterion) => 0);
  }

  static getRandomCriterionWeights(version) {
    return GroundTruth.getGenericCriterionWeights(
      version,
      (criterion) => Math.random() * 200 - 100
    );
  }

  static getTotalWeight(criterionWeights) {
    return MathX.sumL1(criterionWeights);
  }

  static getCandidateToScore(version, criterionWeights) {
    let totalWeight = GroundTruth.getTotalWeight(criterionWeights);
    if (totalWeight === 0) {
      totalWeight = 1;
    }
    const critToCandToWeight =
      GroundTruth.getCriterionToCandidateToWeight(version);
    return Object.entries(critToCandToWeight).reduce(function (
      candToScore,
      [crit, candToWeight],
      iCrit
    ) {
      return Object.entries(candToWeight).reduce(function (
        candToScore,
        [cand, weight]
      ) {
        if (!candToScore[cand]) {
          candToScore[cand] = 0;
        }
        candToScore[cand] += (criterionWeights[iCrit] * weight) / totalWeight;
        return candToScore;
      },
      candToScore);
    },
    {});
  }

  static getSortedCandidateScoreAndRank(version, criterionWeights) {
    let prevScore = undefined;
    let prevRank = undefined;
    return Object.entries(
      GroundTruth.getCandidateToScore(version, criterionWeights)
    )
      .sort(function (a, b) {
        return b[1] - a[1];
      })
      .map(function ([candidate, score], iCandidate) {
        let rank = iCandidate;
        if (prevScore !== undefined && prevScore === score) {
          rank = prevRank;
        }
        prevRank = rank;
        prevScore = score;
        return [candidate, score, rank];
      }, []);
  }
}
