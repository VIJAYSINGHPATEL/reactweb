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
import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./Form.css";
import Api from "../../../../api";

export default function ResetPassword(props) {
    let history = useHistory();
    const [userEmail, setUserEmail] = useState("");

    const [isUserEmailEmpty, setIsUserEmailEmpty] = useState(false);

    const [message, setMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [successAlert, setSuccessAlert] = useState();

    const userEmailChange = (e) => {
        setIsUserEmailEmpty(false);
        setMessage(null);
        setUserEmail(e.target.value);
    };
    const forgotPassword = (e) => {
        e.preventDefault();
        if (userEmail.length !== 0) {
            const formData = new FormData()
            formData.append('email', userEmail)
            console.log("User", formData)
            insertData(formData);
            
            setError(false);
            setIsUserEmailEmpty(false);
        } else if (userEmail.length === 0) {
            setIsUserEmailEmpty(true);
            setError(true);
        } else {
            setSuccessAlert(false);
            setError(true);
        }
    };

    async function insertData(insertRecord) {
        let response;
        try {
            response = await Api.getUserForgotPassword(insertRecord);
            console.log("Response", response)
            const json = await response.json();
            if(json.msg){
                setSuccessAlert(true);
                setSuccessMessage(json.msg);
            }
            else {
                setMessage(json.non_field_errors);
            }
        } catch (e) {
            console.log("Message", e);
            setError(response || "Unexpected error");
        }
        setLoading(false);
    }

    return (
        <div className="loginBox">
            <h1>Forgot Password</h1>
            {successAlert && <Alert className="mb-3" severity="success">{successMessage}</Alert>}
            {message?<Alert className="mb-3" severity="error">{message}</Alert>:null}
            <form className="mb-3" onSubmit={forgotPassword}>
                <Box className="mb-3" component="div">
                    <TextField
                        error={isUserEmailEmpty}
                        value={userEmail}
                        className="inputBox"
                        id="username"
                        label="User Email"
                        variant="outlined"
                        type="email"
                        onChange={userEmailChange}
                        helperText={isUserEmailEmpty && "Email field can't be empty."}
                    />
                </Box>
                <Button variant="contained" size="large" type="submit">
                    Submit
                </Button>
            </form>
            <Box>
                Login your account? <Link to="/login">Login</Link>
            </Box>
        </div>
    );
}
