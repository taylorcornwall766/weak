"""empty message

Revision ID: 00d9b470f1b1
Revises: 
Create Date: 2023-07-14 13:44:00.316542

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '00d9b470f1b1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('createdAt', sa.Date(), nullable=True),
    sa.Column('first_name', sa.String(length=25), nullable=False),
    sa.Column('last_name', sa.String(length=25), nullable=False),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('private', sa.Boolean(), nullable=False),
    sa.Column('isWorkingOut', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('primary_muscle', sa.String(length=50), nullable=False),
    sa.Column('secondary_muscle', sa.String(length=50), nullable=True),
    sa.Column('tertiary_muscle', sa.String(length=50), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('start_photo', sa.String(length=1000), nullable=True),
    sa.Column('end_photo', sa.String(length=1000), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('routines',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('muscle_group_one', sa.String(length=50), nullable=False),
    sa.Column('muscle_group_two', sa.String(length=50), nullable=True),
    sa.Column('muscle_group_three', sa.String(length=50), nullable=True),
    sa.Column('muscle_group_four', sa.String(length=50), nullable=True),
    sa.Column('muscle_group_five', sa.String(length=50), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('started_at', sa.DateTime(), nullable=False),
    sa.Column('ended_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('routine_exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('routine_id', sa.Integer(), nullable=False),
    sa.Column('exercise_id', sa.Integer(), nullable=False),
    sa.Column('sets', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], ),
    sa.ForeignKeyConstraint(['routine_id'], ['routines.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout_exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=False),
    sa.Column('exercise_id', sa.Integer(), nullable=False),
    sa.Column('weight', sa.Integer(), nullable=False),
    sa.Column('reps', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], ),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('workout_exercises')
    op.drop_table('routine_exercises')
    op.drop_table('workouts')
    op.drop_table('routines')
    op.drop_table('exercises')
    op.drop_table('users')
    # ### end Alembic commands ###