import React, {Component} from "react";
import { Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
import LeftMenu from "./LeftMenu/LeftMenu";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const LoggedInLayout = ({ children, ...rest }) => {
  let history = useHistory();
  useEffect(() => {
    let login = localStorage.getItem("Username");
    if (!login) {
      history.push({
        pathname: "/login",
      });
    }
  });
  return (
    <>
      <Header />
      <div className="container">
        <LeftMenu />
        <div className="rightContent">{children}</div>
      </div>
      <Footer />
    </>
  );
};

const LoggedInLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <LoggedInLayout>
          <Component {...matchProps} />
        </LoggedInLayout>
      )}
    />
  );
};

export default LoggedInLayoutRoute;
