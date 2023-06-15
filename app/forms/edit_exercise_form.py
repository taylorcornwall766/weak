from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models.exercises import Exercise


class ExerciseEditForm(FlaskForm):
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
