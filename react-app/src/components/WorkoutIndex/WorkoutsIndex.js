import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./WorkoutsIndex.css";
function WorkoutsIndex() {
  const dispatch = useDispatch();
  const history = useHistory();
  const workouts = useSelector((state) => state.workout.current);

  const dateDictionary = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const dateConverter = (dateString) => {
    const dateArr = dateString.split("-");
    const newDateStr = `${dateArr[3]}, ${dateArr[2]} ${
      dateDictionary[dateArr[1]]
    }, ${dateArr[0]}`;
    return newDateStr;
  };
  return (
    <>
      <h1 className="routines-h1">Workouts</h1>
      <div className="scrollable-container">

          {workouts.length > 0 ? (
            workouts.map((workout) => {
              if (workout.workoutExercises.length < 1) {
                return null;
              }
              return (
                <div
                  className="WorkoutTile"
                  onClick={() => history.push(`/workouts/${workout.id}/edit`)}
                >
                  <p className="sets-text">
                    {workout.workoutExercises.length} sets
                  </p>
                  <p className="sets-text date-text">
                    {dateConverter(workout.startedAt)}
                  </p>
                </div>
              );
            })
          ) : (
            <h2 className="empty-message">No Workouts yet...</h2>
          )}

      </div>
    </>
  );
}
export default WorkoutsIndex;
