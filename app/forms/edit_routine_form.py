from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models.routines import Routine

def routine_exists(form, field):
    name = field.data
    routine = Routine.query.filter(Routine.name == name).first()
    

class EditRoutineForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired()]
    )
    muscle_group_one = StringField(
        'muscle_group_one', validators=[DataRequired()]
    )
    muscle_group_two = StringField(
        'muscle_group_one', validators=[]
    )
    muscle_group_three = StringField(
        'muscle_group_three', validators=[]
    )
    muscle_group_four = StringField(
        'muscle_group_four', validators=[]
    )
    muscle_group_five = StringField(
        'muscle_group_five', validators=[]
    )
    description = StringField(
        'description', validators=[DataRequired()]
    )
