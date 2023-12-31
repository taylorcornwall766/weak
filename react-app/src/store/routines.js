const GET_ALL_ROUTINES = "routines/getAllRoutines";
const POST_ROUTINE = "routines/postRoutine";
const DELETE_ROUTINE = "routines/deleteRoutine";
const POST_ROUTINE_EXERCISE = "routines/postRoutineExercise";
const DELETE_ROUTINE_EXERCISE = "routines/deleteRoutineExercise";

const deleteRoutineExercise = (routineId, routineExerciseId) => {
  return {
    type: DELETE_ROUTINE_EXERCISE,
    payload:{
      routineId, routineExerciseId
    }
  }
}

export const deleteRoutineExerciseThunk = (routineId, routineExerciseId) => async (dispatch) =>{
  const deleteExerciseResponse = await fetch(
    `/api/routines/${routineId}/exercise/${routineExerciseId}/delete`,
    {
      method: "DELETE",
    }
  )
  const deleteExerciseData = await deleteExerciseResponse.json();
  if(deleteExerciseResponse.ok) {
    dispatch(deleteRoutineExercise(routineId, routineExerciseId))
    return `successfully deleted routine exercise ${routineExerciseId}`
  }
  return deleteExerciseData;
}

const postRoutineExercise = (routineExercise) => {
  return {
    type: POST_ROUTINE_EXERCISE,
    payload: routineExercise,
  };
};

export const postRoutineExerciseThunk =
  (routineExercise) => async (dispatch) => {
    const routineExerciseResponse = await fetch(
      `/api/routines/${routineExercise.routine_id}/exercise/new`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routineExercise),
      }
    );
    const newRoutineExerciseData = await routineExerciseResponse.json();
    if (routineExerciseResponse.ok) {
      dispatch(postRoutineExercise(newRoutineExerciseData));
      return newRoutineExerciseData;
    }
    return null;
  };

// need to normalize routine exercises array in GET EDIT and POST
const deleteRoutine = (routineId) => {
  return {
    type: DELETE_ROUTINE,
    payload: routineId,
  };
};

export const deleteRoutineThunk = (routineId) => async (dispatch) => {
  const deleteRoutineResponse = await fetch(
    `/api/routines/${routineId}/delete`,
    {
      method: "DELETE",
    }
  );
  const deleteRoutineData = await deleteRoutineResponse.json();
  if (deleteRoutineResponse.ok) {
    dispatch(deleteRoutine(routineId));
    return `successfully deleted routine ${routineId}`;
  }
  return deleteRoutineData;
};

const postRoutine = (routine) => {
  // handling normalizing the routine_exercises information here so i dont have to do it on edit and create
  const normalExercises = {};
  routine.routine_exercises.forEach((exercise) => {
    normalExercises[exercise.id] = exercise;
  });
  routine.routine_exercises = normalExercises;
  return {
    type: POST_ROUTINE,
    payload: routine,
  };
};

export const editRoutineThunk = (routine) => async (dispatch) => {
  const editRoutineResponse = await fetch(`/api/routines/${routine.id}/edit`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(routine),
  });
  const editRoutineData = await editRoutineResponse.json();
  if (editRoutineResponse.ok) {
    dispatch(postRoutine(editRoutineData));
    return editRoutineData;
  }
  return false;
};

export const postRoutineThunk = (routine) => async (dispatch) => {
  const newRoutineResponse = await fetch(`/api/routines/new`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(routine),
  });
  const newRoutineData = await newRoutineResponse.json();
  if (newRoutineResponse.ok) {
    dispatch(postRoutine(newRoutineData));
    return newRoutineData;
  }
  // console.log(newRoutineData);
  return null;
};

const getAllRoutines = (routines) => {
  return {
    type: GET_ALL_ROUTINES,
    payload: routines,
  };
};

export const getAllRoutinesThunk = () => async (dispatch) => {
  const routineResponse = await fetch(`/api/routines`);
  const data = await routineResponse.json();

  if (routineResponse.ok) {
    const normalRoutines = {};
    data.routines.forEach((routine) => {
      const normalExercises = {};
      normalRoutines[routine.id] = routine;
      routine.routine_exercises.forEach((exercise) => {
        normalExercises[exercise.id] = exercise;
      });
      normalRoutines[routine.id].routine_exercises = normalExercises;
    });
    dispatch(getAllRoutines(normalRoutines));
    return normalRoutines;
  }
  return null;
};

const initialState = {};
const routineReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case DELETE_ROUTINE_EXERCISE:{
      newState = {...state}
      delete newState[action.payload.routineId][action.payload.routineExerciseId]
      return newState
    }
    case POST_ROUTINE_EXERCISE:{
        newState = {...state}
        newState[action.payload.routineId].id = action.payload
        return newState
    }
    case GET_ALL_ROUTINES: {
      newState = { ...action.payload };
      return newState;
    }
    case POST_ROUTINE: {
      newState = { ...state };
      newState[action.payload.id] = {...action.payload, "highlight":true};
      return newState;
    }
    case DELETE_ROUTINE: {
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};
export default routineReducer;
