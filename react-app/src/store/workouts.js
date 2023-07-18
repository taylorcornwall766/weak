const GET_ALL_WORKOUTS = "workouts/getAllWorkouts";
const POST_WORKOUT = "workouts/postWorkout";
const POST_WORKOUT_EXERCISE = "workouts/postWorkoutExercise";
const DELETE_WORKOUT_EXERCISE = "workouts/deleteWorkoutExercise"
const COMPLETE_WORKOUT = "workouts/completeWorkout"

const completeWorkout = (workout) => {
  return {
    type: COMPLETE_WORKOUT,
    payload: workout
  }
}

const getAllWorkouts = (workouts) => {
  return {
    type: GET_ALL_WORKOUTS,
    payload: workouts,
  };
};

const postWorkout = (workout) => {
  return {
    type: POST_WORKOUT,
    payload: workout,
  };
};

const postWorkoutExercise = (workoutExercise) => {
  return {
    type: POST_WORKOUT_EXERCISE,
    payload: workoutExercise,
  };
};

const deleteWorkoutExercise = (workoutExercise) => {
    return {
        type: DELETE_WORKOUT_EXERCISE,
        payload: workoutExercise
    }
}

export const getAllWorkoutsThunk = () => async (dispatch) => {
  const workoutResponse = await fetch(`/api/workouts/current`);
  const data = await workoutResponse.json();
  console.log("data in thunk:", data)
  if (workoutResponse.ok) {
    dispatch(getAllWorkouts(data.workouts));
  }
};

export const postWorkoutThunk = () => async (dispatch) => {
  const response = await fetch(`/api/workouts/new`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(postWorkout(data));
    return data;
  }
  return null;
};

export const postWorkoutExerciseThunk =
  (workoutExercise, workoutId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workoutId}/exercises/new`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutExercise),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(postWorkoutExercise(data.workoutExercise));
    //   console.log("data in thunk: ",data)
      return data;
    }
    return null;
  };

export const deleteWorkoutExerciseThunk = (workoutExercise) => async (dispatch) =>{
    const response = await fetch(`/api/workouts/${workoutExercise.workoutId}/exercises/${workoutExercise.id}/delete`, {
        method: "delete",
        headers: {"Content-Type": "application/json"}
    })
    const data = await response.json()
    if(response.ok){
        dispatch(deleteWorkoutExercise(workoutExercise))
        return data
    }
    return null

}

export const completeWorkoutThunk = (workout) => async(dispatch) => {
  const response = await fetch(`/api/workouts/${workout.id}/complete`,{
    method:"put",
    headers: {"Content-Type":"application/json"}
  })
  const data = await response.json()
  if(response.ok){
    dispatch(completeWorkout(data.workout))
    return data
  }
  return null
}

const initialState = {"current": [], "others":[]};
const workoutReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_WORKOUTS: {
      newState = { "current":[...action.payload] };
      return newState;
    }
    case POST_WORKOUT: {
      newState = { ...state };
      newState.current.push(action.payload);
      return newState;
    }
    case POST_WORKOUT_EXERCISE: {
      newState = { ...state };
      console.log("action in thunk: ", action);
      console.log("new state in thunk: ", newState)
        const workoutIndex = newState.current.findIndex((workout)=> workout.id == action.payload.workoutId)
      console.log("workoutIndex: ", workoutIndex)
      newState.current[workoutIndex].workoutExercises.push(action.payload)
    //   newState
    // deprecated and requires object state of workout
    //   newState[action.payload.workoutId].workoutExercises.push(action.payload);
      return newState;
    }
    case DELETE_WORKOUT_EXERCISE: {
        newState = {...state}
        const currentWorkout = newState.current[newState.current.findIndex((workout)=> workout.id == action.payload.workoutId)]
        currentWorkout.workoutExercises = currentWorkout.workoutExercises.filter((workoutExercise)=> workoutExercise.id !== action.payload.id)
        return newState
    }
    case COMPLETE_WORKOUT: {
      newState = {...state}
      newState.current[newState.current.findIndex((workout)=> workout.id == action.payload.workoutId)] = action.payload
      return newState
    }
    default:
      return state;
  }
};

export default workoutReducer;
