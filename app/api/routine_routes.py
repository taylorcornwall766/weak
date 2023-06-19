from flask import Blueprint, request
from app.models.routines import Routine
from app.models.db import db
from app.forms.routine_form import RoutineForm
from flask_login import login_required, current_user

routine_routes = Blueprint("routine", __name__)

@routine_routes.route("")
def get_all_routines():
    routines = Routine.query.all()
    res = [routine.to_dict() for routine in routines]
    return {"routines": res}

@routine_routes.route("/new", methods=["POST"])
@login_required
def post_routine():
    """post a routine and it will be returned"""
    form = RoutineForm()
    user_id = current_user.id
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_routine = Routine(
            author_id = int(user_id),
            name = form.data["name"],
            description = form.data["description"],
            muscle_group_one = form.data["muscle_group_one"],
            muscle_group_two = form.data["muscle_group_two"],
            muscle_group_three = form.data["muscle_group_three"],
            muscle_group_four = form.data["muscle_group_four"],
            muscle_group_five = form.data["muscle_group_five"]
        )
        db.session.add(new_routine)
        db.session.commit()
        return new_routine.to_dict()
    else:
        return form.errors, 400

@routine_routes.route("/<int:routine_id>/delete", methods=["DELETE"])
@login_required
def delete_routine(routine_id):
    routine_to_delete = Routine.query.get(routine_id)
    if routine_to_delete is None:
        return {'errors': 'routine not found'}, 404
    routine_dict = routine_to_delete.to_dict()
    if routine_dict["author"]["id"] is not int(current_user.id):
        return {'errors': 'you can only delete routines you have posted!'}, 401

    db.session.delete(routine_to_delete)
    db.session.commit()
    return {'message': 'routine deleted'}
