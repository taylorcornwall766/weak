from flask import Blueprint, request
from app.models.workouts import Workout
from app.models.workout_exercise import WorkoutExercise
from app.models.db import db
from app.forms.workout_exercise_form import WorkoutExerciseForm
# forms
from flask_login import login_required, current_user
from datetime import datetime

workout_routes = Blueprint("workout", __name__)


@workout_routes.route("/current")
@login_required
def get_current_users_workouts():
    current_user_id = int(current_user.id)
    usersWorkouts = Workout.query.filter_by(author_id=current_user_id).all()
    res = [workout.to_dict() for workout in usersWorkouts]
    return {"workouts": res}

@workout_routes.route("/new", methods=["POST"])
@login_required
def post_workout():
    current_user_id = int(current_user.id)
    new_workout = Workout(
        author_id = current_user_id
    )
    db.session.add(new_workout)
    db.session.commit()
    return new_workout.to_dict()

@workout_routes.route("/<int:workout_id>/delete", methods=["DELETE"])
@login_required
def delete_workout(workout_id):
    workout_to_delete = Workout.query.get(workout_id)
    if workout_to_delete is None:
        return {'errors':'workout not found'}, 404
    if workout_to_delete.author_id is not int(current_user.id):
        return {'errors': 'you can only delete workouts you have created!'}, 401
    db.session.delete(workout_to_delete)
    db.session.commit()
    return {'message': 'workout deleted'}

@workout_routes.route("/<int:workout_id>/complete", methods=["PUT"])
@login_required
def complete_workout(workout_id):
    workout_to_complete = Workout.query.get(workout_id)
    if workout_to_complete is None:
        return {'errors':'workout not found'}, 404
    if workout_to_complete.author_id is not int(current_user.id):
        return {'errors': 'you can only complete workouts you have created!'}, 401
    workout_to_complete.ended_at = datetime.utcnow()
    db.session.commit()
    return {'message': 'workout completed',
            'workout': workout_to_complete.to_dict()
            }
# workout exercise routes

@workout_routes.route("/<int:workout_id>/exercises/new", methods=["POST"])
@login_required
def post_workout_exercise(workout_id):
    workout = Workout.query.get(workout_id)
    if workout is None:
        return {'errors':'workout not found'}, 404
    if workout.author_id is not int(current_user.id):
        return {'errors': 'you can only add exercises to workouts you have created!'}, 401
    form = WorkoutExerciseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_workout_exercise = WorkoutExercise(
            workout_id = workout_id,
            exercise_id = form.data["exercise_id"],
            weight = form.data["weight"],
            reps = form.data["reps"]
        )
        db.session.add(new_workout_exercise)
        db.session.commit()
        return {'message': 'exercise added to workout'}
    else:
        return form.errors, 400

@workout_routes.route("/<int:workout_id>/exercises/<int:workout_exercise_id>/delete", methods=["DELETE"])
@login_required
def delete_workout_exercise(workout_id, workout_exercise_id):
    workout = Workout.query.get(workout_id)
    if workout is None:
        return {'errors':'workout not found'}, 404
    if workout.author_id is not int(current_user.id):
        return {'errors': 'you can only delete exercises from workouts you have created!'}, 401
    exercise_to_delete = WorkoutExercise.query.get(workout_exercise_id)
    if exercise_to_delete is None:
        return {'errors': 'exercise not found'}, 404
    db.session.delete(exercise_to_delete)
    db.session.commit()
    return {'message': 'workout exercise deleted'}
