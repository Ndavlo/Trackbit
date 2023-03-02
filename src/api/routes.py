"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rutina, Paso
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import date, time, datetime, timezone, timedelta
from .sendrecovery import recovery_password_email
import os

api = Blueprint('api', __name__)
app = Flask(__name__)
crypto = Bcrypt(app)

@api.route('/signup', methods=['POST'])
def create_user():
    email=request.json.get('email')
    password=request.json.get('password')
    password=crypto.generate_password_hash(password, rounds=12).decode('utf8')
    new_user=User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg':"email already in use"}), 500
    return jsonify({'msg': "Usuario creado"}), 200

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
@jwt_required()
def mostrar_rutinas():
    user = get_jwt_identity()
    rutinas = Rutina.query.filter_by(user_id=user).all()
    response_body = list(map(lambda r: r.serialize2(), rutinas))
    return jsonify(response_body),200


@api.route('/nueva_rutina', methods=['POST'])
@jwt_required()
def crear_rutina():
    current_user_id = get_jwt_identity()
    nombre = request.json.get('nombre')
    descripcion = request.json.get('descripcion')
    nueva_rutina = Rutina(nombre=nombre, descripcion=descripcion, user_id=current_user_id)
    db.session.add(nueva_rutina)
    db.session.commit()
    return jsonify({'msg': "Rutina creada!"})

@api.route('/rutina/<rutina_id>/nuevo_paso', methods=['POST'])
@jwt_required()
def crear_paso(rutina_id):
### buscar rutina, si existe continuar, sino, error
    rutina = Rutina.query.get(rutina_id) ##NO ES rutina.id???
    if rutina is None:
        return jsonify({'msg': "La rutina no existe"}), 404
    current_user_id = get_jwt_identity()
    nombre = request.json.get('nombre')
    descripcion = request.json.get('descripcion')
    objetivo = request.json.get('objetivo')
    instrucciones = request.json.get('instrucciones')
    contenido = request.json.get('contenido')
    meta = request.json.get('meta')
    temporalidad = request.json.get('temporalidad')
    periodo = request.json.get('periodo')
    repeticion = request.json.get('repeticion')
    inicio = request.json.get('inicio')
    terminacion = request.json.get('terminacion')
    nuevo_paso = Paso(nombre=nombre, user_id=current_user_id, meta=meta, temporalidad=temporalidad, periodo=periodo, repeticion=repeticion,  rutina_id=rutina_id, descripcion=descripcion, objetivo=objetivo, instrucciones=instrucciones, contenido=contenido, inicio=inicio, terminacion=terminacion)
    db.session.add(nuevo_paso)
    db.session.commit()
    return jsonify({'msg': "Paso agregado!"})


#### Ruta para acceder a la informacion del perfil
@api.route('/user')
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    print (user.__repr__)
    return jsonify(user.serialize_info()), 200


### Ruta para solicitar la recuperacion de contrasena
@api.route('/recoverypassword',methods=["POST"])  ##24:45
def recovery_password():
    email=request.json.get("email")
    user=User.query.filter(User.email==email).first()
    #Existe o no ese usuario con ese correo
    if user is None:
        return jsonify({"msg": "Correo no valido"}), 403
    # Si existe, continua
    recovery_token=create_access_token(identity=user.id, expires_delta=timedelta(minutes=5),additional_claims ={"recovery":"true"})
    recovery_URL=os.getenv('FRONTEND_URL')+"?token=" + recovery_token
    if recovery_password_email(user_email=user.email, url_recovery=recovery_URL):
        return jsonify({"msg": "Solcitud enviada con exito"})
    else:
        return jsonify({"msg": "Error en la solicitud"}, 500)

@api.route('/resetpassword', methods=['POST'])
@jwt_required()
def reset_password():
    new_password=request.json.get('password')
    user_id=get_jwt_identity()
    user=User.query.get(user_id)
    user.password=crypto.generate_password_hash(new_password).decode("utf-8")
    
    