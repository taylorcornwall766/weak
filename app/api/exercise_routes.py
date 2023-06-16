from flask import Blueprint, jsonify, session, request
from app.models.exercises import Exercise
from app.models.db import db
from app.forms.exercise_form import ExerciseForm
from app.forms.edit_exercise_form import ExerciseEditForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

exercise_routes = Blueprint("exercise", __name__)

# import request from flask
# request.get_json()

@exercise_routes.route("/<int:exercise_id>/edit", methods=['PUT'])
@login_required
def edit_exercise(exercise_id):
    exercise_to_edit = Exercise.query.get(exercise_id)
    if exercise_to_edit is None:
        return {'errors': 'exercise cannot be found'}
    exercise_dict = exercise_to_edit.to_dict()
    if exercise_dict["authorId"] is not int(current_user.id):
        return {'errors': 'you can only edit exercises you have posted!'}
    form = ExerciseEditForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        exercise_to_edit.description = form.data["description"]
        exercise_to_edit.primary_muscle = form.data["primary_muscle"]
        exercise_to_edit.secondary_muscle = form.data["secondary_muscle"]
        exercise_to_edit.tertiary_muscle = form.data["tertiary_muscle"]
        exercise_to_edit.start_photo = form.data["start_photo"]
        exercise_to_edit.end_photo = form.data["end_photo"]
        db.session.commit()
        edited_exercise = exercise_to_edit.to_dict()
        return edited_exercise
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}


@exercise_routes.route("")
def get_all_exercises():
    """get all of the exercises"""
    all_exercises = Exercise.query.order_by(Exercise.primary_muscle.asc(), Exercise.name.asc()).all()

    res = [exercise.to_dict() for exercise in all_exercises]
    return {"exercises": res}

@exercise_routes.route("/<int:exercise_id>/delete", methods=['DELETE'])
@login_required
def delete_exercise(exercise_id):
    exercise_to_delete = Exercise.query.get(exercise_id)
    if exercise_to_delete is None:
        return {'errors': 'exercise cannot be found'}
    # revise
    exercise_dict = exercise_to_delete.to_dict()
    if exercise_dict["authorId"] is not int(current_user.id):
        return {'errors': 'you can only delete exercises you have posted!'}

    db.session.delete(exercise_to_delete)
    db.session.commit()
    return {'message': 'exercise deleted'}


@exercise_routes.route("/new", methods=["POST"])
@login_required
def post_exercise():
    """post an exercise and get it back"""
    form = ExerciseForm()
    user_id = current_user.id
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_exercise = Exercise(
            author_id = int(user_id),
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
        # change this to just return form.errors, statuscode
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
