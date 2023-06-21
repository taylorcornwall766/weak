from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models.exercises import Exercise

class RoutineExerciseForm(FlaskForm):
    routine_id = StringField(
        'routine_id', validators=[DataRequired()]
    )
    exercise_id = StringField(
        'exercise_id', validators=[DataRequired()]
    )
    sets = IntegerField(
        'sets', validators=[DataRequired()]
    )
