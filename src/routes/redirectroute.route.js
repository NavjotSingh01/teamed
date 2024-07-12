import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RefreshRoute = ({ component: Component, primaryProfile, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      primaryProfile ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/patient-select",
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  primaryProfile: state.authenticateUser.primaryProfile,
});

export default connect(mapStateToProps)(RefreshRoute);
