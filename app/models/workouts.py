from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Workout(db.Model):
    __tablename__ = 'workouts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    started_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    ended_at = db.Column(db.DateTime, nullable=True)

    workoutAuthorId = db.relationship(
        "User", back_populates = 'workouts'
    )

    workout_workout_exercise = db.relationship(
        "WorkoutExercise", back_populates='workout_exercise_workout',
        cascade="all, delete"
    )
    # self.created_at.strftime("%Y-%m-%d-%H:%M")
    def to_dict(self):
        return{
            'id': self.id,
            # 'authorId': self.workoutAuthorId.to_exercise_dict(),
            'startedAt': self.started_at.strftime("%Y-%m-%d-%H:%M"),
            'endedAt': self.ended_at and self.ended_at.strftime("%Y-%m-%d-%H:%M"),
            'workoutExercises': [workoutExercise.to_dict() for workoutExercise in self.workout_workout_exercise]
        }
