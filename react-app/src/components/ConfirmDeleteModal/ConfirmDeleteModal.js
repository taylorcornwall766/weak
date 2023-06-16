import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from "../../context/Modal"
import { deleteExerciseThunk } from '../../store/exercises';

function ConfirmDeleteModal({exerciseId, name, setDetails}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

   const confirmDelete = async(e) =>{
    e.preventDefault()
    const data = await dispatch(deleteExerciseThunk(exerciseId))
    if(data.errors){
        return alert("something went wrong!")
    }
    setDetails(false)
    return closeModal()

   }

    return (
        <>
            <h1 className="delete-modal">{`Are you sure you want to delete this ${name}?`}</h1>
            <button onClick={(e)=>confirmDelete(e)}>Confirm Delete</button>
            <button onClick={(e)=>closeModal()}>Cancel</button>
        </>
    )

}

export default ConfirmDeleteModal
