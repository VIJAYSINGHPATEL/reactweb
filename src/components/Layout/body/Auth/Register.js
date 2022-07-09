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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Form.css";
import Api from "../../../../api";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  const emailChange = (e) => {
    setIsEmailEmpty(false);
    setMessage(null);
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setMessage(null);
    setPassword(e.target.value);
    setIsPasswordEmpty(true);
    if (e.target.value.length > 5) {
      setIsPasswordEmpty(false);
    }
  };
  const confirmPasswordChange = (e) => {
    setIsConfirmPasswordEmpty(false);
    setMessage(null);
    setConfirmPassword(e.target.value);
  };
  const registerUser = (e) => {
    e.preventDefault();
    if (
      password === confirmPassword &&
      userName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      confirmPassword.length !== 0
    ) {
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("email", email);
      formData.append("password", password);
      insertData(formData);
      setError(false);
      setIsUserNameEmpty(false);
      setIsEmailEmpty(false);

      setIsConfirmPasswordEmpty(false);
    } else if (userName.length === 0) {
      setIsUserNameEmpty(true);
      setError(true);
    } else if (email.length === 0) {
      setIsEmailEmpty(true);
      setError(true);
    } else if (password.length === 0) {
      setIsPasswordEmpty(true);
      setError(true);
    } else if (confirmPassword.length === 0) {
      setIsConfirmPasswordEmpty(true);
      setError(true);
    } else {
      setSuccessAlert(false);
      setIsConfirmPasswordEmpty(true);
      setError(true);
    }
  };
  async function insertData(insertRecord) {
    let response;
    try {
      response = await Api.addUserData(insertRecord);
      const json = await response.json();
      if (json.token) {
        setData(json);
        setSuccessAlert(true);
      } else if (json.non_field_errors) {
        setMessage(json.non_field_errors);
      } else {
        setMessage(json.username);
      }
      //setMessage(json);
    } catch (e) {
      setError(response || "Unexpected error");
    }
    setLoading(false);
  }
  return (
    <div className="loginBox">
      <h1>Register</h1>
      {successAlert && (
        <Alert className="mb-3" severity="success">
          User successfully registered.
        </Alert>
      )}
      {message ? (
        <Alert className="mb-3" severity="error">
          {message}
        </Alert>
      ) : null}
      <form className="mb-3" onSubmit={registerUser}>
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
            error={isEmailEmpty}
            value={email}
            className="inputBox"
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            onChange={emailChange}
            helperText={isEmailEmpty && "Email field can't be empty."}
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
            helperText={
              isPasswordEmpty && "Password must be at least 6 charaters."
            }
          />
        </Box>
        <Box className="mb-3" component="div">
          <TextField
            error={isConfirmPasswordEmpty}
            value={confirmPassword}
            className="inputBox"
            id="confirmpassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            onChange={confirmPasswordChange}
            helperText={
              isConfirmPasswordEmpty &&
              "Confirm password field can't be empty and must be same as password."
            }
          />
        </Box>
        <Button variant="contained" size="large" type="submit">
          Register
        </Button>
      </form>
      <Box>
        Aleady have an account? <Link to="/login">Login</Link>
      </Box>
    </div>
  );
}
