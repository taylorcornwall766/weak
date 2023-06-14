from flask import Blueprint, jsonify, session, request
from app.models.exercises import Exercises
from app.models.db import db
from app.forms import exercise_form
from flask_login import login_required, current_user, login_user, logout
from app.api.auth_routes import validation_errors_to_error_messages

exercise_routes = Blueprint("exercise", __name__)

@exercise_routes("")
def get_all_exercises():
    pass
