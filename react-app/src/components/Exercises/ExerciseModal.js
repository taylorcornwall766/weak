import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from "../../context/Modal"

function CreateExerciseModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [primaryMuscle, setPrimaryMuscle] = useState("")
    const [secondaryMuscle, setSecondaryMuscle] = useState(null)
    const [tertiaryMuscle, setTertiaryMuscle] = useState(null)
    const [startPhoto, setStartPhoto] = useState(null)
    const [endPhoto, setEndPhoto] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <h1 className="exercise-modal">Create Exercise</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    
                </label>
            </form>
        </>
    )

}
