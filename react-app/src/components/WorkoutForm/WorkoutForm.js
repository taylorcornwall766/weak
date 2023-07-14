import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import { getAllWorkoutsThunk, postWorkoutThunk } from "../../store/workouts";
import WorkoutExerciseForm from "./WorkoutExerciseForm";

function WorkoutForm() {
  const dispatch = useDispatch();
  const { workoutId } = useParams();
  const user = useSelector((state) => state.session.user);
  const exercisesObj = useSelector((state) => state.exercise);
  const routines = useSelector((state) => state.routines);
  const workout = useSelector((state) => state.workout[workoutId]);

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
        <WorkoutExerciseForm exercises={exercisesObj} />
      <div className="button-container">
        <button className="delete">CANCEL WORKOUT</button>
        <button className="edit">COMPLETE</button>
      </div>
    </div>
  );
}

export default WorkoutForm;
