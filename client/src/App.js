import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from './components/layout/Alert'
import Dashboard from './components/Dashboard/Dashboard'
import CreateProfile from './components/profile/CreateProfile'
 import PrivateRoutes from './components/Routing/PrivateRoutes'
// /redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'
if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() =>{
    store.dispatch(loadUser());
  },[])
  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoutes exact path="/dashboard" component={Dashboard} />
            <PrivateRoutes exact path="/create-profile" component={CreateProfile} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
  }
export default App;
