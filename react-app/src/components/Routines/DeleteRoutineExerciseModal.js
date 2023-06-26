import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from "../../context/Modal"
import { deleteRoutineExerciseThunk } from '../../store/routines';
import { useParams } from 'react-router-dom';

function RoutineExerciseDeleteModal({exercise, routineId, routineExercises, setRoutineExercises,routExId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    console.log("routineId", routineId)
    console.log("routExId", routExId)
    console.log("exercise", exercise)
   const confirmDelete = async(e) =>{
    e.preventDefault()
    // const data = await dispatch(deleteRoutineExerciseThunk(routineId, exercise.id))
    const data = await dispatch(deleteRoutineExerciseThunk(routineId, exercise.id))
    if(data.errors){
        return alert("something went wrong!")
    }
    const newRoutineExercises = routineExercises.filter((ex) => ex.id !== exercise.id);
    setRoutineExercises(newRoutineExercises)

    return closeModal()

   }

    return (
        <>
            <h1 className="delete-modal">{`Are you sure you want to remove this exercise?`}</h1>
            <div className="button-container">
                <button className="delete modal-button"onClick={(e)=>confirmDelete(e)}>Confirm Delete</button>
                <button className="edit modal-button" onClick={()=>closeModal()}>Cancel</button>
            </div>
        </>
    )

}

export default RoutineExerciseDeleteModal
