import React from "react";

import { useAuth } from "../context/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated() ? (
          <Redirect to="/signIn" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
