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
import { useParams } from "react-router";
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

export default function Login(props) {
    let history = useHistory ();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [userUid, setUserUid] = useState("");
    const [userToken, setUserToken] = useState("");

    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);

    const [message, setMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [successAlert, setSuccessAlert] = useState();

    const { uid } = useParams();
    const { token } = useParams();

    const passwordChange = (e) => {
        setIsPasswordEmpty(false);
        setMessage(null);
        setError(false);
        setPassword(e.target.value);
    };
    const confirmPasswordChange = (e) => {
        setIsConfirmPasswordEmpty(false);
        setMessage(null);
        setError(false);
        setConfirmPassword(e.target.value);
    };

    const resetPassword = (e) => {
        e.preventDefault();
        if ( password === confirmPassword && password.length !== 0 && confirmPassword.length !== 0 ) {
            const formData = new FormData()
            formData.append('password', password)
            console.log("User", formData)
            insertData(formData);
            setError(false);
            setIsPasswordEmpty(false);
        } else if (password.length === 0) {
            setIsPasswordEmpty(true);
            setError(true);
        } else {
            setSuccessAlert(false);
            setError(true);
        }
    };
    
    async function insertData(insertRecord) {
        let response;
        try {
            response = await Api.getUserResetPassword(insertRecord, uid, token);
            const json = await response.json();
            if(json.msg){
                setSuccessAlert(true);
                setSuccessMessage(json.msg);
            }
            else {
                setMessage(json.non_field_errors);
            }
            // })
            
        } catch (e) {
            console.log("Message", e);
            setError(response || "Unexpected error");
        }
        setLoading(false);
    }
    
    return (
        <div className="loginBox">
            <h1>Reset Password</h1>
            {successAlert && <Alert className="mb-3" severity="success">{successMessage}</Alert>}
            {error && <Alert className="mb-3" severity="error">Password does not match!</Alert>}
            {message?<Alert className="mb-3" severity="error">{message}</Alert>:null}
            <form className="mb-3" onSubmit={resetPassword}>
            <Box className="mb-3" component="div">
                        <TextField
                            error={isPasswordEmpty}
                            value={password}
                            className="inputBox"
                            id="password"
                            label="New Password"
                            variant="outlined"
                            type="password"
                            onChange={passwordChange}
                            helperText={isPasswordEmpty && "Password field can't be empty."}
                        />
                    </Box>
                    <Box className="mb-3" component="div">
                        <TextField
                            error={isConfirmPasswordEmpty}
                            value={confirmPassword}
                            className="inputBox"
                            id="confirmpassword"
                            label="Confirm New Password"
                            variant="outlined"
                            type="password"
                            onChange={confirmPasswordChange}
                            helperText={isConfirmPasswordEmpty && "Confirm password field can't be empty and must be same as password."}
                        />
                    </Box>

                <Button variant="contained" size="large" type="submit">
                    Submit
                </Button>
            </form>
          
            <p>
            Login your account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
