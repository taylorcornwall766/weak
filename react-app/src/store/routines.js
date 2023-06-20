const GET_ALL_ROUTINES = "routines/getAllRoutines"
const POST_ROUTINE = "routines/postRoutine"
const DELETE_ROUTINE = "routines/deleteRoutine"

const deleteRoutine = (routineId) => {
    return {
        type: DELETE_ROUTINE,
        payload: routineId
    }
}

export const deleteRoutineThunk = (routineId) => async (dispatch) =>{
    const deleteRoutineResponse = await fetch(
        `/api/routines/${routineId}/delete`,{
            method: "DELETE",
        }
    )
    const deleteRoutineData = await deleteRoutineResponse.json();
    if (deleteRoutineResponse.ok){
        dispatch(deleteRoutine(routineId))
        return `successfully deleted routine ${routineId}`
    }
    return deleteRoutineData
}

const postRoutine = (routine) => {
    return {
        type: POST_ROUTINE,
        payload: routine,
    }
}

export const editRoutineThunk = (routine) => async(dispatch) =>{
    const editRoutineResponse = await fetch(`/api/routines/${routine.id}/edit`, {
        method:"put",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(exercise),
    })
    const editRoutineData = await editRoutineResponse.json();
    if (editRoutineResponse.ok) {
        dispatch(postRoutine(editRoutineData));
        return editRoutineData
    }
    return false
}

export const postRoutineThunk = (routine) => async(dispatch) =>{
    const newRoutineResponse = await fetch(`/api/routines/new`,{
        method: "post",
        headers: {" Content-Type": "application/json" },
        body: JSON.stringify(exercise),
    });
    const newRoutineData = await newRoutineResponse.json();
    if(newRoutineResponse.ok){
        dispatch(postRoutine(newRoutineData));
        return newRoutineData;
    }
    console.log(newRoutineData)
    return null
}

const getAllRoutines = (routines) => {
    return {
        type: GET_ALL_ROUTINES,
        payload: routines,
    }
}

export const getAllRoutinesThunk = () => async (dispatch) => {
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
        case POST_ROUTINE:{
            newState = {...state}
            newState[action.payload.id] = action.payload;
            return newState
        }
        case DELETE_ROUTINE:{
            newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default:
            return state;
    }
}
export default routineReducer
