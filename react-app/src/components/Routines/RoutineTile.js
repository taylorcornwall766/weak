const RoutineTile = ({routine}) => {
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
        </div>
    )
}

export default RoutineTile
