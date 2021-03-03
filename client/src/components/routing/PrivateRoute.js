import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
    auth, //auth to jest pobrane z reduxa
  component: Component, //component to pobieram bo wywoluje go w app
  ...rest //reszta rzeczy co jest w wywolaniu doslownie to jest: exact path="/dashboard"
}) => {
  return (
//render props
//https://pl.reactjs.org/docs/render-props.html
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated && !auth.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
