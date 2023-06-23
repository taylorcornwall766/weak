import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { editRoutineThunk, getAllRoutinesThunk } from "../../store/routines";
import { getAllExercisesThunk } from "../../store/exercises";
import RoutineExerciseForm from "./RoutineExercise";
import OpenModalButton from "../OpenModalButton";
import RoutineExerciseDeleteModal from "./DeleteRoutineExerciseModal";

const EditRoutineForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { routineId } = useParams();
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getAllRoutinesThunk());
    dispatch(getAllExercisesThunk());
    // console.log("test")
  }, [dispatch]);
  const routines = useSelector((state) => state.routine);
  const routine = routines[routineId];
  if (routine && user.id !== routine.author.id) {
    history.push("/home")
  }
  const exercises = useSelector((state) => state.exercise);
  const [exercisesObj, setExercisesObj] = useState({});
//   change to on submit
  const [name, setName] = useState(routine?.name || "");
  const [description, setDescription] = useState(routine?.description || "");
  const [muscleGroupOne, setMuscleGroupOne] = useState(
    routine?.muscle_group_one || ""
  );
  const [muscleGroupTwo, setMuscleGroupTwo] = useState(
    routine?.muscle_group_two || ""
  );
  const [muscleGroupThree, setMuscleGroupThree] = useState(
    routine?.muscle_group_three || ""
  );
  const [muscleGroupFour, setMuscleGroupFour] = useState(
    routine?.muscle_group_four || ""
  );
  const [muscleGroupFive, setMuscleGroupFive] = useState(
    routine?.muscle_group_five || ""
  );

  const [routineExercises, setRoutineExercises] = useState([]);
  useEffect(() => {
    if (routine) {
      setName(routine.name);
      setDescription(routine.description);
      setMuscleGroupOne(routine.muscleGroupOne);
      setMuscleGroupTwo(routine.muscleGroupTwo || "");
      setMuscleGroupThree(routine.muscleGroupThree || "");
      setMuscleGroupFour(routine.muscleGroupFour || "");
      setMuscleGroupFive(routine.muscleGroupFive || "");
      console.log(
        "routine object values ->  ",
        Object.values(routine.routine_exercises)
      );
      console.log("routine ex before : ", routineExercises);
      const routineExArr = Object.values(routine.routine_exercises);
      // console.log("routineExArr: ", routineExArr)
      setRoutineExercises([...routineExArr]);
    //   setRoutineTest(routine);
      console.log("routine ex after : ", routineExercises);
      // console.log("routineExercises ->  ",routineExercises)
    }
  }, [routine]);
  useEffect(() => {
    if (Object.values(exercises).length) {
      setExercisesObj(exercises);
    }
  }, [exercises]);
  const [errors, setErrors] = useState({});
  const muscleGroupsArr = [
    "back",
    "bicep",
    "shoulder",
    "tricep",
    "chest",
    "forearm",
    "legs",
    "core",
  ];
  const validate = () => {
    let newErrors = {};
    let error = false;
    if (!muscleGroupOne) {
      newErrors.muscleGroupOne = "You must select at least one muscle group";
      error = true;
    }
    if (!description || description.trim().length < 10) {
      newErrors.description =
        "You must provide a description at least 10 characters long";
      error = true;
    }
    if (!name) {
      newErrors.name = "You must provide a name";
      error = true;
    }
    if (error) {
      setErrors(newErrors);
    }
    return !error;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    let formValidated = validate();
    const newRoutine = {
      name: name,
      description: description.trim(),
      muscle_group_one: muscleGroupOne,
      muscle_group_two: muscleGroupTwo || null,
      muscle_group_three: muscleGroupThree || null,
      muscle_group_four: muscleGroupFour || null,
      muscle_group_five: muscleGroupFive || null,
    };
    console.log(formValidated)
    console.log(errors)
    console.log("mg1: ", muscleGroupOne)
    if (formValidated) {
      const newRoutineResponse = await dispatch(editRoutineThunk(newRoutine));
      history.push(`/routines/${newRoutineResponse.id}/edit`);
    }
  };
  const optionLogic = (
    muscle,
    condition1,
    condition2,
    condition3,
    condition4
  ) => {
    let muscleText = muscle.split("");
    muscleText[0] = muscleText[0].toUpperCase();
    return (
      <option
        value={muscle}
        disabled={muscle == condition1 || muscle == condition2}
        hidden={
          muscle == condition1 ||
          muscle == condition2 ||
          muscle == condition3 ||
          muscle == condition4
        }
      >
        {muscleText.join("")}
      </option>
    );
  };
  return (
    <>
      <h1 className="routine-form">Edit Routine: {name}</h1>
      <p>Fields marked with an `*` are required.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name *
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={49}
          />
          <p className="errors">{errors.name}</p>
        </label>
        <label>
          Description *
          <textarea
            type="text"
            placeholder="Write a detailed description of at least 10 characters"
            maxLength={999}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p className="description characters">
            {999 - description.trim().length} characters remaining
          </p>
          <p className="errors">{errors.description}</p>
        </label>
        <label>
          Muscle Group 1 *
          <select
            value={muscleGroupOne}
            onChange={(e) => setMuscleGroupOne(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Please Choose
            </option>
            {muscleGroupsArr.map((muscle) =>
              optionLogic(
                muscle,
                muscleGroupTwo,
                muscleGroupThree,
                muscleGroupFour,
                muscleGroupFive
              )
            )}
          </select>
        </label>
        {muscleGroupOne && (
          <label>
            Muscle Group 2
            <select
              value={muscleGroupTwo}
              onChange={(e) => setMuscleGroupTwo(e.target.value)}
            >
              <option value="">Please Choose</option>
              {muscleGroupsArr.map((muscle) =>
                optionLogic(
                  muscle,
                  muscleGroupOne,
                  muscleGroupThree,
                  muscleGroupFour,
                  muscleGroupFive
                )
              )}
            </select>
          </label>
        )}
        {muscleGroupTwo && (
          <label>
            Muscle Group 3
            <select
              value={muscleGroupThree}
              onChange={(e) => setMuscleGroupThree(e.target.value)}
            >
              <option value="">Please Choose</option>
              {muscleGroupsArr.map((muscle) =>
                optionLogic(
                  muscle,
                  muscleGroupOne,
                  muscleGroupTwo,
                  muscleGroupFour,
                  muscleGroupFive
                )
              )}
            </select>
          </label>
        )}
        {muscleGroupThree && (
          <label>
            Muscle Group 4
            <select
              value={muscleGroupFour}
              onChange={(e) => setMuscleGroupFour(e.target.value)}
            >
              <option value="">Please Choose</option>
              {muscleGroupsArr.map((muscle) =>
                optionLogic(
                  muscle,
                  muscleGroupOne,
                  muscleGroupTwo,
                  muscleGroupThree,
                  muscleGroupFive
                )
              )}
            </select>
          </label>
        )}
        {muscleGroupFour && (
          <label>
            Muscle Group 5
            <select
              value={muscleGroupFive}
              onChange={(e) => setMuscleGroupFive(e.target.value)}
            >
              <option value="">--optional--</option>
              {muscleGroupsArr.map((muscle) =>
                optionLogic(
                  muscle,
                  muscleGroupOne,
                  muscleGroupTwo,
                  muscleGroupThree,
                  muscleGroupFour
                )
              )}
            </select>
          </label>
        )}
        <button type="submit">Save Changes</button>
      </form>
      <h1>Routine Exercises</h1>
      <RoutineExerciseForm
        exercises={Object.values(exercisesObj)}
        routineExercises={routineExercises}
        setRoutineExercises={setRoutineExercises}
      ></RoutineExerciseForm>
      {/* exercises.length > 0 && */}
      {routineExercises.length > 0 &&
        routineExercises.map((exercise) => (
          <>
            <h3>{exercises[exercise.exerciseId].name}</h3>
            <p>{exercise.sets} sets</p>
            <p>{exercises[exercise.exerciseId].description}</p>
            <OpenModalButton
                classname="exercise-modal" buttonText="delete"
                modalComponent={<RoutineExerciseDeleteModal routineId={routineId}exercise={exercise} routineExercises={routineExercises} setRoutineExercises={setRoutineExercises}/>}
            />
            {/* <p>{exercise.primary} : sets</p> */}
          </>
        ))}
    </>
  );
};
export default EditRoutineForm;
