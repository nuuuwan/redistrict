import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Candidate from "../../nonview/core/Candidate";

const AVATAR_SIZE = 24;
const MIN_SCORE = 1;
export default function CandidatesLeaderBoardShort({
  candidateScoreAndRank,
  onClickOpenPage,
}) {
  if (candidateScoreAndRank[0][1] < MIN_SCORE) {
    return null;
  }

  const onClick = function () {
    onClickOpenPage("CandidatePage");
  };

  return (
    <Stack direction="row" gap={1} onClick={onClick}>
      {candidateScoreAndRank
        .slice(0, 3)
        .map(function ([candidateId, score, rank]) {
          const key = "candidate-" + candidateId;
          const candidate = Candidate.fromId(candidateId);
          return (
            <Avatar
              key={key}
              src={candidate.imgSrc}
              sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            />
          );
        })}
    </Stack>
  );
}
