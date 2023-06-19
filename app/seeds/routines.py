from sqlalchemy.sql import text
from app.models.routines import Routine
from app.models.db import db, environment, SCHEMA

def seed_routines():
    routine1 = Routine(
        author_id = 1,
        name = "test",
        muscle_group_one = "shoulder",
        description = "working everything bro"
    )

    db.session.add(routine1)
    db.session.commit()

def undo_routines():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.routines RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM routines"))

    db.session.commit()
