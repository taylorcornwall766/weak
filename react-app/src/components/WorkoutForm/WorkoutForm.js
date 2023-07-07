import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import { getAllWorkoutsThunk, postWorkoutThunk } from "../../store/workouts";

function WorkoutForm(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllExercisesThunk())
        dispatch(getAllWorkoutsThunk())
    }, [dispatch])
    const { workoutId } = useParams()
    const user = useSelector((state) => state.session.user)
    const exercises = useSelector((state) => state.exercises)
    const routines = useSelector((state) => state.routines)
    const workout = useSelector((state)=> state.workout[workoutId])

    const timeConverter = (time) => {
        // takes in a time "HH:MM" in military time and converts to
        // "HH:MM a.m./p.m."
        let timeArr = time.split(":")
        let isPm = false
        if(+timeArr[0] > 12){
            timeArr[0] = +timeArr[0] - 12
            isPm = true
        }
        if(+timeArr[0] === 12){
            isPm = true
        }
        return `${timeArr.join(":")} ${isPm?"p.m." : "a.m."} `
    }
    return(
        <div className="edit-routine-container">

            <div className="button-container">
                <button className="delete">CANCEL WORKOUT</button>
                <button className="edit">COMPLETE</button>
            </div>
            
        </div>
    )
}

export default WorkoutForm
