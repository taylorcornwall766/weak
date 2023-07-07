const GET_ALL_WORKOUTS = "workouts/getAllWorkouts";
const POST_WORKOUT = "workouts/postWorkout";

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

export const getAllWorkoutsThunk = () => async (dispatch) => {
    const workoutResponse = await fetch(`/api/workouts/current`)
    const data = await workoutResponse.json()

    if(workoutResponse.ok) {
        const normalWorkouts = {}
        data.workouts.forEach((workout) => {
            const normalWorkoutExercises = {}
            normalWorkouts[workout.id] = workout
            workout.workoutExercises.forEach((wExercise) => {
                normalWorkoutExercises[wExercise.id] = wExercise
            })
            normalWorkouts[workout.id].workoutExercises = normalWorkoutExercises
        })
        dispatch(getAllWorkouts(normalWorkouts))
    }
}

export const postWorkoutThunk = () => async (dispatch) => {
    const response = await fetch(`/api/workouts/new`,{
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    if(response.ok){
        data.workoutExercises = {}
        dispatch(postWorkout(data))
        return data
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
        default:
            return state;
    }
}

export default workoutReducer
