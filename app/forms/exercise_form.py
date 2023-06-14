from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models.exercises import Exercise

def exercise_exists(form, field):
    # Checking if user exists
    name = field.data
    user = Exercise.query.filter(Exercise.name == name).first()
    if user:
        raise ValidationError('This exercise already exists.')



class ExerciseForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired(), exercise_exists]
    )
    primary_muscle = StringField(
        'primary_muscle', validators=[DataRequired()]
    )
    description = StringField(
        'description', validators=[DataRequired()]
    )
    secondary_muscle = StringField(
        'secondary_muscle', validators=[]
    )
    tertiary_muscle = StringField(
        'tertiary_muscle', validators=[]
    )
    start_photo = StringField(
        'start_photo', validators=[]
    )
    end_photo = StringField(
        'end_photo', validators=[]
    )
