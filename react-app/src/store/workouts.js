const GET_ALL_WORKOUTS = "workouts/getAllWorkouts";
const POST_WORKOUT = "workouts/postWorkout";
const POST_WORKOUT_EXERCISE = "workouts/postWorkoutExercise";
const DELETE_WORKOUT_EXERCISE = "workouts/deleteWorkoutExercise";
const COMPLETE_WORKOUT = "workouts/completeWorkout";

const completeWorkout = (workout) => {
  return {
    type: COMPLETE_WORKOUT,
    payload: workout,
  };
};

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
    payload: workoutExercise,
  };
};

export const getAllWorkoutsThunk = () => async (dispatch) => {
  const workoutResponse = await fetch(`/api/workouts/current`);
  const data = await workoutResponse.json();
  console.log("data in thunk:", data);
  // iterate over the workouts
  // for(let i = 0; i < data.workouts; i++){
  //   // for each workout, check if they have exercises
  //   let curr = data.workouts[i]
  //   if(data.workouts.workoutExercises.length > 0){
  //     let groupedSets = []
  //     let currentExercises = []
  //     let prevExerciseId = -1
  //     // if they have exercises, loop over the exercises
  //     for(let i=0; i < curr.workoutExercises.length; i++){
  //       // at each exercise, check if its exercise id matches the one before it, if it does, add it to an array, if it doesnt push that array to an array and then make the array empty again and push this into that and update the current exercise variable
  //       let currSet = curr.workoutExercises[i]
  //       if(currSet.exerciseId === prevExerciseId){
  //         currentExercises.push(currSet)
  //       }else{
  //         if(currentExercises.length > 1){
  //           groupedSets.push(currentExercises)
  //         }
  //       }
  //     }
  //   }
  // }
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
  if (data.workout) {
    dispatch(postWorkout(data.workout));
  }
  // console.log("data in thunk: ", data);
  return data;
};

export const postWorkoutExerciseThunk =
  (workoutExercise, workoutId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workoutId}/exercises/new`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutExercise),
    });
    const data = await response.json();
    // console.log("data in thunk:", data)
    if (response.ok) {
      dispatch(postWorkoutExercise(data));
      //   console.log("data in thunk: ",data)
      return data;
    }
    return null;
  };

export const deleteWorkoutExerciseThunk =
  (workoutExercise) => async (dispatch) => {
    const response = await fetch(
      `/api/workouts/${workoutExercise.workoutId}/exercises/${workoutExercise.id}/delete`,
      {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(deleteWorkoutExercise(workoutExercise));
      return data;
    }
    return null;
  };

export const completeWorkoutThunk = (workout) => async (dispatch) => {
  const response = await fetch(`/api/workouts/${workout.id}/complete`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(completeWorkout(data.workout));
    return data;
  }
  return null;
};

const initialState = { current: [], others: [] };
const workoutReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_WORKOUTS: {
      newState = { current: [...action.payload] };
      return newState;
    }
    case POST_WORKOUT: {
      newState = { ...state };
      newState.current.push(action.payload);
      return newState;
    }
    case POST_WORKOUT_EXERCISE: {
      // newState = { ...state };
      // console.log("action in thunk: ", action);
      // console.log("new state in thunk: ", newState);

      // const workoutIndex = newState.current.findIndex(
      //   (workout) => workout.id == action.payload.workoutId
      // );
      // console.log("workoutIndex: ", workoutIndex);
      // if (workoutIndex > -1) {
      //   newState.current[workoutIndex].workoutExercises.push(
      //     action.payload.workoutExercise
      //   );
      // } else {
      //   newState.current.push(action.payload.workout);
      // }
      // return newState;
      newState = { ...state };
      // console.log("action in thunk: ", action);
      // console.log("new state in thunk: ", newState)
      const workoutIndex = newState.current.findIndex(
        (workout) => workout.id == action.payload.workout.id
      );
      // console.log("workoutIndex: ", workoutIndex)
      newState.current[workoutIndex].workoutExercises.push(
        action.payload.workoutExercise
      );

      return newState;
    }
    case DELETE_WORKOUT_EXERCISE: {
      newState = { ...state };
      const currentWorkout =
        newState.current[
          newState.current.findIndex(
            (workout) => workout.id == action.payload.workoutId
          )
        ];
      currentWorkout.workoutExercises = currentWorkout.workoutExercises.filter(
        (workoutExercise) => workoutExercise.id !== action.payload.id
      );
      return newState;
    }
    case COMPLETE_WORKOUT: {
      newState = { ...state };
      newState.current[
        newState.current.findIndex(
          (workout) => workout.id == action.payload.workoutId
        )
      ] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default workoutReducer;
