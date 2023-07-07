from sqlalchemy.sql import text
from app.models.workout_exercise import WorkoutExercise
from app.models.db import db, environment, SCHEMA

def seed_workout_exercises():
    workout_exercise1 = WorkoutExercise(
        workout_id = 1,
        exercise_id = 1,
        weight = 100,
        reps = 10
    )
    workout_exercise2 = WorkoutExercise(
        workout_id = 1,
        exercise_id = 2,
        weight = 100,
        reps = 10
    )
    db.session.add(workout_exercise1)
    db.session.add(workout_exercise2)
    db.session.commit()

def undo_workout_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workout_exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workout_exercises"))

    db.session.commit()
