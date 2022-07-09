import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useEffect } from "react";

const LoginLayout = ({ children }) => <>{children}</>;
const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  let history = useHistory();
  useEffect(() => {
    let login = localStorage.getItem("Username");
    if (login) {
      history.push({
        pathname: "/dbConnectionListView",
      });
    }
  });
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <LoginLayout>
          <Component {...matchProps} />
        </LoginLayout>
      )}
    />
  );
};

export default LoginLayoutRoute;
