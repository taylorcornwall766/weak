import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllWorkoutsThunk, postWorkoutThunk } from "../../store/workouts";

function WorkoutExerciseForm(){
    const dispatch = useDispatch()

    return(
        <form className="edit-routine-form editableCard">
                
        </form>
    )
}
