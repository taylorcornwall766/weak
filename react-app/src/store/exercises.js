const GET_ALL_EXERCISES = "exercises/getAllExercises"


const getAllExercises = (exercises) => {
    return {
        type: GET_ALL_EXERCISES,
        payload: exercises
    }
}
export const getAllExercisesThunk = () => async(dispatch) =>{
    const exerciseResponse = await fetch(`/api/exercise`)
    const data = await exerciseResponse.json()
    // console.log('this is data: ', data)
    if(exerciseResponse.ok){
        const normalExercises = {}
        data.exercises.forEach((exercise)=>{
            normalExercises[exercise.id] = exercise
        })
        dispatch(getAllExercises(normalExercises))
        return normalExercises
    }
    return null
}

const initialState = {}
const exerciseReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALL_EXERCISES:{
            newState = {...action.payload}
            return newState
        }
        default:
            return state
    }
}
export default exerciseReducer
