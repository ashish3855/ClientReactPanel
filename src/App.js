import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./components/layout/DashBoard";
import AppNavBar from "./components/layout/AppNavBar";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/clientDetails";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/client/add" component={AddClient} />
            <Route exact path="/client/login" component={Login} />
            <Route exact path="/client/register" component={Register} />
            <Route exact path="/client/:id" component={ClientDetails} />
            <Route exact path="/client/edit/:id" component={EditClient} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
