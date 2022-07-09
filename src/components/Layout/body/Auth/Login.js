import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Form.css";
import Api from "../../../../api";

export default function Login(props) {
    let history = useHistory();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [isUserNameEmpty, setIsUserNameEmpty] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
 
    const [message, setMessage] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [successAlert, setSuccessAlert] = useState();

    const userNameChange = (e) => {
        setIsUserNameEmpty(false);
        setMessage(null);
        setUserName(e.target.value);
    };
    const passwordChange = (e) => {
        setIsPasswordEmpty(false);
        setMessage(null);
        setPassword(e.target.value);
    };
    const loginUser = (e) => {
        e.preventDefault();
        if (userName.length !== 0 && password.length !== 0) {
            const formData = new FormData()
            formData.append('username', userName)
            formData.append('password', password)
            console.log("User", formData)
            insertData(formData);
            setSuccessAlert(true);
            setError(false);
            setIsUserNameEmpty(false);
            setIsPasswordEmpty(false);
        } else if (userName.length === 0) {
            setIsUserNameEmpty(true);
            setError(true);
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
            response = await Api.getUserLogin(insertRecord);
            console.log("Response", response)
            const json = await response.json();
            console.log("Json", json)
            if(json.token){
            localStorage.setItem("Id", json.id);
            localStorage.setItem("Username", json.username);
            localStorage.setItem("Token", json.token);
            localStorage.setItem("Key", btoa(password));
            history.push({
                pathname: '/dbConnectionListView',
            })
        }
        else {
            setMessage(json);
        }
        } catch (e) {
            console.log("Message", e);
            setError(response || "Unexpected error");
        }
        setLoading(false);
    }

    return (
        <div className="loginBox">
            <h1>Login</h1>
            {message?<Alert className="mb-3" severity="error">{message}</Alert>:null}
            <form className="mb-3" onSubmit={loginUser}>
                <Box className="mb-3" component="div">
                    <TextField
                        error={isUserNameEmpty}
                        value={userName}
                        className="inputBox"
                        id="username"
                        label="User Name"
                        variant="outlined"
                        onChange={userNameChange}
                        helperText={isUserNameEmpty && "Usename field can't be empty."}
                    />
                </Box>
                <Box className="mb-3" component="div">
                    <TextField
                        error={isPasswordEmpty}
                        value={password}
                        className="inputBox"
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={passwordChange}
                        helperText={isPasswordEmpty && "Password field can't be empty."}
                    />
                </Box>
                <Button className="mb-3" variant="contained" size="large" type="submit">
                    Login
                </Button>
            </form>
            <Box className="mb-3">
                Don't have an Account! <Link to="/register">Register</Link>
            </Box>
            <Box>
                Forgot <Link to="/forgot-password">Password?</Link>
            </Box>
        </div>
    );
}
