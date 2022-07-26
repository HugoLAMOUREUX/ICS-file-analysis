import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {row.subEvents.length == 0 ? (
            ""
          ) : (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>

        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.duration}</TableCell>
        <TableCell align="right">{row.occurence}</TableCell>
        <TableCell align="right">{row.durPerOccurence}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dont
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Activité</TableCell>
                    <TableCell align="right">Nombre d'heures</TableCell>
                    <TableCell align="right">Occurences</TableCell>
                    <TableCell align="right">
                      Nombre d'heures par occurence en moyenne
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subEvents.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell align="right">{historyRow.duration}</TableCell>
                      <TableCell align="right">
                        {historyRow.occurence}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.durPerOccurence}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    occurence: PropTypes.number.isRequired,
    durPerOccurence: PropTypes.number.isRequired,
    subEvents: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        occurence: PropTypes.number.isRequired,
        durPerOccurence: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ fileArray, sort }) {
  React.useEffect(() => {
    console.log(fileArray);
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Activité</TableCell>
            <TableCell align="right">Nombre d'heures</TableCell>
            <TableCell align="right">Occurences</TableCell>
            <TableCell align="right">
              Nombre d'heures par occurence en moyenne
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sort == "duration"
            ? fileArray
                .sort(function compare(a, b) {
                  if (a.duration < b.duration) return 1;
                  if (a.duration > b.duration) return -1;
                  return 0;
                })
                .map((row) => <Row key={row.name} row={row} />)
            : fileArray
                .sort(function compare(a, b) {
                  if (a.occurence < b.occurence) return 1;
                  if (a.occurence > b.occurence) return -1;
                  return 0;
                })
                .map((row) => <Row key={row.name} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
