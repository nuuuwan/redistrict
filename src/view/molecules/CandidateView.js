import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";
import Candidate from "../../nonview/core/Candidate";

import PartyView from "../../view/molecules/PartyView";
import WeightView from "../../view/molecules/WeightView";

const AVATAR_SIZE = 64;
export default function CandidateView({ candidateId, score, rank }) {
  const candidate = Candidate.fromId(candidateId);
  return (
    <Card sx={{ m: 1, p: 1 }}>
      <Stack direction="row" gap={2} sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ color: "lightgray" }}>
          {"#" + (rank + 1)}
        </Typography>
        <Avatar
          src={candidate.imgSrc}
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
        />
        <Box>
          <Typography sx={{ fontSize: "40%" }}>
            {t(candidate.firstName)}
          </Typography>
          <Typography sx={{ fontSize: "80%" }}>
            {t(candidate.lastName)}
          </Typography>
          <PartyView id={candidate.party} />
        </Box>
        <Typography sx={{ flexGrow: 1 }}> </Typography>
        <WeightView weight={score} />
      </Stack>
    </Card>
  );
}
