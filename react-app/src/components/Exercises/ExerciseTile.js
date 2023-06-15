import {useHistory} from 'react-router-dom'

const ExerciseTile = ({exercise, handleClick}) => {
    return(
        <>
        <a onClick={()=>handleClick(exercise)}>{exercise.name}</a>
        </>
    )
}

export default ExerciseTile
