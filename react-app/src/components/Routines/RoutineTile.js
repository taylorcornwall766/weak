import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import RoutineDeleteModal from "./DeleteRoutineModal"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const RoutineTile = ({routine}) => {
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    return(
        <div className="routineTile">
            <h2>{routine.name}</h2>
            <p>{routine.description}</p>
            <ul>
                <li>{routine.muscle_group_one}</li>
                {routine.muscle_group_two && <li>{routine.muscle_group_two}</li>}
                {routine.muscle_group_three && <li>{routine.muscle_group_three}</li>}
                {routine.muscle_group_four && <li>{routine.muscle_group_four}</li>}
                {routine.muscle_group_five && <li>{routine.muscle_group_five}</li>}
            </ul>
            <p>{routine.author.lastName}, {routine.author.firstName}</p>
            {user && user.id == routine.author.id && (
                <>
                <OpenModalButton
                    className="exercise-modal"
                    buttonText="Delete Routine"
                    modalComponent={<RoutineDeleteModal routine={routine}/>}
                    />
                <button onClick={()=>history.push(`/routines/${routine.id}/edit`)}>Edit</button>
                </>
            )}
        </div>
    )
}

export default RoutineTile
