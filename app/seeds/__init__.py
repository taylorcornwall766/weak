from flask.cli import AppGroup
from.routines import seed_routines, undo_routines
from .users import seed_users, undo_users
from .exercises import undo_exercises, seed_exercises
from.routine_exercises import undo_routine_exercises, seed_routine_exercises
from.workouts import seed_workouts, undo_workouts
from.workout_exercises import seed_workout_exercises, undo_workout_exercises
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_workout_exercises()
        undo_workouts()
        undo_routine_exercises()
        undo_routines()
        undo_exercises()
        undo_users()
    seed_users()
    seed_exercises()
    seed_routines()
    seed_routine_exercises()
    seed_workouts()
    seed_workout_exercises()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_workout_exercises()
    undo_workouts()
    undo_routine_exercises()
    undo_routines()
    undo_exercises()
    undo_users()
    # Add other undo functions here
