import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import GIG2TableStyle from "../../nonview/base/GIG2TableStyle";
import MathX from "../../nonview/base/MathX";
import StringX from "../../nonview/base/StringX";
import Seats from "../../nonview/core/Seats";

import { styled } from "@mui/system";

const StyledHeaderTableCell = styled(TableCell)({
  color: "#ccc",
  maxWidth: 200,
  verticalAlign: "top",
  margin: 0,
  padding: 0,
  paddingRight: 0.5,
  fontSize: "80%",
});

const STYLE_BOX = { width: 200 };
const STYLE_TABLE = {
  [`& .${tableCellClasses.root}`]: {
    border: "none",
    width: "fit-content",
    maxWidth: 200,
    verticalAlign: "top",
    margin: 0,
    padding: 0,
    paddingRight: 0.5,
  },
};

export default function DemographicView({
  idList,
  funcDemographicsInfo,
  nSeats,
  fairSeats,
  totalUnfairness,
  children,
}) {
  const demographicInfo = funcDemographicsInfo(idList);
  const totalPop = MathX.sumGeneric(Object.values(demographicInfo), (x) => x);
  const itemToSeatsFair = Seats.divideSeats(nSeats, demographicInfo);
  const itemToSeatsPRWithBonus = Seats.divideSeats(
    nSeats,
    demographicInfo,
    1,
    0.05
  );

  const isTotalRow = fairSeats;

  return (
    <Box sx={STYLE_BOX}>
      <TableContainer>
        <Table sx={STYLE_TABLE}>
          <TableHead>
            <TableRow>
              <StyledHeaderTableCell>Group</StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                p(Pop.)
              </StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                Actual
              </StyledHeaderTableCell>
              {isTotalRow ? (
                <>
                  <StyledHeaderTableCell align="right">
                    Fair
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="right">
                    PR+Bonus
                  </StyledHeaderTableCell>
                </>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(demographicInfo)
              .sort((a, b) => b[1] - a[1])
              .map(function ([k, v]) {
                const color = GIG2TableStyle.getValueKeyColor(k);
                const sxCell = { color };

                let actualSeatsForItem = itemToSeatsFair[k];
                let fairSeatsForItem = fairSeats && fairSeats[k];

                if (isTotalRow) {
                  const t = fairSeatsForItem;
                  fairSeatsForItem = actualSeatsForItem;
                  actualSeatsForItem = t;
                }

                return (
                  <TableRow key={"demographics-" + k}>
                    <TableCell>
                      <Typography variant="caption" sx={sxCell}>
                        {StringX.toTitleCase(k)}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="caption" sx={sxCell}>
                        {StringX.formatPercent(v, totalPop)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="caption" sx={sxCell}>
                        {actualSeatsForItem}
                      </Typography>
                    </TableCell>
                    {isTotalRow ? (
                      <>
                        <TableCell align="right">
                          <Typography variant="caption" sx={sxCell}>
                            {fairSeatsForItem}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="caption" sx={sxCell}>
                            {itemToSeatsPRWithBonus[k]}
                          </Typography>
                        </TableCell>
                      </>
                    ) : null}
                  </TableRow>
                );
              })}
            {children}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
