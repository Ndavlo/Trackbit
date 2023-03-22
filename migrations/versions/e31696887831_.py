"""empty message

<<<<<<<< HEAD:migrations/versions/e31696887831_.py
Revision ID: e31696887831
Revises: 
Create Date: 2023-03-22 20:21:16.178850
========
Revision ID: 14c36013c704
Revises: 
Create Date: 2023-03-18 00:17:09.955763
>>>>>>>> Desarrollo:migrations/versions/14c36013c704_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/e31696887831_.py
revision = 'e31696887831'
========
revision = '14c36013c704'
>>>>>>>> Desarrollo:migrations/versions/14c36013c704_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('blocked_tokens',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('token_id', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token_id')
    )
    op.create_table('newsletter_emails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('title', sa.String(length=150), nullable=True),
    sa.Column('bio', sa.String(length=150), nullable=True),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('habitos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'name', name='user_habit_uc')
    )
    op.create_table('rutina',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'name', name='user_rutina_uc')
    )
    op.create_table('paso',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(), nullable=True),
    sa.Column('descripcion', sa.String(), nullable=True),
    sa.Column('objetivo', sa.String(), nullable=True),
    sa.Column('instrucciones', sa.String(), nullable=True),
    sa.Column('contenido', sa.String(), nullable=True),
    sa.Column('inicio', sa.DateTime(), nullable=True),
    sa.Column('terminacion', sa.DateTime(), nullable=True),
    sa.Column('meta', sa.Integer(), nullable=True),
    sa.Column('temporalidad', sa.String(), nullable=True),
    sa.Column('periodo', sa.String(), nullable=True),
    sa.Column('repeticion', sa.String(), nullable=True),
    sa.Column('completada', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('rutina_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['rutina_id'], ['rutina.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reportes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('step_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('time', sa.Time(), nullable=True),
    sa.ForeignKeyConstraint(['step_id'], ['paso.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reportes')
    op.drop_table('paso')
    op.drop_table('rutina')
    op.drop_table('habitos')
    op.drop_table('user')
    op.drop_table('newsletter_emails')
    op.drop_table('blocked_tokens')
    # ### end Alembic commands ###
