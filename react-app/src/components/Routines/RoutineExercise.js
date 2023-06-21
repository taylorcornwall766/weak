import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postRoutineExerciseThunk } from "../../store/routines";
import { useModal } from "../../context/Modal";
const RoutineExerciseForm = ({ exercises, setRoutine}) => {
  const {closeModal} = useModal()
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [sets, setSets] = useState(0)
  const [exerciseId, setExerciseId] = useState("")
  const [errors, setErrors] = useState({})
  const {routineId} = useParams()
  const validate = () => {
    const newErrors = {}
    const validated = true
    if(!sets){
        newErrors.sets = "You must have at least 1 set of this exercise!"
        validated = false
    }
    if(!exerciseId){
        newErrors.exercise = "You must select an exercise!"
        validated = false
    }
    if(!validated){
        setErrors(newErrors)
    }
    return validated
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validateRoutineExercise = validate()
    if(validateRoutineExercise){
        const routine = {
            "exercise_id": exerciseId,
            "routine_id": routineId,
            "sets": sets
        }
        const newRoutine = await dispatch(postRoutineExerciseThunk(routine))
        if(newRoutine){
            setOpenForm(false)
            setSets(0)
            setExerciseId("")
            setErrors({})
            closeModal()
        }
    }

  }
  return (
    <>
      {!openForm ? (
        <button onClick={() => setOpenForm(!openForm)}>Add Exercise</button>
      ) : (
        <div className="form container">
            <h2>Add Exercise to Routine</h2>
            <p>Fields marked with an `*` are required.</p>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <label>
                Exercise *
                    <select
                        value={exerciseId}
                        onChange={(e)=> setExerciseId(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>
                        Please Choose
                        </option>
                        {exercises.map((exercise) => (
                            <option
                                value={exercise.id}
                            >
                                {exercise.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                Sets *
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={sets}
                        onChange={(e)=>{setSets(e.target.value>50? 50: e.target.value)}}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </div >
      )}
    </>
  );
};

export default RoutineExerciseForm;
