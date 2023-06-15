import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllExercisesThunk } from "../../store/exercises";
import ExerciseTile from "./ExerciseTile";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
function ExercisePage() {
  const dispatch = useDispatch();
  // const history = useHistory()
  const exercises = useSelector((state) => state.exercise);
  console.log(exercises)
  const [details, setDetails] = useState(false);
  useEffect(() => {
    dispatch(getAllExercisesThunk());
  }, [dispatch]);
  const handleClick = (exercise) => {
    setDetails(exercise);
  };
  const muscleGroups = {
    "calves":[],
    "quad":[],
    "hamstring":[],
    "shoulder":[],
    "bicep":[],
    "tricep":[],
    "back":[],
    "forearm":[],
    "chest":[],
    "core":[]
  }
  const exArr = Object.values(exercises)
  exArr.forEach((exercise)=> {
    Switch
  })
  console.log(muscleGroups)
  return (
    <>
      <h1>exercises</h1>
      <div className="details-div">
        <h2>{details.name}</h2>

      </div>

          {exArr.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
         )}
          {exArr.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
         )}
          {exArr.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
         )}
          {exArr.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
         )}

    </>
  );
}
export default ExercisePage;
