from flask_sqlalchemy import SQLAlchemy
from firebase_admin import storage
from datetime import timedelta

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(150))
    bio = db.Column(db.String(150))
    username = db.Column(db.String(), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    profile_pic = db.Column(db.String(500))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize_with_pic(self):
        bucket = storage.bucket(name = 'trackbit-4cb19.appspot.com')
        resource = bucket.blob(self.profile_pic)
        profile_pic_url = resource.generate_signed_url(version="v4", expiration =timedelta(minutes=10), method='GET')
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "title": self.title,
            "bio": self.bio,
            "profile_pic": profile_pic_url
            }
    
    #making model atributes subscriptable
    def __getitem__(self, key):
        return getattr(self, key)

    # make model atributes assignable
    def __setitem__(self, key, value):
        getattr(
            self, key
        )  # this will throw a AttributeError if the attribute does not exist
        setattr(self, key, value)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "title": self.title,
            "bio": self.bio,
            "profile_pic": self.profile_pic
        }

    def serialize_info(self):
        rutinas = list(map(lambda r: r.serialize_name(), self.rutinas))
        return {
            "username": self.username,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "title": self.title,
            "bio": self.bio,
            "rutinas": rutinas,
        }


class BlockedTokens(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token_id = db.Column(db.String(200), unique=True)


class Rutina(db.Model):
    __tablename__ = "rutina"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", backref="rutinas")

    __table_args__ = (db.UniqueConstraint("user_id", "name", name="user_rutina_uc"),)

    def __repr__(self):
        return f"<Rutina {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }

    def serialize_name(self):
        return {"name": self.name}

    def serialize_with_steps(self):
        pasos = list(map(lambda r: r.serialize_step(), self.paso))
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "steps": pasos,
        }


class Paso(db.Model):
    __tablename__ = "paso"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String)
    descripcion = db.Column(db.String)
    objetivo = db.Column(db.String)
    instrucciones = db.Column(db.String)
    contenido = db.Column(db.String)
    inicio = db.Column(db.Date)
    terminacion = db.Column(db.Date)
    meta = db.Column(db.Integer)  # Cuantas veces? Ej. 5
    temporalidad = db.Column(db.String)  # Veces o minutos
    periodo = db.Column(db.String)  # Al dia, a la semana, al mes.
    repeticion = db.Column(db.String)  # Todos los dias? Tres dias? Cada mes?
    completada = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user = db.relationship("User")
    rutina_id = db.Column(db.Integer, db.ForeignKey("rutina.id"), nullable=False)
    rutina = db.relationship("Rutina", backref="paso", lazy=True)
    time = db.Column(db.Time)

    def __repr__(self):
        return f"<Paso {self.nombre}>"

    def serialize_step(self):
        return {
            "id": self.id,
            "name": self.nombre,
        }

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            # "descripcion": self.descripcion,
            # "objetivo": self.objetivo,
            # "instrucciones": self.instrucciones,
            # "contenido": self.contenido,
            # "meta": self.meta,
            "temporalidad": self.temporalidad,
            "periodo": self.periodo,
            "repeticion": self.repeticion,
            "inicio": self.inicio,
            "terminacion": self.terminacion,
            # "completada": self.completada,
            # "rutina": self.rutina.serialize(),
            # "user": self.user.serialize()
        }


class Reportes(db.Model):
    __tablename__ = "reportes"
    id = db.Column(db.Integer, primary_key=True)
    user = db.relationship("User")
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    paso = db.relationship("Paso")
    step_id = db.Column(db.Integer, db.ForeignKey("paso.id"))
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    __table_args__ = (db.UniqueConstraint("step_id", "date", name="step_id_date_uc"),)

    # def get_month(self):
    #     return self.report_time.month

    # def get_year(self):
    #     return self.report_time.get_year

    # def get_day(self):

    def __repr__(self):
        return f"<Reportes {self.id}>"

    def serialize(self):
        return {
            "report_id": self.id,
            "step_id": self.step_id,
            "date": self.date.isoformat(),
            "time": self.time.isoformat(),
        }


class Habit(db.Model):
    __tablename__ = "habitos"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User")
    __table_args__ = (db.UniqueConstraint("user_id", "name", name="user_habit_uc"),)


class Newsletter_emails(db.Model):
    __tablename__ = "newsletter_emails"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f"<Newsletter_emails {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User")
    step_source = db.Column(db.Integer, db.ForeignKey("paso.id"))
    step = db.relationship("Paso")
    done = db.Column(
        db.Boolean,
    )
    scheduled_date = db.Column(db.Date)
    scheduled_time = db.Column(db.Time)

    def serialize(self):
        return {
            "step_source": self.step_source,
            "done": self.done,
            "scheduled_date": str(self.scheduled_date),
            "scheduled_time": str(self.scheduled_time),
            "habit_id": self.step.rutina_id,
        }
