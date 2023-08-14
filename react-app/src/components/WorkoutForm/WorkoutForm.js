import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import {
  completeWorkoutThunk,
  getAllWorkoutsThunk,
  postWorkoutThunk,
} from "../../store/workouts";
import WorkoutExerciseForm from "./WorkoutExerciseForm";
import WorkoutExerciseCard from "./WorkoutCards";
import { dateConverter } from "../WorkoutIndex/WorkoutsIndex";
function WorkoutForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { workoutId } = useParams();
  const user = useSelector((state) => state.session.user);
  const exercisesObj = useSelector((state) => state.exercise);
  const routines = useSelector((state) => state.routines);
  const workout = useSelector(
    (state) =>
      state.workout.current[
        state.workout.current.findIndex((workout) => workout.id == workoutId)
      ]
  );
  const [workoutExercises, setWorkoutExercises] = useState([]);
  useEffect(() => {
    // get all the exercises THEN update my exercisesArr
    dispatch(getAllExercisesThunk());
    dispatch(getAllWorkoutsThunk());
    // console.log(exercisesObj);
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

  const completeWorkout = async () => {
    const data = await dispatch(completeWorkoutThunk(workout));
    // console.log(data)
    if (data) {
      history.push("/home");
    }
  };
  console.log("workout: ", workout);
  return (
    <div className="edit-routine-container">
      <WorkoutExerciseForm
        exercises={exercisesObj}
        workoutExercises={workoutExercises}
        setWorkoutExercises={setWorkoutExercises}
        workoutId={workoutId}
      />
      <div>
        {workout &&
          [...workout.workoutExercises]
            .reverse()
            .map((exercise) => (
              <WorkoutExerciseCard
                exercises={exercisesObj}
                preload={exercise}
                key={exercise.id}
                setWorkoutExercises={setWorkoutExercises}
                workoutExercises={workoutExercises}
              />
            ))}
        {/* {workoutExercises && workoutExercises.map((exercise) => (
          <WorkoutExerciseCard exercises={exercisesObj} preload={exercise} key={exercise.id}/>
        ))} */}
      </div>

      <div className="button-container">
        <button onClick={() => history.push("/home")} className="delete">
          EXIT WORKOUT
        </button>
        {workout && workout.endedAt ? (
          <button className="disabled-button" disabled="true">
            COMPLETED AT {dateConverter(workout.endedAt)}
          </button>
        ) : (
          <button className="edit" onClick={completeWorkout}>
            COMPLETE
          </button>
        )}
      </div>
    </div>
  );
}

export default WorkoutForm;

// {workout?.workoutExercises.map((exercise) => (
//   <WorkoutExerciseCard exercises={exercisesObj} preload={exercise} key={exercise.id}/>
// ))}
