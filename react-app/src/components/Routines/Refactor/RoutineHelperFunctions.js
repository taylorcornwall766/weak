const renderRoutine = (routine) => {
  console.log("routine: ", routine);
  return routine ? (
    <>
      <h2>{routine.name}</h2>
      <p>{routine.description}</p>
      <div className="musclegroups-container">
        <p>{routine.muscle_group_one}</p>
        <p>{routine.muscle_group_two}</p>
        <p>{routine.muscle_group_three}</p>
        <p>{routine.muscle_group_four}</p>
        <p>{routine.muscle_group_five}</p>
      </div>
    </>
  ) : (
    <h2>...Loading</h2>
  );
};

export default renderRoutine;
