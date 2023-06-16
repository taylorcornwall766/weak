const GET_ALL_EXERCISES = "exercises/getAllExercises";
const POST_EXERCISE = "exercises/postExercise";
const DELETE_EXERCISE = "exercise/deleteExercise";

const deleteExercise = (exerciseId) => {
  return {
    type: DELETE_EXERCISE,
    payload: exerciseId,
  };
};

export const deleteExerciseThunk = (exerciseId) => async (dispatch) => {
  const deleteExerciseResponse = await fetch(
    `/api/exercise/${exerciseId}/delete`,
    {
      method: "DELETE",
    }
  );
  const deleteExerciseData = await deleteExerciseResponse.json();
  if (deleteExerciseResponse.ok) {
    dispatch(deleteExercise(exerciseId));
    return `successfully deleted exercise ${exerciseId}`;
  }
  return deleteExerciseData;
};

const postExercise = (exercise) => {
  return {
    type: POST_EXERCISE,
    payload: exercise,
  };
};

export const postExerciseThunk = (exercise) => async (dispatch) => {
  console.log("exercise in thunk :", exercise);
  const newExerciseResponse = await fetch(`/api/exercise/new`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exercise),
  });
  const newExerciseData = await newExerciseResponse.json();
  if (newExerciseResponse.ok) {
    dispatch(postExercise(newExerciseData));
    return newExerciseData;
  }
  console.log(newExerciseData);
  return null;
};

const getAllExercises = (exercises) => {
  return {
    type: GET_ALL_EXERCISES,
    payload: exercises,
  };
};
export const getAllExercisesThunk = () => async (dispatch) => {
  const exerciseResponse = await fetch(`/api/exercise`);
  const data = await exerciseResponse.json();
  // console.log('this is data: ', data)
  if (exerciseResponse.ok) {
    const normalExercises = {};
    data.exercises.forEach((exercise) => {
      normalExercises[exercise.id] = exercise;
    });
    dispatch(getAllExercises(normalExercises));
    return normalExercises;
  }
  return null;
};

const initialState = {};
const exerciseReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_EXERCISES: {
      newState = { ...action.payload };
      return newState;
    }
    case POST_EXERCISE: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_EXERCISE: {
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};
export default exerciseReducer;
