"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)
crypto = Bcrypt(app)

@api.route('/signup', methods=['POST'])
def create_user():
    email=request.json.get('email')
    password=request.json.get('password')
    password=crypto.generate_password_hash(password, rounds=None).decode('utf8')
    new_user=User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': "Usuario creado"})

@api.route('/login', methods=['POST'])
def user_login():
    email=request.json.get('email')
    password=request.json.get('password')
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'msg' :'Login Failed'}), 401
    if not crypto.check_password_hash(user.password, password):
        return jsonify({'msg' :'Login Failed'}), 401
    
    token=create_access_token(identity=user.id)
    refresh_token=create_refresh_token(identity=user.id)
    return jsonify({"access_token":token, "refresh_token": refresh_token})

# Ruta Rutinas
#GET Y POST de las rutinas y pasos
#Crear rutina

@api.route('/rutinas', methods=['GET'])
def mostrar_rutinas():
    return


@api.route('/nueva_rutina', methods=['POST'])
def crear_rutina():
    ## JWT Requeried debe ser una ruta protegida, solo puede acceder usuarios registrados.
    ## JWT Identity
    nombre = request.json.get('nombre')
    descripcion = request.json.get('descripcion')
    nueva_rutina = Rutina(nombre=nombre, descripcion=descripcion)
    db.session.add(nueva_rutina)
    db.session.commit()
    return jsonify({'msg': "Rutina creada!"})

