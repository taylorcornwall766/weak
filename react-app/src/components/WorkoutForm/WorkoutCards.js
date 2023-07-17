import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import workoutReducer, { deleteWorkoutExerciseThunk, getAllWorkoutsThunk, postWorkoutThunk } from "../../store/workouts";
import "./WorkoutExercise.css"
function WorkoutExerciseCard({exercises, setShowForm, setWorkoutExercises, workoutExercises, preload}){
    // preload will be used to pre-populate the form
    // console.log(preload)
    const dispatch = useDispatch()
    // updating workout exercise entries will be added later, uncomment save button, handlesubmit and swap disabled prop on form elements to readOnly
    const [readOnly, setReadOnly] = useState(true)

    const [exerciseId, setExerciseId] = useState(preload.exerciseId)
    const [reps, setReps] = useState(preload.reps)
    const [weight, setWeight] = useState(preload.weight)
    const handleSubmit = async(e) => {
        e.preventDefault()
    }
    const handleCancel = (e) => {
        e.preventDefault()
        setExerciseId(preload.exerciseId)
        setReps(preload.reps)
        setWeight(preload.weight)
        setReadOnly(true)
    }
    const handleDelete = async(e) => {
        const data = await dispatch(deleteWorkoutExerciseThunk(preload))
        if(data){
            setWorkoutExercises(workoutExercises.filter((wExercise)=> wExercise.id !== preload.id))
            return alert("deleted!")
        }
        return alert("something went wrong! try again.")
    }
    return(
        <form className={`edit-routine-form editableCard card-${readOnly?"inactive":"active"}`}
        onClick={()=>{
            if(readOnly){
              setReadOnly(false)
            }
        }}
        onSubmit={(e)=>handleSubmit(e)}
        >

                    <select
                        value={exerciseId}
                        onChange={(e)=> setExerciseId(e.target.value)}
                        required
                        disabled={true}
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
                        className={`circleField circleField-${readOnly?"inactive":"active"}`}
                        required
                        min="1"
                        max="99"
                        disabled={true}
                        />
                    </label>
                    <label className="circleInputLabel">
                        Weight
                    <input
                        type="number"
                        value={weight}
                        onChange={(e)=>setWeight(e.target.value)}
                        className={`circleField circleField-${readOnly?"inactive":"active"}`}
                        required
                        min="1"
                        max="1999"
                        disabled={true}
                    />
                    </label>
                    {!readOnly &&
                    <div className="stacked-button-container">
                    <button className="card-button" onClick={(e)=>handleCancel(e)}>
                        CANCEL
                    </button>
                    <button className="card-button" onClick={(e)=>handleDelete(e)}>
                        DELETE
                    </button>
                    </div>
                    }
        </form>
    )
}
// <button type="submit" className="card-button">
//     SAVE
// </button>
export default WorkoutExerciseCard
