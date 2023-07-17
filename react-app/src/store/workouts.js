const GET_ALL_WORKOUTS = "workouts/getAllWorkouts";
const POST_WORKOUT = "workouts/postWorkout";
const POST_WORKOUT_EXERCISE = "workouts/postWorkoutExercise";

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
      newState.current.push = action.payload;
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
    default:
      return state;
  }
};

export default workoutReducer;
