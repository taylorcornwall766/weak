import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../../store/workouts";

function NewWorkoutForm() {
  const dispatch = useDispatch();
  const history = useHistory()
    // 47
    // current workout, hardcoded swap to useparams()
  const workout = useSelector(
    (state) =>
      state.workout.current[
        state.workout.current.findIndex((workout) => workout.id == '47')
      ]
  );
  if(workout){
        if(workout.workoutExercises.length > 0){
          let groupedSets = []
          let currentExercises = []
          let prevExerciseId = -1
          // if they have exercises, loop over the exercises
          for(let i=0; i < workout.workoutExercises.length; i++){
            // at each exercise, check if its exercise id matches the one before it, if it does, add it to an array, if it doesnt push that array to an array and then make the array empty again and push this into that and update the current exercise variable
            let currSet = workout.workoutExercises[i]
            if(currSet.exerciseId === prevExerciseId){
              currentExercises.push(currSet)
            }else{
              if(currentExercises.length > 1){
                groupedSets.push(currentExercises)
                currentExercises = []
              }
              prevExerciseId = currSet.exerciseId
              currentExercises.push(currSet)
            }
        }
        groupedSets.push(currentExercises)
        console.log("grouped sets: ", groupedSets)
        }
  }
//   dispatch(getAllWorkoutsThunk())
      useEffect(() => {
        dispatch(getAllWorkoutsThunk())
      }, [])
  console.log("workout: ", workout)
  return (
    <>
    <h1>Test</h1>

    {workout && workout.workoutExercises.length && workout.workoutExercises.map((set) => {
        return(
            <>
                <div className="box">
                    <p>{set.exerciseId}</p>
                    <p>{set.weight}</p>
                    <p>{set.reps}</p>
                </div>
            </>
        )
    }) }
    </>
  );
}

export default NewWorkoutForm;
