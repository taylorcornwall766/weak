from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class WorkoutExercise(db.Model):
    __tablename__ = 'workout_exercises'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workouts.id')), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('exercises.id')), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)

    workout_exercise_workout = db.relationship(
        "Workout", back_populates='workout_workout_exercise'
    )

    workout_exercise_exercise = db.relationship(
        "Exercise", back_populates='exercise_workout_exercise'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'workoutId': self.workout_id,
            'exerciseId': self.exercise_id,
            'weight': self.weight,
            'reps': self.reps,
            # 'exercise':self.workout_exercise_exercise.to_dict()
        }
