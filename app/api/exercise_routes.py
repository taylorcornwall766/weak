from flask import Blueprint, jsonify, session, request
from app.models.exercises import Exercise
from app.models.db import db
from app.forms.exercise_form import ExerciseForm
from flask_login import login_required, current_user, login_user, logout
from app.api.auth_routes import validation_errors_to_error_messages

exercise_routes = Blueprint("exercise", __name__)

@exercise_routes("")
def get_all_exercises():
    """get all of the exercises"""
    all_exercises = Exercise.query.all()

    res = [exercise.to_dict() for exercise in all_exercises]
    return {"exercises": res}

@exercise_routes("/new", methods=["POST"])
@login_required
def post_exercise():
    """post an exercise and get it back"""
    form = ExerciseForm()
    user_id = current_user.id
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_exercise = Exercise(
            authorId = int(user_id),
            name = form.data["name"],
            description = form.data["description"],
            primary_muscle = form.data["primary_muscle"],
            secondary_muscle = form.data["secondary_muscle"],
            tertiary_muscle = form.data["tertiary_muscle"],
            start_photo = form.data["start_photo"],
            end_photo = form.data["end_photo"],
        )
        # fields
        # new exercise()
        db.session.add(new_exercise)
        db.session.commit()
        return new_exercise.to_dict()
        # add + commit
        # return new exericse.todict()
    # else
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
