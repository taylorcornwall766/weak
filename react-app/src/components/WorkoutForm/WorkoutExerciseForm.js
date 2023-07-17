import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import workoutReducer, { getAllWorkoutsThunk, postWorkoutThunk, postWorkoutExerciseThunk } from "../../store/workouts";
import "./WorkoutExercise.css"
function WorkoutExerciseForm({exercises, setShowForm, setWorkoutExercises, workoutId, workoutExercises}){
    const dispatch = useDispatch()
    const [readOnly, setReadOnly] = useState(true)
    const [exerciseId, setExerciseId] = useState("")
    const [reps, setReps] = useState("")
    const [weight, setWeight] = useState("")
    const [errors, setErrors] = useState({})
    const handleSubmit = async(e) => {
        e.preventDefault()
        let errors = false
        if(!reps){
            setErrors({...errors, reps:"Please provide a valid number of reps."})
            errors = true
        }
        if(!weight){
            setErrors({...errors, weight:"Please provide a valid amount of weight, if its a body weight exercise put your body weight."})
            errors = true
        }
        if(!exerciseId){
            setErrors({...errors, exercise:"Please select an exercise."})
            errors = true
        }
        if(errors){
            return
        }else{
            const data = await dispatch(postWorkoutExerciseThunk({"exercise_id": exerciseId, "reps": reps, "weight": weight},workoutId))
            console.log(data)
            if(data){
                console.log("workoutExercises before anything: ", workoutExercises)
                let newWorkoutExercises = [...workoutExercises]
                newWorkoutExercises.push(data.workoutExercise)
                setWorkoutExercises(newWorkoutExercises)
                console.log("workoutExercises after anything: ", workoutExercises)
                return alert("added")
            }
        }
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
                        placeholder="0"
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
                        placeholder="0"
                    />
                    </label>
                    <button type="submit" className="card-button">
                        ADD
                    </button>
        </form>
    )
}
export default WorkoutExerciseForm
