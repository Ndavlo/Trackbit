"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rutina, Paso
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import timedelta
from firebase_admin import storage

import tempfile

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
    print(rutina_id)
    current_user_id = get_jwt_identity()
    nombre = request.json.get('nombre')
    descripcion = request.json.get('descripcion')
    objetivo = request.json.get('objetivo')
    instrucciones = request.json.get('instrucciones')
    contenido = request.json.get('contenido')
    periodicidad = request.json.get('periodicidad')
    inicio = request.json.get('inicio')
    terminacion = request.json.get('terminacion')
    nuevo_paso = Paso(nombre=nombre, user_id=current_user_id,  rutina_id=rutina_id, descripcion=descripcion, objetivo=objetivo, instrucciones=instrucciones, contenido=contenido, periodicidad=periodicidad, inicio=inicio, terminacion=terminacion)
    db.session.add(nuevo_paso)
    db.session.commit()
    return jsonify({'msg': "Paso agregado!"})


###Periodicidad

#### Ruta para acceder a la informacion del perfil
@api.route('/user')
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    bucket = storage.bucket(name = 'geeks-6c663.appspot.com')
    resourse = bucket.blob(user.profile_pic)
    profile_pic_url = resourse.generate_signed_url(version='v4', expiration = timedelta(minutes=10), method = 'GET')

    response_data = user.serialize()
    response_data['profile pic'] = profile_pic_url
    return jsonify(response_data), 200


@api.route('/uploadpic', methods = ['POST'])
@jwt_required()
def upload_pic():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    file = request.files['file']
    #Extract extension file
    extension = file.filename.split('.')[1]
    temp = tempfile.NamedTemporaryFile(delete=False)
    file.save(temp)

    bucket = storage.bucket(name = 'geeks-6c663.appspot.com')

    filename = f'pics/{str(user_id)}.{extension}'

    resource = bucket.blob(filename)

    resource.upload_from_filename(temp.name, content_type = f'image/{extension}')

    user.profile_pic = filename

    db.session.add(user)
    db.session.commit()

    return jsonify({'msg':'image uploaded'}), 200
   



