from sqlalchemy.sql import text
from app.models.exercises import Exercise
from app.models.db import db, environment, SCHEMA

def seed_exercises():
    exercise1 = Exercise(
        author_id = 1,
        name = "bicep curl",
        primary_muscle = "bicep",
        description = "From a resting position with your arms straight down at your side exhale and slowly bend each elbow in unison, bringing the dumbbells towards your chest without arching your back or moving your elbows forward. Maintain a neutral wrist position (avoid flexion and extension of your wrists)."
    )
    exercise2 = Exercise(
        author_id = 1,
        name = "lateral raise",
        primary_muscle = "shoulder",
        description = "From resting position with your arms straight down at your side exhale and slowly raise each arm in unison directly out to your side, bringing the dumbbells towards the ceiling without arching your back or bending your elbows. Maintain a neutral wrist position (avoid flexion and extension of your wrists) and avoid swinging the weight and using momentum."
    )
    exercise3 = Exercise(
        author_id = 1,
        name = "hammer curl",
        primary_muscle = "bicep",
        description = "From resting position exhale and slowly bend each elbow in unison, bringing the dumbbells towards your chest without arching your back or moving your elbows forward. Maintain a neutral wrist position (avoid flexion and extension of your wrists)"
    )

    db.session.add(exercise1)
    db.session.add(exercise2)
    db.session.add(exercise3)
    db.session.commit()

def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))

    db.session.commit()
