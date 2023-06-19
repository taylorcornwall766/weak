from sqlalchemy.sql import text
from app.models.routine_exercise import RoutineExercise
from app.models.db import db, environment, SCHEMA

def seed_routine_exercises():
    routine_exercise_1 = RoutineExercise(
        routine_id = 1,
        exercise_id = 1,
        sets = 2
    )
    routine_exercise_2 = RoutineExercise(
        routine_id = 1,
        exercise_id = 3,
        sets = 2
    )
    routine_exercise_3 = RoutineExercise(
        routine_id = 1,
        exercise_id = 2,
        sets = 4
    )

    db.session.add(routine_exercise_1)
    db.session.add(routine_exercise_2)
    db.session.add(routine_exercise_3)
    db.session.commit()

def undo_routine_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.routine_exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM routine_exercises"))

    db.session.commit()
