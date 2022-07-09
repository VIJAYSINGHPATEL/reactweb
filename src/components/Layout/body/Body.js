import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ListViewPage from "./DatabaseConnection/DCListView";
import AddtableData from "./DatabaseConnection/DCAdd";
import DetailedViewPage from "./DatabaseConnection/DCDetailsView";
import DMListView from "./DataModel/DMListView";
import DMDetailsView from "./DataModel/DMDetailsView";
import AddDMData from "./DataModel/AddDMData";
import DSAddData from "./DataSource/DSAddData";
import DSListView from "./DataSource/DSListView";
import DSDetailsView from "./DataSource/DSDetailsView";
import Explorer from "./Explorer/Explorer";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import NotFound from "./NotFound/NotFound";
/** Layouts **/
import LoginLayoutRoute from "./LoginLayout";
import LoggedInLayoutRoute from "./LoggedInLayout";

const Body = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <LoginLayoutRoute path="/register" component={Register} />
        <LoginLayoutRoute
          exact
          path="/login"
          component={() => <Login title="Login user" />}
        />
        <LoginLayoutRoute
          exact
          path="/forgot-password"
          component={() => <ForgotPassword title="Forgot Password" />}
        />
        <LoginLayoutRoute
          exact
          path="/reset-password/:uid/:token"
          component={() => <ResetPassword title="Reset Password" />}
        />
        <LoggedInLayoutRoute
          exact
          path="/dbConnectionListView"
          component={() => (
            <ListViewPage
              title="Database Connection List View"
              addUrl="/addTableData"
            />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/dbConnectionDetailedView"
          component={() => (
            <DetailedViewPage
              title="Database Connection Details View"
              addUrl="/dbConnectionListView"
            />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/addTableData"
          component={() => (
            <AddtableData
              title="Add Data in Database Connection"
              addUrl="/dbConnectionListView"
            />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/dmlistview"
          component={() => (
            <DMListView title="Data Model List View" addUrl="/addDMData" />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/dmdetailsview"
          component={() => (
            <DMDetailsView
              title="Data Model Details View"
              addUrl="/dmlistview"
            />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/addDMData"
          component={() => (
            <AddDMData title="Add Data Modal Data" addUrl="/addDMData" />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/DSAddData"
          component={() => (
            <DSAddData title="Data Source Add Data" addUrl="/DSAddData" />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/DSListView"
          component={() => (
            <DSListView title="Data Source List View" addUrl="/DSAddData" />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/DSDetailsView"
          component={() => (
            <DSDetailsView
              title="Data Source Details View"
              addUrl="/DSListView"
            />
          )}
        />
        <LoggedInLayoutRoute
          exact
          path="/modeldetailedview"
          component={() => <DetailedViewPage title="Data Model Details" />}
        />
        <LoggedInLayoutRoute
          exact
          path="/addtabledata"
          component={() => <AddtableData title="Add Table Data" />}
        />
        <LoggedInLayoutRoute
          exact
          path="/explorer"
          component={() => <Explorer title="Explorer" />}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Body;