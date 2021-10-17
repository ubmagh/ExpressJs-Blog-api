import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Box, Container, useColorModeValue } from "@chakra-ui/react"
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Page404 from './Pages/Errors/Error404';
import AuthenticationService from "./Services/authenticationService";
import HeaderNav from './Components/HeaderNav/HeaderNav';


function App() {
  
  let authService = new AuthenticationService(null);

  // <Route path="/Classes/:classID" component={Classe} />
  
  return (
    <Box mt="0" w="100%" minH="100vh" bg={ useColorModeValue("gray.100", "gray.800")} display="flex" flexDirection="column">
      <Router>
          <HeaderNav authService={ authService } />
          <Container maxW="container.xl" bg={ useColorModeValue("white", "gray.700")} minH="calc( 100vh - 60px )">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route component={Page404} />
            </Switch>
            </Container>
      </Router>
    </Box>
  );
}

export default App;
