import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RoutineTile from "./RoutineTile";
import { useHistory } from "react-router-dom";
function RoutinesIndex() {
    const dispatch = useDispatch();
    const history = useHistory()
    const routines = useSelector((state) => state.routine)
    const user = useSelector((state) => state.session.user)

    const routinesArr = Object.values(routines)

    return (
        <>
            <button onClick={()=>{history.push("/routines/new")}}>Create new Routine</button>
            <h1>Routines</h1>
            {routinesArr.map((routine) => (

                <RoutineTile routine={routine}/>
                )
            )}
        </>
    )
}
export default RoutinesIndex
