import {useHistory, NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllRoutinesThunk } from "../../store/routines"
import RoutinesIndex from "../Routines/RoutinesIndex"
import { getAllExercisesThunk } from "../../store/exercises"
import { postWorkoutThunk, getAllWorkoutsThunk } from "../../store/workouts"
import "./HomePage.css"
import WorkoutsIndex from '../WorkoutIndex/WorkoutsIndex'
function HomePage(){
    const dispatch = useDispatch()
    const history = useHistory()
    // const demoLogin = async() =>{
    //     await dispatch(sessionActions.login("demo@aa.io", "password"))
    //     return history.push("/home")
    // }
    const user = useSelector((state) => state.session.user)
    useEffect(() => {
        // console.log("000000000001-1--1-1-1")
        dispatch(getAllRoutinesThunk())
        dispatch(getAllExercisesThunk())
        dispatch(getAllWorkoutsThunk())
        // [dispatch]
    }, [dispatch])
    const startWorkout = async(e) => {
        e.preventDefault()
        const data = await dispatch(postWorkoutThunk())
        // console.log("data in startworkout: ", data)
        if(data){
            history.push(`/workouts/${data.id}/edit`)
        }else{
            return alert("Something went wrong! refresh and try again")
        }

    }
    if(!user){
        history.push("/")
    }
    return (
        <div className="homepage">
                <button className="workout-button"onClick={(e)=> startWorkout(e)}>START WORKOUT</button>
            <WorkoutsIndex />
            <RoutinesIndex />
        </div>
    )
}

export default HomePage
