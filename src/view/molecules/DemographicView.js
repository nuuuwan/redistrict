import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import GIG2TableStyle from "../../nonview/base/GIG2TableStyle";
import MathX from "../../nonview/base/MathX";
import StringX from "../../nonview/base/StringX";
import RegionEntIdx from "../../nonview/core/RegionEntIdx";
import Seats from "../../nonview/core/Seats";

const STYLE_BOX = { width: 100 };
const STYLE_TABLE = {
  [`& .${tableCellClasses.root}`]: {
    border: "none",
    width: "fit-content",
    maxWidth: 200,
    verticalAlign: "top",
    margin: 0,
    padding: 0,
  },
};

export default function DemographicView({
  idList,
  funcDemographicsInfo,
  nSeats,
  fairSeats,
  totalSeatError,
}) {
  const demographicInfo = funcDemographicsInfo(idList);
  const totalPop = MathX.sumGeneric(Object.values(demographicInfo), (x) => x);
  const itemToSeats = Seats.divideSeats(nSeats, demographicInfo);

  const seatError = totalSeatError
    ? totalSeatError
    : RegionEntIdx.getSeatError(idList, nSeats, funcDemographicsInfo);

  return (
    <Box sx={STYLE_BOX}>
      <TableContainer>
        <Table sx={STYLE_TABLE}>
          <TableBody>
            {Object.entries(demographicInfo)
              .sort((a, b) => b[1] - a[1])
              .map(function ([k, v]) {
                const color = GIG2TableStyle.getValueKeyColor(k);
                const nSeatsForItem = itemToSeats[k];
                const sxCell = { color };

                let seatsStr = "";
                if (fairSeats && fairSeats[k]) {
                  seatsStr += `${fairSeats[k]}`;
                }
                if (nSeatsForItem) {
                  seatsStr += ` [${nSeatsForItem}]`;
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
                        {seatsStr}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            <TableRow>
              <TableCell>
                <Typography variant="caption">{"Seat Error"}</Typography>
              </TableCell>

              <TableCell align="right">
                <Typography variant="caption">
                  {StringX.formatFloat(seatError)}
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
