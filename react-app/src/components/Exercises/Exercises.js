import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExerciseThunk, getAllExercisesThunk } from "../../store/exercises";
import ExerciseTile from "./ExerciseTile";
import OpenModalButton from "../OpenModalButton";
import CreateExerciseModal from "./ExerciseModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.js";
import EditExerciseModal from "./EditExerciseModal";
import "./Exercises.css"
function ExercisePage() {
  const dispatch = useDispatch();
  // const history = useHistory()
  const exercises = useSelector((state) => state.exercise);
  const user = useSelector((state) => state.session.user);
  const [details, setDetails] = useState(false);
  // console.log(exercises)
  useEffect(() => {
    dispatch(getAllExercisesThunk());
  }, [dispatch]);

  const handleClick = (exercise) => {
    setDetails(exercise);
    // posts[postId] = newPost
    // setPosts({...posts})
  };
  // obj.values(posts).map(())
  const muscleGroups = {
    "legs":[],
    "shoulder":[],
    "bicep":[],
    "tricep":[],
    "back":[],
    "forearm":[],
    "chest":[],
    "core":[]
  }
  const exArr = Object.values(exercises)
//   splitting each of the exercises into their respective muscle groups, not sure if this should be done in the store/ reducer
//   or if here is best
  exArr.forEach((exercise)=> {
    const primaryMuscle = exercise.primaryMuscle
    switch (primaryMuscle){
        case "back":
        case "upperback":
        case "lowerback":
        case "lats":{
            muscleGroups.back.push(exercise)
            break
        }
        case "shoulder":{
            muscleGroups.shoulder.push(exercise)
            break
        }
        case "bicep":{
            muscleGroups.bicep.push(exercise)
            break
        }
        case "tricep":{
            muscleGroups.tricep.push(exercise)
            break
        }
        case "forearm":{
            muscleGroups.forearm.push(exercise)
            break
        }
        case "chest":{
            muscleGroups.chest.push(exercise)
            break
        }
        case "core":{
            muscleGroups.core.push(exercise)
            break
        }
        case "legs":
        case "quads":
        case "hamstring":
        case "calves":{
            muscleGroups.legs.push(exercise)
            break
        }
        default:{
            break
        }

    }
  })
//   console.log(muscleGroups)

  return (
    <div className="homepage">
      <h1>Exercises</h1>
      <OpenModalButton
        className="exercise-modal"
        buttonText="Create Exercise"
        modalComponent={<CreateExerciseModal setDetails={setDetails}/>}
      />
      <div className={`details-div ${details?"": "hidden"}`}>

        {details &&
            <div className="details-container">
            <div className="images-container">
                <img className="exercise-img" src={details.startPhoto? details.startPhoto: "https://cdn.discordapp.com/attachments/1117972822686433291/1122772424728006747/male-anatomy-view.png"}></img>
                <img className="exercise-img" src={details.endPhoto? details.endPhoto : "https://cdn.discordapp.com/attachments/1117972822686433291/1122772424728006747/male-anatomy-view.png"}></img>
            </div>
            <h2>{details.name}:</h2>
        <p>{details.description}</p>
        <p>Muscle Groups:</p>
        <ul>
            <li>{details.primaryMuscle}</li>
            {details.secondaryMuscle&&<li>{details.secondaryMuscle}</li>}
            {details.tertiaryMuscle&&<li>{details.tertiaryMuscle}</li>}
        </ul>
        <p>{`${details.author.lastName}, ${details.author.firstName}`}</p>
        </div >}
        {
          details && details.author.id == user.id &&
          <>
          <OpenModalButton
            className="delete"
            buttonText="Delete"
            modalComponent={<ConfirmDeleteModal exerciseId={details.id} name="Exercise" setDetails={setDetails}/>}
          />
          <OpenModalButton
            className="edit"
            buttonText="Edit"
            modalComponent={<EditExerciseModal setDetails={setDetails} details={details}/>}
          />
          </>
        }
      </div>

        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Back</h2>
          {muscleGroups.back.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>
        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Chest</h2>
          {muscleGroups.chest.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>
        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Shoulder</h2>
          {muscleGroups.shoulder.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>
        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Bicep</h2>
          {muscleGroups.bicep.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>
        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Tricep</h2>
          {muscleGroups.tricep.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>
        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Forearm</h2>
          {muscleGroups.forearm.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>
        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Legs</h2>
          {muscleGroups.legs.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>
        <div className="musclegroup-container">
            <h2 className="musclegroup-header">Core</h2>
          {muscleGroups.core.map((exercise) =>
            <li key={`exercise-tile-${exercise.id}-li`}>
             <ExerciseTile exercise={exercise} handleClick={handleClick} key={`exercise-tile-${exercise.id}`}/>
            </li>
          )}
        </div>


    </div>
  );
}
export default ExercisePage;
