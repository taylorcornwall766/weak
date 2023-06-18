from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Exercise(db.Model):
    __tablename__ = 'exercises'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    primary_muscle = db.Column(db.String(50), nullable=False)
    secondary_muscle = db.Column(db.String(50), nullable=True)
    tertiary_muscle = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String(1000), nullable=False)
    start_photo = db.Column(db.String(1000), nullable=True)
    end_photo = db.Column(db.String(1000), nullable=True)

    authorId = db.relationship(
        "User", back_populates = 'exercise'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'primaryMuscle': self.primary_muscle,
            'secondaryMuscle': self.secondary_muscle or False,
            'tertiaryMuscle': self.tertiary_muscle or False,
            'description': self.description,
            'startPhoto': self.start_photo or False,
            'endPhoto': self.end_photo or False,
            'author': self.authorId.to_exercise_dict(),
        }
    def to_routine_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'primaryMuscle': self.primary_muscle,
            'secondaryMuscle': self.secondary_muscle or False,
            'tertiaryMuscle': self.tertiary_muscle or False,
            'description': self.description,
            'startPhoto': self.start_photo or False,
            'endPhoto': self.end_photo or False,
        }
