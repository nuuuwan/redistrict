import Stack from "@mui/material/Stack";

import CandidateView from "../../view/molecules/CandidateView";

export default function CandidatesLeaderBoard({
  candidateScoreAndRank,
  refHomePage,
}) {
  return (
    <Stack gap={1} ref={refHomePage}>
      {candidateScoreAndRank.map(function ([candidateId, score, rank]) {
        const key = "candidate-" + candidateId;
        return (
          <CandidateView
            key={key}
            candidateId={candidateId}
            score={score}
            rank={rank}
          />
        );
      })}
    </Stack>
  );
}
