import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import workoutReducer, { getAllWorkoutsThunk, postWorkoutThunk } from "../../store/workouts";
import "./WorkoutExercise.css"
function WorkoutExerciseForm({exercises, setShowForm, setWorkoutExercises}){
    // preload will be used to pre-populate the form
    const dispatch = useDispatch()
    const [readOnly, setReadOnly] = useState(true)
    // const readOnly = false
    const [exerciseId, setExerciseId] = useState("")
    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)
    const handleSubmit = async(e) => {
        e.preventDefault()
    }
    return(
        <form className="edit-routine-form editableCard"
        onClick={()=>{setReadOnly(false)}}
        onSubmit={(e)=>handleSubmit(e)}
        >

                    <select
                        value={exerciseId}
                        onChange={(e)=> setExerciseId(e.target.value)}
                        required
                        disabled={readOnly}
                        className="inline-select"
                    >
                        <option value="" disabled hidden>
                        Select Exercise
                        </option>
                        {Object.values(exercises).map((exercise) => (
                            <option
                                value={exercise.id}
                            >
                                {exercise.name}
                            </option>
                        ))}
                    </select>
                    <label className="circleInputLabel">
                        Reps
                    <input
                        type="number"
                        value={reps}
                        onChange={(e)=>setReps(e.target.value)}
                        className="circleField"
                        required
                        min="1"
                        max="99"
                        disabled={readOnly}
                        />
                    </label>
                    <label className="circleInputLabel">
                        Weight
                    <input
                        type="number"
                        value={weight}
                        onChange={(e)=>setWeight(e.target.value)}
                        className="circleField"
                        required
                        min="1"
                        max="1999"
                        disabled={readOnly}
                    />
                    </label>
                    <button type="submit" className="card-button">
                        ADD
                    </button>
        </form>
    )
}
export default WorkoutExerciseForm
