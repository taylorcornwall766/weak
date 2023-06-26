import {useHistory} from 'react-router-dom'

const ExerciseTile = ({exercise, handleClick}) => {
    return(
        <>
        <a href="#top"className="muscle-group" onClick={()=>handleClick(exercise)}>{exercise.name}</a>
        </>
    )
}

export default ExerciseTile
