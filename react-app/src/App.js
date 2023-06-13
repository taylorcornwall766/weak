import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route  exact path="/" >
            <LandingPage />
          </Route>

          <Route  exact path="/home" >
            
          </Route>
          <Route  exact path="/leaderboards" >

          </Route>

          <Route  exact path="/exercises" >
            <HomePage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
