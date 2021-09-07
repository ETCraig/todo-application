import React, { Suspense, lazy } from "react";
import "./App.css";

import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import Spinner from "./components/Spinner";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/authContext";

const AuthView = lazy(() => import("./views/AuthView"));
const MainView = lazy(() => import("./views/MainView"));

function App() {
  const auth = useAuth();
  return (
    <>
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <PrivateRoute exact path="/" component={MainView} />
          <Route
            exact
            path="/signIn"
            render={() =>
              auth.isAuthenticated() ? <Redirect to="/" /> : <AuthView />
            }
          />
        </Suspense>
      </Switch>
    </>
  );
}

export default App;
