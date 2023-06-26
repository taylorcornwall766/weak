import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from "../../context/Modal"
import { editExerciseThunk } from '../../store/exercises';
function EditExerciseModal({setDetails, details}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const name = details.name
    const [description, setDescription] = useState(details.description)
    const [primaryMuscle, setPrimaryMuscle] = useState(details.primaryMuscle)
    const [secondaryMuscle, setSecondaryMuscle] = useState(details.secondaryMuscle || "")
    const [tertiaryMuscle, setTertiaryMuscle] = useState(details.tertiaryMuscle || "")
    const [startPhoto, setStartPhoto] = useState(details.startPhoto || "")
    const [endPhoto, setEndPhoto] = useState(details.endPhoto || "")
    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExercise = {
            "description":description,
            "primary_muscle": primaryMuscle,
            "secondary_muscle": secondaryMuscle || null,
            "tertiary_muscle": tertiaryMuscle || null,
            "start_photo": startPhoto || null,
            "end_photo": endPhoto || null,
            id:details.id
        }
        console.log("newExercise object in modal: ",newExercise)
        const data = await dispatch(editExerciseThunk(newExercise))
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
            <h1 className="">{name}</h1>
            <p className="fields">Fields marked with an `*` are required.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Description *
                    <textarea
                        type="text"
                        placeholder='Write a detailed description of how to perform the exercise...'
                        maxLength={999}
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                    />
                    <p className='description characters'>{999-description.length} characters remaining</p>
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
                        pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"

                    />
                </label>
                <label>
                    End Photo
                    <input
                        type="url"
                        value={endPhoto}
                        onChange={(e)=> setEndPhoto(e.target.value)}
                        placeholder='Image.url'
                        pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"

                    />
                </label>

                <button className ="exercise-modal center" id="center2">
                    Save Changes
                </button>

            </form>
        </>
    )

}

export default EditExerciseModal
