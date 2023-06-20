import React, {useState} from 'react'


const RoutineForm = () => {
    // {
    //     "name": "changes",
    //     "description": "testing these out",
    //     "muscle_group_one": "back",
    //     "muscle_group_two": "bicep",
    //     "muscle_group_three": null,
    //     "muscle_group_four": null,
    //     "muscle_group_five": null
    // }
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [muscleGroupOne, setMuscleGroupOne] = useState("")
    const [muscleGroupTwo, setMuscleGroupTwo] = useState("")
    const [muscleGroupThree, setMuscleGroupThree] = useState("")
    const [muscleGroupFour, setMuscleGroupFour] = useState("")
    const [muscleGroupFive, setMuscleGroupFive] = useState("")
    const muscleGroupsArr = ["back", "bicep", "shoulder", "tricep", "chest", "forearm", "legs", "core"]

    const handleSubmit = async(e)=>{
        e.preventDefault()
    }

    return(
        <>
            <h1 className="routine-form">Create new Routine</h1>
            <p>Fields marked with an `*` are required.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Name *
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required
                    />
                </label>
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
                    <p className='description characters'>{999-description.trim().length} characters remaining</p>
                </label>
                <label>
                    Muscle Group 1 *
                    <select
                        value={muscleGroupOne}
                    >

                    </select>
                </label>
            </form>
        </>
    )
}
export default RoutineForm
