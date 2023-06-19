const GET_ALL_ROUTINES = "routines/getAllRoutines"
const POST_ROUTINE = "routines/postRoutine"
const DELETE_ROUTINE = "routines/deleteRoutine"

const getAllRoutines = (routines) => {
    return {
        type: GET_ALL_ROUTINES,
        payload: routines,
    }
}

const getAllRoutinesThunk = () => async (dispatch) => {
    const routineResponse = await fetch(`/api/routines`)
    const data = await routineResponse.json();

    if (routineResponse.ok) {
        const normalRoutines = {};
        data.routines.forEach((routine) => {
            normalRoutines[routine.id] = routine;
        });
        dispatch(getAllRoutines(normalRoutines))
        return normalRoutines
    }
    return null
}

const initialState = {};
const routineReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_ROUTINES:{
            newState = { ...action.payload };
            return newState
        }
        default:
            return state;
    }
}
