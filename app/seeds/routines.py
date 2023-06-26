from sqlalchemy.sql import text
from app.models.routines import Routine
from app.models.db import db, environment, SCHEMA

def seed_routines():
    routine1 = Routine(
        author_id = 1,
        name = "Push Day",
        muscle_group_one = "shoulder",
        muscle_group_two = "chest",
        muscle_group_three = "tricep",
        description = "Hitting all of the muscles responsible for push movements. Starting with the front delt of the shoulder and then working upper chest. After hitting chest finishing off with triceps."
    )

    routine2 = Routine(
        author_id=1,
        name="Leg Day",
        muscle_group_one="quads",
        muscle_group_two="hamstring",
        muscle_group_three="calves",
        description="Targeting the lower body muscles. Emphasizing quadriceps and hamstrings, followed by calf exercises for lower leg development."
    )

    routine3 = Routine(
        author_id=1,
        name="Back and Biceps",
        muscle_group_one="upperback",
        muscle_group_two="lats",
        muscle_group_three="bicep",
        description="Focusing on the muscles of the back and biceps. Starting with exercises that engage the upper back, followed by lat exercises. Finishing off with bicep exercises."
    )

    routine4 = Routine(
        author_id=1,
        name="Core Workout",
        muscle_group_one="core",
        description="A comprehensive core workout that targets the abdominal muscles, obliques, and lower back. Strengthening the core provides stability and support for other movements."
    )


    db.session.add(routine1)
    db.session.add(routine2)
    db.session.add(routine3)
    db.session.add(routine4)
    db.session.commit()

def undo_routines():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.routines RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM routines"))

    db.session.commit()
