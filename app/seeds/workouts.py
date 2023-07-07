from sqlalchemy.sql import text
from app.models.workouts import Workout
from app.models.db import db, environment, SCHEMA

def seed_workouts():
    workout1 = Workout(
        author_id = 1
    )
    workout2 = Workout(
        author_id = 1
    )
    workout3 = Workout(
        author_id = 1
    )
    db.session.add(workout1)
    db.session.add(workout2)
    db.session.add(workout3)
    db.session.commit()

def undo_workouts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workouts"))

    db.session.commit()
