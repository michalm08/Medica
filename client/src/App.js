import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
