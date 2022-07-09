import React from "react";
import Button from '@mui/material/Button';
import {  useHistory } from 'react-router-dom';  
import AccountCircle from '@mui/icons-material/AccountCircle';
// import { useEffect } from 'react';
//import MenuIcon from "@material-ui/icons/Menu";
//import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import './Header.css';

const Header = () =>{
  let history = useHistory();
  
  let username = (localStorage.getItem("Username"));
    //const [isOpened, setIsOpened] = useState(false);
    const logout = () => {
      localStorage.removeItem("Id");
      localStorage.removeItem("Username");
      localStorage.removeItem("Token");
      localStorage.removeItem("Password");
          history.push({
            pathname: '/login',
      })
    };
   return (<div className="header">
      {/* <div className="icon" onClick={() => setIsOpened(!isOpened)}>
        {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
      </div> */}
      <div></div>
      <div className="header-title"> OMNI Analytics Project </div>
      <div className="logout">
        <AccountCircle /> {username} <Button className="logout-btn" variant="contained" color="primary" onClick={logout}>Logout</Button>
      </div>
    </div>);
  }
export default Header;