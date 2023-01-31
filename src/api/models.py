from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Rutina (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String)
    descripcion = db.Column(db.String)
    user.id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.Relationship("User")
    # no tiene que tener columna de pasos????

    def __repr__(self):
        return f'<Rutina {self.nombre}>'

    def serialize (self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
        }

class Paso (db.Model):
    id = db.column(db.integer, primary_key=True)
    nombre = db.column(db.String)
    descripcion = db.column(db.String)
    objetivo = db.column(db.String)
    instrucciones = db.column(db.String)
    contenido = db.column(db.String)
    periodicidad = db.column(db.Strng)
    inicio = db.column(db.DateTime) #No se importa?
    terminacion = db.column(db.Datetime)
    completada = db.column(db.Boolean)
    user.id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.Relationship("User")
    rutina.id = db.Column(db.Integer, db.ForeignKey("rutina.id"))
    rutina = db.Relationship("Rutina")

    def __repr__(self):
        return f'<Paso {self.nombre}>'
    
    def serializar(self):
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