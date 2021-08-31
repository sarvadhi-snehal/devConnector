import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import Profiles from "./components/Profiles/Profiles"
import Profile from "./components/Profile/Profile"
import EditProfile from "./components/profile-forms/EditProfile";
import AddEducation from "./components/profile-forms/AddEducation";
import PrivateRoutes from "./components/Routing/PrivateRoutes";
// /redux
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
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoutes 
                exact 
                path="/dashboard" 
                component={Dashboard}
              />
              <PrivateRoutes
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoutes
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoutes
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoutes
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
