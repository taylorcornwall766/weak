import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from "../../context/Modal"

function CreateExerciseModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [primaryMuscle, setPrimaryMuscle] = useState("")
    const [secondaryMuscle, setSecondaryMuscle] = useState("")
    const [tertiaryMuscle, setTertiaryMuscle] = useState("")
    const [startPhoto, setStartPhoto] = useState("")
    const [endPhoto, setEndPhoto] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
    }


    return (
        <>
            <h1 className="exercise-modal">Create Exercise</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <input
                        type="textarea"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Primary Muscle
                    <select
                        value={primaryMuscle}
                        onChange={(e)=>setPrimaryMuscle(e.target.value)}
                    >
                        <option value="" disabled hidden>Please Choose</option>
                        <option value="quads">Quads</option>
                        <option value="hamstring">Hamstrings</option>
                        <option value="calves">Calves</option>
                        <option value="core">Core</option>
                        <option value="chest">Chest</option>
                        <option value="forearm">Forearms</option>
                        <option value="tricep">Triceps</option>
                        <option value="bicep">Biceps</option>
                        <option value="shoulder">Shoulders</option>
                        <option value="upperback">Upperback</option>
                        <option value="lowerback">Lowerback</option>
                        <option value="lats">Lats</option>
                    </select>
                </label>
                <label>
                    Secondary Muscle
                    <select
                        value={secondaryMuscle}
                        onChange={(e)=>setSecondaryMuscle(e.target.value)}
                        >
                        <option value="" disabled hidden>Please Choose</option>
                        <option value="quads" disabled={"quads" == primaryMuscle} hidden={"quads" == primaryMuscle}>Quads</option>
                        <option value="hamstring">Hamstrings</option>
                        <option value="calves">Calves</option>
                        <option value="core">Core</option>
                        <option value="chest">Chest</option>
                        <option value="forearm">Forearms</option>
                        <option value="tricep">Triceps</option>
                        <option value="bicep">Biceps</option>
                        <option value="shoulder">Shoulders</option>
                        <option value="upperback">Upperback</option>
                        <option value="lowerback">Lowerback</option>
                        <option value="lats">Lats</option>
                    </select>
                </label>
            </form>
        </>
    )

}

export default CreateExerciseModal
