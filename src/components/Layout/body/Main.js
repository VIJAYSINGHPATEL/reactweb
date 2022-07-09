import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Api from "../../../../api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Main(props) {
  const { title } = props;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Authorization Data
  const authName = localStorage.getItem("Username");
  const authKey = atob(localStorage.getItem("Key"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.getDataBaseConnections(authName, authKey);
        const json = await response.json();

        setData(json);
        console.log(data, "data uri");
      } catch (e) {
        setError(e.message || "Unexpected error");
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading</div>;
    // return (<Box sx={{ display: 'flex' }}>
    //   <CircularProgress />
    // </Box>)
  }

  if (error) {
    return <div style={{ color: "red" }}>ERROR: {error}</div>;
  }

  return (
    <Box className="main" component="div">
      <Box className="heading" component="h1">
        {title}
      </Box>
      <Box className="button" component="div">
        <Link to="/dbConnectiondetailedview">
          <Button size="large" variant="contained">
            Add
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name </StyledTableCell>
              <StyledTableCell align="center">Last Updated By </StyledTableCell>
              <StyledTableCell align="right">Last Update Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.lastUpdatedBy}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.lastUpdatedTime}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
