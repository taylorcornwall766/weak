import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from "../../context/Modal"
import { postExerciseThunk } from '../../store/exercises';

function CreateExerciseModal({setDetails}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [primaryMuscle, setPrimaryMuscle] = useState("")
    const [secondaryMuscle, setSecondaryMuscle] = useState("")
    const [tertiaryMuscle, setTertiaryMuscle] = useState("")
    const [startPhoto, setStartPhoto] = useState("")
    const [endPhoto, setEndPhoto] = useState("")
    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExercise = {
            "name":name,
            "description":description.trim(),
            "primary_muscle": primaryMuscle,
            "secondary_muscle": secondaryMuscle || null,
            "tertiary_muscle": tertiaryMuscle || null,
            "start_photo": startPhoto || null,
            "end_photo": endPhoto || null
        }
        console.log("newExercise object in modal: ",newExercise)
        const data = await dispatch(postExerciseThunk(newExercise))
        console.log(data)
        if(data){
            setDetails(data)
            closeModal()
        }
    }

    const muscleGroups = ["chest", "shoulder", "tricep", "bicep", "forearm", "upperback", "lowerback", "lats", "quads", "hamstring", "calves", "core"]
    const optionLogic = (muscle, condition1, condition2) => {
        let muscleText = muscle.split("")
        muscleText[0] = muscleText[0].toUpperCase()
        return(
            <option
                value={muscle}
                disabled={muscle == condition1 || muscle== condition2}
                hidden={muscle == condition1 || muscle== condition2}>{muscleText.join("")}
            </option>
        )
    }
    return (
        <>
            <h1 className="exercise-modal">Create Exercise</h1>
            <p>Fields marked with an `*` are required.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Name *
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required
                        minLength="3"
                        maxLength="39"
                    />
                </label>
                <label>
                    Description *
                    <textarea
                        type="text"
                        placeholder='Write a detailed description of how to perform the exercise...'
                        maxLength={999}
                        minLength="10"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                    />
                    <p className='description characters'>{999-description.trim().length} characters remaining</p>
                </label>
                <label>
                    Primary Muscle *
                    <select
                        value={primaryMuscle}
                        onChange={(e)=>setPrimaryMuscle(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>Please Choose</option>
                        {
                            muscleGroups.map((muscle)=> optionLogic(muscle, secondaryMuscle, tertiaryMuscle))
                        }
                    </select>
                </label>
                <label>
                    Secondary Muscle
                    <select
                        value={secondaryMuscle}
                        onChange={(e)=>setSecondaryMuscle(e.target.value)}
                    >
                        <option value="" disabled hidden>Please Choose</option>
                        {
                            muscleGroups.map((muscle)=> optionLogic(muscle, primaryMuscle, tertiaryMuscle))
                        }
                    </select>
                </label>
                <label>
                    Tertiary Muscle
                    <select
                        value={tertiaryMuscle}
                        onChange={(e)=>setTertiaryMuscle(e.target.value)}
                    >
                        <option value="" disabled hidden>Please Choose</option>
                        {
                            muscleGroups.map((muscle)=> optionLogic(muscle, secondaryMuscle, primaryMuscle))
                        }
                    </select>
                </label>
                <label>
                    Start Photo
                    <input
                        type="url"
                        value={startPhoto}
                        onChange={(e)=> setStartPhoto(e.target.value)}
                        placeholder='Image.url'
                    />
                </label>
                <label>
                    End Photo
                    <input
                        type="url"
                        value={endPhoto}
                        onChange={(e)=> setEndPhoto(e.target.value)}
                        placeholder='Image.url'
                    />
                </label>

                <button className ="form button">
                    Create Exercise
                </button>

            </form>
        </>
    )

}

export default CreateExerciseModal
