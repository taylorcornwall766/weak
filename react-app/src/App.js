import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import ExercisePage from "./components/Exercises/Exercises";
import RoutineForm from "./components/Routines/RoutineForm";
import EditRoutineForm from "./components/Routines/EditRoutineForm";
import WorkoutForm from "./components/WorkoutForm/WorkoutForm";
import NewWorkoutForm from "./components/WorkoutForm/WorkoutFormNew/NewForm";
import Footer from "./components/Footer/Footer";
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
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/leaderboards"></Route>

          <Route exact path="/exercises">
            <ExercisePage />
          </Route>

          <Route exact path="/routines/new">
            <RoutineForm />
          </Route>

          <Route exact path="/workouts/:workoutId/edit">
            <WorkoutForm />
          </Route>

          <Route exact path="/routines/:routineId/edit">
            <EditRoutineForm />
          </Route>

          <Route exact path="/workouts/newForm">
            <NewWorkoutForm />
          </Route>

        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
