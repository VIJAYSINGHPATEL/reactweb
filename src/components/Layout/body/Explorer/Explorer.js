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

export default function Explorer(props) {
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
      Coming soon...
    </Box>
  );
}
