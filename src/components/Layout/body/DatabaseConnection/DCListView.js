import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Api from "../../../../api";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "reactjs-popup";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ListViewPage(props) {
  let history = useHistory();

  const { title, addUrl } = props;
  const [deleteDialog, setOpen] = React.useState(false);

  const [UpdateDialog, SetUpdateDialog] = React.useState(false);
  const [deleteDialogItem, setDeleteDialogItem] = React.useState(false);
  const [ViewDialog, setViewDialog] = React.useState(false);

  //Authorization Data
  const authName = localStorage.getItem("Username");
  const authKey = atob(localStorage.getItem("Key"));

  //function for delete record
  const deleteDataRecord = async (data) => {
    //setOpen(true);
    let response;
    response = await Api.getDeleteDbConnection(data, authName, authKey);
    response = await Api.getListView(authName, authKey);

    const json = await response.json();

    setData(json);
    console.log(response, "json delete 123");
  };

  //function for view record

  const [viewDetails, setViewDetails] = useState([]);
  const [viewDetailsName, setViewDetailsName] = useState("");
  const [viewDetailsCreationTime, setViewDetailsCreationTime] = useState("");
  const [viewDetailsLastUpdateTime, setViewDetailsLastUpdateTime] =
    useState("");
  const [viewDetailsCreationUser, setViewDetailsCreationUser] = useState("");
  const [viewDetailsLastUpdatedUser, setViewDetailsLastUpdatedUser] =
    useState("");
  const [viewDetailsStatus, setViewDetailsStatus] = useState("");
  const [viewDetailsUserId, setViewDetailsUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //function for View Record Data
  async function ViewDataRecord(data) {
    let response;
    setIsLoading(true);
    response = await Api.getSingleListRecord(data, authName, authKey);
    const json = await response.json();
    console.log(json, "JSON Data");
    if (json) {
      setViewDetails(json);
      setViewDialog(true);
      setViewDetailsName(json.serializer.name);
      setViewDetailsCreationTime(json.serializer.creationTime);
      setViewDetailsLastUpdateTime(json.serializer.lastUpdateTime);
      setViewDetailsCreationUser(json.serializer.creation_user);
      setViewDetailsLastUpdatedUser(json.serializer.lastUpdatedUser);
      setViewDetailsStatus(json.con_obj);
      setViewDetailsUserId(json.serializer.id);
      setIsLoading(false);
    }

    console.log(viewDetails, "viewDetails");
  }

  //function for Update Record Data

  const [updateName, setUpdateName] = useState("");
  const [updateCreateUser, setCreateUser] = useState("");
  const [lastUpdatedUser, setLastUpdatedUser] = useState("");
  function UpdateItem(item) {
    SetUpdateDialog(true);
    setUpdateName(item.name);
    setCreateUser(item.creation_user);
    setLastUpdatedUser(item.lastUpdatedUser);
  }

  const handleClose = () => {
    setOpen(false);
    setViewDialog(false);
    SetUpdateDialog(false);
  };
  const handleAgree = () => {
    setOpen(true);
    setDeleteDialogItem(true);
  };

  const [data, setData] = useState([]);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    let isMounted = true;
    async function fetchData(deleteRecord) {
      try {
        let response;
        if (deleteRecord) {
          const filteredData = data.rows.filter(
            (row) => row.id !== deleteRecord
          );
          setData({ rows: filteredData, columns: data.columns });
          // response = await Api.getDeleteDbConnection(id, authName, authKey);
        } else {
          response = await Api.getListView(authName, authKey);

          const json = await response.json();

          setData(json);
          console.log(json);
        }
      } catch (e) {
        setError(e.message || "Unexpected error");
      }
      setLoading(false);
    }

    fetchData(deleteRecord);
  }, [deleteRecord]);

  if (loading) {
    return (
      <Box className="loader">
        <CircularProgress /> Data loading...
      </Box>
    );
    // return (<Box sx={{ display: 'flex' }}>
    //   <CircularProgress />
    // </Box>)
  }

  if (error) {
    return <div style={{ color: "red" }}>ERROR: {error}</div>;
  }
  console.log("Datas", data);
  return (
    <Box className="main" component="div">
      <Box className="heading" component="h1">
        {title}
      </Box>
      <Box className="button" component="div">
        <Link to={addUrl}>
          <Button size="large" variant="contained">
            Add
          </Button>
        </Link>
      </Box>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Dialog
          open={ViewDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"View Details"}
            {handleClose ? (
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>

          <Box
            sx={{
              width: 550,
              maxWidth: "100%",
            }}
          >
            <div style={{ padding: 5 }}>
              <h4>ID: {viewDetailsUserId}</h4>
              <h4>Name: {viewDetailsName}</h4>
              <h4>Creation Time: {viewDetailsCreationTime}</h4>
              <h4>Creation User: {viewDetailsCreationUser}</h4>
              <h4>Last Updated Time: {viewDetailsLastUpdateTime}</h4>
              <h4>Last Updated User: {viewDetailsLastUpdatedUser}</h4>
              <h4>Status: {viewDetailsStatus}</h4>
            </div>
          </Box>
        </Dialog>
      )}
      {!data.length > 0 ? (
        <Alert severity="info">No Record Found</Alert>
      ) : (
        <TableContainer component={Paper} style={{ maxHeight: 600 }}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Creation Time</TableCell>
                <TableCell>Last Update</TableCell>
                <TableCell>Creation User</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.creationTime}</TableCell>
                  <TableCell>{item.lastUpdateTime}</TableCell>
                  <TableCell>{item.creation_user}</TableCell>

                  <TableCell>
                    <ButtonGroup>
                      <Button
                        variant="outlined"
                        color="primary"
                        // onClick={() => ViewDataRecord(item.id)}
                        onClick={() => {
                          history.push({
                            pathname: "/dbConnectiondetailedview",
                            state: {
                              data: item,
                            },
                          });
                        }}
                      >
                        Details
                      </Button>
                      {/* <Button
                      variant="contained"
                      color="primary"
                  //    onClick={() => UpdateItem(item)}

                      onClick={()=>{
                        history.push({pathname:'/edittabledata',
                        state:{
                          data:item
                        },
                      })

                      }}
                    >
                      Update
                    </Button> */}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          if (window.confirm("are you sure !!")) {
                            deleteDataRecord(item.id, authName, authKey);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Code for Update Button*/}
      <Dialog
        open={UpdateDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Details"}
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <Box
          sx={{
            width: 550,
            maxWidth: "100%",
          }}
        >
          <TextField
            sx={{
              padding: 1,
              width: "80%",
            }}
            label="Name"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />

          <br />
          <br />

          <TextField
            sx={{
              padding: 1,
              width: "80%",
            }}
            label="Last Updated User"
            value={lastUpdatedUser}
            onChange={(e) => setLastUpdatedUser(e.target.value)}
          />

          <br />
          <br />

          <TextField
            sx={{
              padding: 1,
              width: "80%",
            }}
            label="Creation User"
            value={updateCreateUser}
            onChange={(e) => setCreateUser(e.target.value)}
          />

          <br />
          <br />

          <Button
            style={{ margin: "0 auto", display: "flex" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>

        {/* <div>
          <h4>Name: {updateName}</h4>
          <h4>Creation User: {updateCreateUser}</h4>
          <h4>Last Updated User: {lastUpdatedUser}</h4>
        </div> */}
      </Dialog>

      {/* Code for delete button */}
      <Dialog
        open={deleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete the record ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
