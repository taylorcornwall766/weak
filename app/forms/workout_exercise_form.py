from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired

class WorkoutExerciseForm(FlaskForm):
    # exercise_id
    # weight
    # reps
    exercise_id = StringField(
        'exercise_id', validators=[DataRequired()]
    )
    weight = IntegerField(
        'weight', validators=[DataRequired()]
    )
    reps = IntegerField(
        'reps', validators=[DataRequired()]
    )
