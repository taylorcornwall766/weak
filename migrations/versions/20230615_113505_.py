"""empty message

Revision ID: 59989aac88c9
Revises:
Create Date: 2023-06-15 11:35:05.722629

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '59989aac88c9'
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
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
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
    if environment == "production":
        op.execute(f"ALTER TABLE exercises SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('exercises')
    op.drop_table('users')
    # ### end Alembic commands ###