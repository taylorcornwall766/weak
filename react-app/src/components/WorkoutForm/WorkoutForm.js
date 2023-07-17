import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import { getAllWorkoutsThunk, postWorkoutThunk } from "../../store/workouts";
import WorkoutExerciseForm from "./WorkoutExerciseForm";
import WorkoutExerciseCard from "./WorkoutCards";

function WorkoutForm() {
  const dispatch = useDispatch();
  const { workoutId } = useParams();
  const user = useSelector((state) => state.session.user);
  const exercisesObj = useSelector((state) => state.exercise);
  const routines = useSelector((state) => state.routines);
  const workouts = useSelector((state) => state.workout.current);
  const [workoutExercises, setWorkoutExercises] = useState([])
  console.log("workout: ",workouts)
  if(workouts){
    console.log("workouts: ",workouts)
    let workout = {}
    const workoutIndex = workouts.findIndex((workout)=> workout.id == workoutId)
    console.log("workoutIndex: ",workoutIndex)
    workout = workouts[workoutIndex]
    setWorkoutExercises(workout.workoutExercises)
  }
  useEffect(() => {
    // get all the exercises THEN update my exercisesArr
    dispatch(getAllExercisesThunk());
    dispatch(getAllWorkoutsThunk());
    console.log(exercisesObj);
  }, [dispatch]);
  const timeConverter = (time) => {
    // takes in a time "HH:MM" in military time and converts to
    // "HH:MM a.m./p.m."
    let timeArr = time.split(":");
    let isPm = false;
    if (+timeArr[0] > 12) {
      timeArr[0] = +timeArr[0] - 12;
      isPm = true;
    }
    if (+timeArr[0] === 12) {
      isPm = true;
    }
    return `${timeArr.join(":")} ${isPm ? "p.m." : "a.m."} `;
  };
  return (
    <div className="edit-routine-container">
        <WorkoutExerciseForm exercises={exercisesObj} workoutExercises={workoutExercises} setWorkoutExercises={setWorkoutExercises} workoutId={workoutId}/>
      <div className="button-container">
        <button className="delete">CANCEL WORKOUT</button>
        <button className="edit">COMPLETE</button>
      </div>
      <div>
        {workoutExercises.map((exercise) => {
        <WorkoutExerciseCard exercises={exercisesObj}/>
        })}
      </div>
    </div>
  );
}

export default WorkoutForm;
