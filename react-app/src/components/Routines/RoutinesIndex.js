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
            <h1 className="routines-h1">Routines</h1>
            <button className="new-routine-button"onClick={()=>{history.push("/routines/new")}}>New Routine</button>
            <div className="routine-tile-container">

                {routinesArr.map((routine) => (

                    <RoutineTile routine={routine}/>
                    )
                )}
            </div>
        </>
    )
}
export default RoutinesIndex
