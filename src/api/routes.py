"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rutina
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
    response_body = list(map(lambda r: r.serialize(), rutinas))
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

@api.route('/<rutina_id>/nuevo_paso')
@jwt_required()
def crear_paso():
    current_user_id = get_jwt_identity()