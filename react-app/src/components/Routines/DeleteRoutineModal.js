import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from "../../context/Modal"
import { deleteRoutineThunk } from '../../store/routines';

function RoutineDeleteModal({routine}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

   const confirmDelete = async(e) =>{
    e.preventDefault()
    const data = await dispatch(deleteRoutineThunk(routine.id))
    if(data.errors){
        return alert("something went wrong!")
    }
    return closeModal()

   }

    return (
        <>
            <h1 className="delete-modal">{`Are you sure you want to delete this Routine?`}</h1>
            <button onClick={(e)=>confirmDelete(e)}>Confirm Delete</button>
            <button onClick={(e)=>closeModal()}>Cancel</button>
        </>
    )

}

export default RoutineDeleteModal
