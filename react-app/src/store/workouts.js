const GET_ALL_WORKOUTS = "workouts/getAllWorkouts";
const POST_WORKOUT = "workouts/postWorkout";
const POST_WORKOUT_EXERCISE = "workouts/postWorkoutExercise"

const getAllWorkouts = (workouts) => {
    return {
        type:GET_ALL_WORKOUTS,
        payload:workouts
    }
}

const postWorkout = (workout) => {
    return {
        type:POST_WORKOUT,
        payload: workout
    }
}

const postWorkoutExercise = (workoutExercise) => {
    return {
        type: POST_WORKOUT_EXERCISE,
        payload: workoutExercise
    }
}

export const getAllWorkoutsThunk = () => async (dispatch) => {
    const workoutResponse = await fetch(`/api/workouts/current`)
    const data = await workoutResponse.json()

    if(workoutResponse.ok) {
        dispatch(getAllWorkouts(data.workouts))
    }
}

export const postWorkoutThunk = () => async (dispatch) => {
    const response = await fetch(`/api/workouts/new`,{
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    if(response.ok){
        dispatch(postWorkout(data))
        return data
    }
    return null
}

export const postWorkoutExerciseThunk = (workoutExercise, workoutId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workoutId}/new`,{
            method:"post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(workoutExercise)
    })
    const data = await response.json()
    if(response.ok){
        dispatch(postWorkoutExercise(data.workoutExercise))
        return data.workoutExercise
    }
    return null
}

const initialState = {}
const workoutReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALL_WORKOUTS:{
            newState = { ...action.payload}
            return newState
        }
        case POST_WORKOUT:{
            newState = {...state}
            newState[action.payload.id] = {...action.payload}
            return newState
        }
        case POST_WORKOUT_EXERCISE:{
            newState = {...state}
            newState[action.payload.workoutId].workoutExercises.push(action.payload)
            return newState
        }
        default:
            return state;
    }
}

export default workoutReducer
