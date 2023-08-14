import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../../store/workouts";
import { getAllExercisesThunk } from "../../../store/exercises";
import "../WorkoutExercise.css";
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
  const [groupedSetState, setGroupedSetState] = useState([]);

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
  useEffect(() => {
    dispatch(getAllWorkoutsThunk());
    dispatch(getAllExercisesThunk());
  }, []);
  console.log("workout: ", workout);
  return (
    <>
      {groupedSetState.map((setGroup, groupIndex) => (
        <div key={groupIndex} className="grouped-set">
          <h3>{exercises[setGroup[0].exerciseId].name}</h3>
          {setGroup.map((set, setIndex) => (
            <>
              <form className="edit-routine-form editableCard" disabled>
                <p className="set-number">{setIndex+1}</p>
                <label className="circleInputLabel">
                  Weight
                  <input
                    className="circleField circleField-inactive newForm"
                    type="number"
                    value={set.weight}
                    disabled={true}
                  />
                </label>
                <label className="circleInputLabel">
                  Reps
                  <input
                    className="circleField circleField-inactive newForm"
                    type="number"
                    value={set.reps}
                    disabled={true}
                  />
                </label>
              </form>
            </>
          ))}
        </div>
      ))}
    </>
  );
}

export default NewWorkoutForm;
