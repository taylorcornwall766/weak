import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllRoutinesThunk } from "../../store/routines";
import RoutinesIndex from "../Routines/RoutinesIndex";
import { getAllExercisesThunk } from "../../store/exercises";
import { postWorkoutThunk, getAllWorkoutsThunk } from "../../store/workouts";
import "./HomePage.css";
import WorkoutsIndex from "../WorkoutIndex/WorkoutsIndex";
import {dateConverter} from "../WorkoutIndex/WorkoutsIndex"
function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeWorkout, setActiveWorkout] = useState(false)
  // const demoLogin = async() =>{
  //     await dispatch(sessionActions.login("demo@aa.io", "password"))
  //     return history.push("/home")
  // }
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    // console.log("000000000001-1--1-1-1")
    dispatch(getAllRoutinesThunk());
    dispatch(getAllExercisesThunk());
    dispatch(getAllWorkoutsThunk());
    // [dispatch]
  }, [dispatch]);
  const startWorkout = async (e) => {
    e.preventDefault();
    const data = await dispatch(postWorkoutThunk());
    // console.log("data in startworkout: ", data)
    if (data.workout) {
      history.push(`/workouts/${data.workout.id}/edit`);
    } else {
        console.log(data)
    //   return alert(JSON.stringify(data.activeWorkout, null, 2));
        setActiveWorkout(data.activeWorkout)
        return
    }
  };
  if (!user) {
    history.push("/");
  }
  return (
    <div className="homepage">
      <button className="workout-button" onClick={(e) => startWorkout(e)}>
        START WORKOUT
      </button>
      <WorkoutsIndex />
      <RoutinesIndex />
      {activeWorkout && (
        <>
            <div className="modal-background" onClick={(e)=>setActiveWorkout(false)}>
                <div className="modal-box" onClick={(e)=>e.stopPropagation()}>
                    <div className="w-box">
                        <h2 className="w-header">You're already working out!</h2>
                        <p className="w-text sets-text date-text">Started - {dateConverter(activeWorkout.startedAt)}</p>
                        <p className="w-text sets-text">{activeWorkout.workoutExercises.length} Sets</p>
                        <p className="w-whisper sets-text w-text">(you may only have one workout active at a time)</p>
                    </div>
                    <div className="w-button-box">
                        <button className="w-button delete" onClick={(e)=>setActiveWorkout(false)}>cancel</button>
                        <button className="w-button edit" onClick={(e)=>history.push(`/workouts/${activeWorkout.id}/edit`)}>edit workout</button>
                    </div>
                </div>
            </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
