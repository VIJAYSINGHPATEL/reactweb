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

export default function DMDetailsView(props) {
  const location = useLocation();
  const history = useHistory();
  // console.log(props,'props123')
  // console.log("detail location = ",location.state.data)
  const { title, addUrl } = props;
  const ref = useRef();
  const [filesStr, setFilesStr] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState();
  const [parameter, setParameter] = useState();
  const [id, setId] = useState(location.state.data.id);
  const [databaseResult, setdatabaseResult] = useState(null);
  const [configurationDetail, setConfigurationDetail] = useState(null);
  const [creationTime, setCreationTime] = useState("");
  const [lastUpdatedBy, setLastUpdatedBy] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [creatorUser, setCreatorUser] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  //Authorization Data
  const authName = localStorage.getItem("Username");
  const authKey = atob(localStorage.getItem("Key"));

  const [jsonData, setJsonData] = useState([]);

  const getDataFromServer = async () => {
    const response = await Api.getDMSingleListRecord(location.state.data.id, authName, authKey);
    const json = await response.json();
    console.log("response inside detailview = ", json);
    // setJsonData(json[Database Result]);
    setStatus(json["Connection Status"]);
    setdatabaseResult(json["Database Result"]);
    setConfigurationDetail(json["Configuration Details"]);
    console.log("response inside detailview12 = ", configurationDetail);
    setSelectedFileName(json["Data Model Details"].parameter);
    setParameter(json["Data Model Details"].parameter);
    setName(json["Data Model Details"].name);

    setCreationTime(json["Data Model Details"].creationTime);
    setLastUpdatedBy(json["Data Model Details"].lastUpdatedUser);
    setLastUpdateTime(json["Data Model Details"].lastUpdateTime);
    setUser(json["Data Model Details"].creation_user);
    setCreatorUser(json["Data Model Details"].creation_user);
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

  const reset = () => {
    ref.current.value = "";
    setSelectedFile(null);
    setSelectedFileName(null);
    setFilesStr(null);
    setOpen(false);
  };

  const saveFile = () => {
    if (name.length !== 0) {
      setLoading(true);
      // console.log("selectedFile :  ", selectedFile);

      // const formData = new FormData();
      // formData.append("name", selectedFile.name);

      // console.log("Form Data");
      // for (let i of formData) {
      //     console.log(i);
      // }
      // console.log(formData);
      //console.log(formData,"123")
      //let record = {"name":name,"creationUser":user,"createdTime":new Date().toLocaleString() ,"LastUpdatedTime":null,"LastUpdatedUser":null,"jsonData":filesStr};
      // e.target.files[0]

      // let resultObj = {

      //   file: selectedFile,
      //   url: URL.createObjectURL(selectedFile)
      // }
      // let record = {
      //         name: name,
      //         creationUser: creatorUser,
      //         lastUpdatedUser: lastUpdatedBy,
      //         parameter: selectedFile,
      //     };
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("creation_user", creatorUser);
      formData.append("lastUpdatedUser", lastUpdatedBy);
      {
        selectedFile &&
          formData.append("parameter", selectedFile ? selectedFile : parameter);
      }
      updateData(formData, id);
      // window.location = addUrl;
    } else if (!selectedFile) {
      //alert("Please select the file.")
      // setOpen(true);
    } else if (name.length === 0) {
      setIsNameEmpty(true);
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

  async function updateData(insertRecord, id) {
    console.log("update is called");
    let response;
    try {
      response = await Api.updateDMRecordById(insertRecord, id, authName, authKey);
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
            JSON Configuration details
          </Box>
          <pre
            className="p-3"
            style={{
              color: "blue",
              backgroundColor: "white",
              fontSize: 16,
              maxWidth: "1170px",
              overflowX: "auto",
            }}
          >
            {configurationDetail
              ? JSON.stringify(configurationDetail)
              : configurationDetail}
          </pre>
          <Box className="label" component="label">
            Status
          </Box>
          <pre
            className="p-3"
            style={{ color: "blue", backgroundColor: "white", fontSize: 16 }}
          >
            {status ? JSON.stringify(status) : status}
          </pre>
          <Box className="label" component="label">
            Data Record from SQL Database
          </Box>
          <TableContainer component={Paper} style={{ maxHeight: 600 }}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {databaseResult.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell>{item[1]}</TableCell>
                    <TableCell>{item[2]}</TableCell>
                  </TableRow>
                ))}
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
          <Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={saveFile}>
              Update Configuration
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={() => {
                Api.getDMDeleteDbConnection(location.state.data.id, authName, authKey).then(() => {
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
