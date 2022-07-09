import React, { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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

export default function DSDetailsView(props) {
  const location = useLocation();
  const history = useHistory();
  // console.log(props,'props123')
  // console.log("detail location = ",location.state.data)
  const { title, addUrl } = props;
  const ref = useRef();
  const [filesStr, setFilesStr] = useState("");
  const [filesSqlStr, setSqlFilesStr] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState();
  const [selectedSqlFile, setSelectedSqlFile] = useState();
  const [selectedSqlFileName, setSelectedSqlFileName] = useState();
  const [parameter, setParameter] = useState();
  const [sqlFile, setSqlFile] = useState();
  const [id, setId] = useState(location.state.data.id);
  const [databaseResult, setdatabaseResult] = useState(null);
  const [configurationDetail, setConfigurationDetail] = useState(null);
  const [creationTime, setCreationTime] = useState("");
  const [lastUpdatedBy, setLastUpdatedBy] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [creatorUser, setCreatorUser] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [successAlert, setSuccessAlert] = useState();

  //Authorization Data
  const authName = localStorage.getItem("Username");
  const authKey = atob(localStorage.getItem("Key"));

  const [jsonData, setJsonData] = useState([]);

  const getDataFromServer = async () => {
    const response = await Api.getDSSingleListRecord(
      location.state.data.id,
      authName,
      authKey
    );
    const json = await response.json();
    console.log("response inside detailview = ", json);
    // setJsonData(json[Database Result]);
    setStatus(json["Status"]);
    // setdatabaseResult(json["Database Result"])
    // setConfigurationDetail(json["Configuration Details"])
    setSelectedFileName(json["Data Source Details"].parameter);
    setParameter(json["Data Source Details"].parameter);
    setName(json["Data Source Details"].name);

    setCreationTime(json["Data Source Details"].creationTime);
    setLastUpdatedBy(json["Data Source Details"].lastUpdatedUser);
    setLastUpdateTime(json["Data Source Details"].lastUpdateTime);
    setUser(json["Data Source Details"].creation_user);
    setCreatorUser(json["Data Source Details"].creation_user);
    setLoading(false);
  };

  useEffect(async () => {
    getDataFromServer();
  }, [location.state.data.id]);

  const onFileChange = (e) => {
    //setOpen(false);
    setSelectedFile(e.target.files[0]);
    // console.log("target files =  ",e.target.files[0].name)
    setSelectedFileName(e.target.files[0].name);
    setCreationTime(new Date().toLocaleString());
    setLastUpdateTime(new Date().toLocaleString());
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      // logFile(e.target.result);
      setFilesStr(e.target.result);
    };
  };
  const onSqlFileChange = (e) => {
    //setOpen(false);
    setSelectedSqlFile(e.target.files[0]);
    // console.log("target files =  ",e.target.files[0].name)
    setSelectedSqlFileName(e.target.files[0].name);

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      // logFile(e.target.result);
      setSqlFilesStr(e.target.result);
    };
  };
  const reset = () => {
    ref.current.value = "";
    setSelectedFile(null);
    setSelectedFileName(null);
    setFilesStr(null);
    setSelectedSqlFile(null);
    setSelectedSqlFileName(null);
    setSqlFilesStr(null);
    setOpen(false);
  };

  const saveFile = () => {
    if (name.length !== 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("creation_user", creatorUser);
      formData.append("lastUpdatedUser", lastUpdatedBy);
      {
        selectedFile &&
          formData.append("parameter", selectedFile ? selectedFile : parameter);
      }
      {
        selectedSqlFile &&
          formData.append(
            "sql_file",
            selectedSqlFile ? selectedSqlFile : sqlFile
          );
      }
      updateData(formData, id);
      setSuccessAlert(true);
      // window.location = addUrl;
    } else if (!selectedFile) {
      //alert("Please select the file.")
      // setOpen(true);
      setSuccessAlert(false);
    } else if (name.length === 0) {
      setIsNameEmpty(true);
      setSuccessAlert(false);
    } else {
    }
  };
  const showTable = () => {};
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
  async function updateData(insertRecord, id) {
    console.log("update is called");
    let response;
    try {
      response = await Api.updateDSRecordById(
        insertRecord,
        id,
        authName,
        authKey
      );
      const json = await response.json();
      getDataFromServer();
      // setData(json);
    } catch (e) {
      setError(response || "Unexpected error");
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <Box className="loader">
        <CircularProgress /> Data loading...
      </Box>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>ERROR: {error}</div>;
  }

  return (
    <>
      {loading ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="main" component="div">
          {successAlert && (
            <Alert severity="success" style={{ fontSize: "18px" }}>
              Database table record successfully updated!
            </Alert>
          )}
          <Box className="mb-3" component="div">
            {/* {open && (
      <Alert
        severity="error"
        onClose={() => {
          setOpen(false);
        }}
      >
        Please select a file to upload.
      </Alert>
    )} */}
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
          {/* <Box className="label" component="label">
    Name
  </Box> */}

          <Box className="mb-3" component="div">
            <TextField
              value={name}
              className="inputBox"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={nameChange}
            />
          </Box>
          <Box className="mb-3" component="div">
            <TextField
              className="inputBox"
              id="outlined-basic"
              label="Creator"
              value={creatorUser}
              variant="outlined"
              onChange={onCreatorChange}
            />
          </Box>
          <Box className="mb-3" component="div">
            <TextField
              className="inputBox"
              id="outlined-basic"
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
                  key={"Name"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {"Name"}
                  </StyledTableCell>
                  <StyledTableCell align="left">{name}</StyledTableCell>
                </TableRow>
                <TableRow
                  key={"Creator"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {"Creator"}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user}</StyledTableCell>
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
                  <StyledTableCell align="left">
                    {lastUpdatedBy}
                  </StyledTableCell>
                </TableRow>
                <TableRow
                  key={"LastUpdateTime"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {"Last Update Time"}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {lastUpdateTime}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="label" component="label">
            Upload New JSON Configuration file
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
                Upload New File
              </Button>
              {"   "}
              <span style={{ fontSize: 18 }}>
                {selectedFileName
                  ? selectedFileName
                  : "Please select Json file."}
              </span>
            </label>
          </Box>
          <Box className="label" component="label">
            Upload SQL file
          </Box>
          <Box className="mb-3" component="div">
            <input
              type="file"
              accept=".sql"
              id="select-sql"
              style={{ display: "none" }}
              onChange={onSqlFileChange}
              ref={ref}
            />
            <label htmlFor="select-sql">
              <Button
                variant="contained"
                color="primary"
                size="large"
                component="span"
              >
                Upload SQL File
              </Button>
              {"   "}
              <span style={{ fontSize: 18 }}>
                {selectedSqlFileName
                  ? selectedSqlFileName
                  : "Please select SQL file."}
              </span>
            </label>
          </Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={saveFile}>
              Update Configuration
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={() => {
                Api.getDSDeleteDbConnection(
                  location.state.data.id,
                  authName,
                  authKey
                ).then(() => {
                  history.push("/");
                });
              }}
            >
              Delete Record
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
