import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../../store/workouts";
import { getAllExercisesThunk } from "../../../store/exercises";
import 
function NewWorkoutForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  // 47
  // current workout, hardcoded swap to useparams()
  const exercises = useSelector((state) => state.exercise);
  const workout = useSelector(
    (state) =>
      state.workout.current[
        state.workout.current.findIndex((workout) => workout.id == "47")
      ]
  );
  const [groupedSetState, setGroupedSetState] = useState([])

  useEffect(() => {
    if (workout && workout.workoutExercises.length > 0) {
      let groupedSets = [];
      let currentExercises = [];
      let prevExerciseId = -1;

      for (let i = 0; i < workout.workoutExercises.length; i++) {
        let currSet = workout.workoutExercises[i];
        if (currSet.exerciseId === prevExerciseId) {
          currentExercises.push(currSet);
        } else {
          if (currentExercises.length > 1) {
            groupedSets.push(currentExercises);
          }
          prevExerciseId = currSet.exerciseId;
          currentExercises = [currSet];
        }
      }
      if (currentExercises.length > 0) {
        groupedSets.push(currentExercises);
      }
      console.log("grouped sets: ", groupedSets);
      setGroupedSetState(groupedSets);
    }
  }, [workout]);
  // if (workout) {
  //   if (workout.workoutExercises.length > 0) {
  //     let groupedSets = [];
  //     let currentExercises = [];
  //     let prevExerciseId = -1;
  //     // if they have exercises, loop over the exercises
  //     for (let i = 0; i < workout.workoutExercises.length; i++) {
  //       // at each exercise, check if its exercise id matches the one before it, if it does, add it to an array, if it doesnt push that array to an array and then make the array empty again and push this into that and update the current exercise variable
  //       let currSet = workout.workoutExercises[i];
  //       if (currSet.exerciseId === prevExerciseId) {
  //         currentExercises.push(currSet);
  //       } else {
  //         if (currentExercises.length > 1) {
  //           groupedSets.push(currentExercises);
  //           currentExercises = [];
  //         }
  //         prevExerciseId = currSet.exerciseId;
  //         currentExercises.push(currSet);
  //       }
  //     }
  //     groupedSets.push(currentExercises);
  //     console.log("grouped sets: ", groupedSets);
  //     if(groupedSetState !== groupedSets){
  //       setGroupedSetState(groupedSets)
  //     }
  //   }
  // }
  //   dispatch(getAllWorkoutsThunk())
  useEffect(() => {
    dispatch(getAllWorkoutsThunk());
    dispatch(getAllExercisesThunk());
  }, []);
  console.log("workout: ", workout);
  return (
    <>
      <h1>Test</h1>
      {groupedSetState.map((setGroup, groupIndex) => (
      <div key={groupIndex} className="grouped-set">
        <p>{exercises[setGroup[0].exerciseId].name}</p>
      {setGroup.map((set, setIndex) => (
      <div key={setIndex} className="box">
        <p>{set.weight}</p>
        <p>{set.reps}</p>
      </div>
    ))}
  </div>
))}
    </>
  );
}

export default NewWorkoutForm;
