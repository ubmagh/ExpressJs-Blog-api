import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from './Pages/Home/Home';
import Page404 from './Pages/Errors/Error404';
import AuthenticationService from "./Services/authenticationService";
import HeaderNav from './Components/HeaderNav/HeaderNav';


function App() {
  
  let authService = new AuthenticationService(null);

  // <Route path="/Classes/:classID" component={Classe} />
  
  return (
    <Router>
      <div className="mt-0">
        <HeaderNav />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
