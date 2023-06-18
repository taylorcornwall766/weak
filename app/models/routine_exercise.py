from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class RoutineExercise(db.Model):
    __tablename__ = 'routine_exercises'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('routines.id')), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('exercises.id')), nullable=False)
    sets = db.Column(db.Integer, nullable=False)

    routine = db.relationship(
        "Routine", back_populates = 'routine_exercise'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'routineId': self.routine_id,
            'exerciseId': self.exercise_id,
            'sets': self.sets,
        }
