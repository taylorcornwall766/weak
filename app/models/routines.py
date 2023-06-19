from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Routine(db.Model):
    __tablename__ = 'routines'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    muscle_group_one = db.Column(db.String(50), nullable=False)
    muscle_group_two = db.Column(db.String(50), nullable=True)
    muscle_group_three = db.Column(db.String(50), nullable=True)
    muscle_group_four = db.Column(db.String(50), nullable=True)
    muscle_group_five = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String(1000), nullable=False)

    routineAuthorId = db.relationship(
        "User", back_populates = 'routine'
    )
    routine_routine_exercise = db.relationship(
        "RoutineExercise", back_populates='routine_exercise_routine'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'muscle_group_one': self.muscle_group_one,
            'muscle_group_two': self.muscle_group_two or False,
            'muscle_group_three': self.muscle_group_three or False,
            'muscle_group_four': self.muscle_group_four or False,
            'muscle_group_five': self.muscle_group_five or False,
            'description': self.description,
            'author': self.routineAuthorId.to_exercise_dict(),
            'routine_exercises': [exercise.to_dict() for exercise in self.routine_routine_exercise]
        }
