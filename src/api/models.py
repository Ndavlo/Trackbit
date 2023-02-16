from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__="user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    username = db.Column(db.String(), unique = True, nullable = True)
    name = db.Column(db.String(120), nullable=True)
    last_name = db.Column(db.String(120), nullable = True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    def serialize_info(self):
        rutinas = list(map(lambda r: r.serialize_name(), self.rutinas))
        return{
            "username":self.username,
            "name":self.name,
            "last name":self.last_name,
            "email":self.email,
            "rutinas": rutinas
        }

class BlockedTokens(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    token_id = db.Column(db.String(200), unique = True)


class Rutina (db.Model):
    __tablename__="rutina"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String)
    descripcion = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", backref="rutina")


    def __repr__(self):
        return f'<Rutina {self.id}>'

    def serialize (self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
        }
    def serialize_name (self):
        return {
            "name": self.nombre
        }

    def serialize2 (self):
        pasos = list(map(lambda r: r.serialize(), self.paso))
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "paso": pasos
        }

class Paso (db.Model):
    __tablename__="paso"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String)
    descripcion = db.Column(db.String)
    objetivo = db.Column(db.String)
    instrucciones = db.Column(db.String)
    contenido = db.Column(db.String)
    periodicidad = db.Column(db.String)
    inicio = db.Column(db.DateTime)
    terminacion = db.Column(db.DateTime)
    completada = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User")
    rutina_id = db.Column(db.Integer, db.ForeignKey("rutina.id"))
    rutina = db.relationship("Rutina", backref='paso', lazy=True)

    def __repr__(self):
        return f'<Paso {self.nombre}>'
    
    def serialize(self):
        return{
        "id": self.id,
        "nombre": self.nombre,
        "descripcion": self.descripcion,
        "objetivo": self.objetivo,
        "instrucciones": self.instrucciones,
        "contenido": self.contenido,
        "periodicidad": self.periodicidad,
        "inicio": self.inicio,
        "terminacion": self.terminacion,
        "completada": self.completada,
        "rutina": self.rutina.serialize(),
        "user": self.user.serialize()
        ## No lleva el user y rutina?
        }

class Periodicidad(db.Model):
    __tablename__="periodicidad"
    id = db.Column(db.Integer, primary_key=True)
    paso = db.relationship("Paso")
    ## fecha inicio
    ## hora en la que se va a realizar
    meta = db.Column(db.Integer) # Cuantas veces? Ej. 5
    temporalidad = db.Column(db.String) # Veces o minutos
    periodo = db.Column(db.Integer)  # Al dia, a la semana, al mes.
    repeticion = db.Column(db.String) # Todos los dias? Tres dias? Cada mes? 