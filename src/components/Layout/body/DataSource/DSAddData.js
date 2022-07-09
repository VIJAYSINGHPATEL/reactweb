import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Api from "../../../../api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 0,
  },
}));

export default function DSAddData(props) {
  console.log(props, "props123");
  const { title, addUrl } = props;
  const ref = useRef();
  const [filesStr, setFilesStr] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [creationTime, setCreationTime] = useState(null);
  const [lastUpdatedBy, setLastUpdatedBy] = useState();
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  //const [user, setUser] = useState("Chris");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [creatorUser, setCreatorUser] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successAlert, setSuccessAlert] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  //Authorization Data
  const authName = localStorage.getItem("Username");
  const authKey = atob(localStorage.getItem("Key"));

  ///const [selectedFile,setSelectedFile] = useState();
  const [fileBase64String, setFileBase64String] = useState("");

  const onFileChange = (e) => {
    setOpen(false);
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    console.log(e.target.files[0].size);
    console.log(e.target.files[0].type);

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      // logFile(e.target.result);
      setFilesStr(e.target.result);
    };

    let resultObj = {
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    };

    console.log("latest file = ", resultObj);
  };

  const reset = () => {
    ref.current.value = "";
    setSelectedFile(null);
    setFilesStr(null);
    setOpen(false);
  };

  const saveFile = () => {
    if (selectedFile && name.length !== 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("creationUser", creatorUser);
      formData.append("lastUpdatedUser", lastUpdatedBy);
      formData.append("parameter", selectedFile);
      insertData(formData);
      setSuccessAlert(true);
      // window.location = addUrl;
    } else if (!selectedFile) {
      //alert("Please select the file.")
      setOpen(true);
      setSuccessAlert(false);
    } else if (name.length === 0) {
      setIsNameEmpty(true);
      setSuccessAlert(false);
    } else {
    }
  };
  const nameChange = (e) => {
    setIsNameEmpty(false);
    setName(e.target.value);
  };

  const onCreatorChange = (e) => {
    setCreatorUser(e.target.value);
  };

  const onLastUpdatedBy = (e) => {
    setLastUpdatedBy(e.target.value);
  };

  async function insertData(insertRecord) {
    let response;
    try {
      response = await Api.getDSCreateData(insertRecord, authName, authKey);
      const json = await response.json();
      if (json.detail) {
        setErrorMessage(json.detail);
        setError(true);
      } else {
        setData(json);
        setErrorMessage(null);
        setSuccessAlert(true);
        setOpen(false);
      }
    } catch (e) {
      setError(response || "Unexpected error");
    }
    setLoading(false);
  }

  if (loading) {
    return <div>Loading</div>;
  }

  // if (error) {
  //   return <div style={{ color: "red" }}>ERROR: {error}</div>;
  // }

  return (
    <Box className="main" component="div">
      {successAlert && (
        <Alert severity="success">Database record successfully created!</Alert>
      )}
      {error && <Alert severity="error" className="mb-3">{setErrorMessage}</Alert>}
      <Box className="mb-3" component="div">
        {open && (
          <Alert
            severity="error"
            onClose={() => {
              setOpen(false);
            }}
          >
            Please select a file to upload.
          </Alert>
        )}
        {isNameEmpty && (
          <Alert
            severity="error"
            onClose={() => {
              setIsNameEmpty(false);
            }}
          >
            Name cannot be Empty.
          </Alert>
        )}
      </Box>
      <Box className="heading" component="h1">
        {title}
      </Box>

      <Box className="mb-3" component="div">
        <TextField
          value={name}
          className="inputBox"
          id="name"
          label="Name"
          variant="outlined"
          onChange={nameChange}
        />
      </Box>
      <Box className="mb-3" component="div">
        <TextField
          className="inputBox"
          id="creator"
          label="Creator"
          value={creatorUser}
          variant="outlined"
          onChange={onCreatorChange}
        />
      </Box>
      <Box className="mb-3" component="div">
        <TextField
          className="inputBox"
          id="last-updated-by"
          label="Last Updated By"
          variant="outlined"
          value={lastUpdatedBy}
          onChange={onLastUpdatedBy}
        />
      </Box>

      <TableContainer className="tableData" component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            <TableRow
              key={"Creator"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {"Creator"}
              </StyledTableCell>
              <StyledTableCell align="left">{creatorUser}</StyledTableCell>
            </TableRow>
            <TableRow
              key={"CreationTime"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {"Creation Time"}
              </StyledTableCell>
              <StyledTableCell align="left">{creationTime}</StyledTableCell>
            </TableRow>
            <TableRow
              key={"LastUpdatedBy"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {"Last Updated By"}
              </StyledTableCell>
              <StyledTableCell align="left">{lastUpdatedBy}</StyledTableCell>
            </TableRow>
            <TableRow
              key={"LastUpdateTime"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {"Last Update Time"}
              </StyledTableCell>
              <StyledTableCell align="left">{lastUpdateTime}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="label" component="label">
        Upload JSON Configuration file
      </Box>
      <Box className="mb-3" component="div">
        <input
          type="file"
          accept=".json"
          id="select-image"
          style={{ display: "none" }}
          onChange={onFileChange}
          ref={ref}
        />
        <label htmlFor="select-image">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component="span"
          >
            Upload File
          </Button>
          {"   "}
          <span style={{ fontSize: 18 }}>
            {selectedFile ? selectedFile.name : "Please select Json file."}
          </span>
        </label>
      </Box>
      <Stack spacing={2} direction="row">
        <Button variant="contained" size="large" onClick={saveFile}>
          Save Configuration
        </Button>

        <Button variant="outlined" color="error" size="large" onClick={reset}>
          Delete Configuration
        </Button>
      </Stack>
      <pre style={{ color: "blue", backgroundColor: "white", fontSize: 16 }}>
        {filesStr}
      </pre>
    </Box>
  );
}
