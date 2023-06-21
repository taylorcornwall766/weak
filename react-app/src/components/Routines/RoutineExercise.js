import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const RoutineExerciseForm = ({ exercises }) => {
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
    }
    if(!exerciseId){
        newErrors.exercise = "You must select an exercise!"
    }
  }
  const handleSubmit = (e) => {
    const newErrors = {}

  }
  return (
    <>
      {!openForm ? (
        <button onClick={() => setOpenForm(!openForm)}>Add Exercise</button>
      ) : (
        <div className="form container">
            <h2>Routine Exercise</h2>
            <p>Fields marked with an `*` are required.</p>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <label>
                Exercise
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
            </form>
        </div >
      )}
    </>
  );
};

export default RoutineExerciseForm;
