import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory, useParams} from "react-router-dom"
import { getAllExercisesThunk } from "../../../store/exercises"
import { getAllRoutinesThunk } from "../../../store/routines"
import renderRoutine from "./RoutineHelperFunctions"
const ManageRoutines = () => {
    const dispatch = useDispatch()
    const {routineId} = useParams()

    const routinesObj = useSelector((state)=> state.routine)
    const exercisesObj = useSelector((state) => state.exercise)
    const routine = routinesObj[routineId]
    // handle refresh
    useEffect(()=> {
        dispatch(getAllExercisesThunk())
        dispatch(getAllRoutinesThunk())

    }, [])
    // const renderRoutine = () => {
    //     console.log("routine: ", routine)
    //     return routine?(
    //         <>
    //             <h2>{routine.name}</h2>
    //             <p>{routine.description}</p>
    //             <div className="musclegroups-container">
    //                 <p>{routine.muscle_group_one}</p>
    //                 <p>{routine.muscle_group_two}</p>
    //                 <p>{routine.muscle_group_three}</p>
    //                 <p>{routine.muscle_group_four}</p>
    //                 <p>{routine.muscle_group_five}</p>
    //             </div>
    //         </>
    //     ):(<h2>...Loading</h2>)
    // }
    const renderRoutineExercises = (routine, exercises) => {
        // console.log("exercises: ", exercises)
        let show = false
        return routine?(
            <>
                {Object.values(routine.routine_exercises).map(({exerciseId, sets, id})=>(
                    <div className="exercises-container">
                        <h2>{exercises[exerciseId].name}</h2>
                        <h4>{sets} sets</h4>
                    </div>
                ))}
            </>
        ): null
    }
    return(
        <>
        <h1>Manage Routine</h1>
        { renderRoutine(routine) }
        { renderRoutineExercises(routine, exercisesObj) }
        </>
    )
}
export default ManageRoutines
