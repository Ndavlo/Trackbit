"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rutina, Paso, BlockedTokens, Newsletter_emails, Reportes
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt, get_jti
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import date, time, datetime, timezone, timedelta
from .sendrecovery import recovery_password_email
import os
from sqlalchemy import func

api = Blueprint('api', __name__)
app = Flask(__name__)
crypto = Bcrypt(app)

@api.route('/signup', methods=['POST'])
def create_user():
    email=request.json.get('email')
    name=request.json.get('name')
    last_name=request.json.get('last_name')
    password=request.json.get('password')
    password=crypto.generate_password_hash(password, rounds=12).decode('utf8')
    new_user=User(email=email, password=password, name=name, last_name=last_name,  username=email, is_active=True)
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({'msg':"Sign Up Sucessfull"}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg':"email already in use"}), 400

@api.route('/login', methods=['POST'])
def user_login():
    email=request.json.get('email')
    password=request.json.get('password')
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'msg' :'Login Failed'}), 401
    if not crypto.check_password_hash(user.password, password):
        return jsonify({'msg' :'Login Failed'}), 401
    
    refresh_token=create_refresh_token(identity=user.id)
    # jti = refresh_token.get_jti
    additional_claims = {'r_jti': get_jti(refresh_token)}
    token=create_access_token(identity=user.id, additional_claims = additional_claims)
    return jsonify({"access_token":token, "refresh_token": refresh_token})


@api.route('/rutinas', methods=['GET'])
@jwt_required()
def mostrar_rutinas():
    user = get_jwt_identity()
    rutinas = Rutina.query.filter_by(user_id=user).all()
    response_body = list(map(lambda r: r.serialize_with_steps(), rutinas))
    return jsonify(response_body),200


@api.route('/rutina', methods=['POST'])
@jwt_required()
def crear_rutina():
    user_id = get_jwt_identity()
    name = request.json.get('name')
    description = request.json.get('description')
    steps = request.json.get('steps')
   # print(steps)
    nueva_rutina = Rutina(name=name, description=description, user_id=user_id)
    db.session.add(nueva_rutina)
    try:
        db.session.commit()
    except Exception as inst:
        # TODO check if there is a rutine with the same name, handle exception
        return jsonify({'msg': 'There is a rutine with the same name'}), 409

    for step in steps:
        print(step)
        print(step['name'])
        db.session.add(#TODO parse the information to the correct data tipe or at least intialize the value with the right format
            Paso(
                rutina_id=nueva_rutina.id, 
                nombre = step['name'], 
                descripcion=step['description'], 
                contenido=step['content'], 
                inicio = step['startDate'], 
                terminacion=step['endDate'], 
                periodo=step['time'], 
                repeticion = step['repetition'],
                user_id = user_id 
                )
        )
    db.session.commit()
    
    return jsonify({'msg': "Rutina creada!", 'id': nueva_rutina.id})

@api.route('/rutina/paso', methods=['POST'])
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
    return jsonify(user.serialize_info())

#### Ruta para cambiear la informacion del usuario
@api.route('/user', methods = ['PATCH'])
@jwt_required()
def patch_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    body = request.get_json()
    msg = ''
    for key, value in body.items():
        if key == 'email': 
            print ("Email cannot be change, it will not be updated")
            continue
        if key == 'password': 
            print ("Password cannot be change with this method, it will not be updated")
            continue
        try:
            user[key] = value
            print ('Updating user field "'+key+'" to :'+value)
        except AttributeError:
            print ('User does not have field "'+key+'", it will not be updated')
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg':'ok'}), 200

@api.route('/uploadpic')
@jwt_required()
def upload_pic():
    user_id = get_jwt_identity()
    user = db.query.get(user_id)

@api.route('/refresh')
@jwt_required(refresh=True)
def refresh_token():
    user_identity = get_jwt_identity()
    #add used refresh token to blocklist
    db.session.add(BlockedTokens(token_id=get_jwt()["jti"]))
    db.session.commit()
    refresh_token=create_refresh_token(identity=user_identity)
    additional_claims = {'r_jti': get_jti(refresh_token)}
    token=create_access_token(identity=user_identity, additional_claims=additional_claims)
    return jsonify({"access_token":token, "refresh_token": refresh_token}), 200

@api.route('/logout')
@jwt_required()
def logout():
    access_token_blocked=BlockedTokens(token_id=get_jwt()['jti'])
    refresh_token_blocked=BlockedTokens(token_id=get_jwt()['r_jti'])
    db.session.add(access_token_blocked)
    db.session.add(refresh_token_blocked)
    db.session.commit()
    return jsonify({"msg":"User logged out"})



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


@api.route('/newslettersub', methods=['POST'])
def subscribe_newsletter():
    email=request.json.get('email')
    new_subscriber=Newsletter_emails(email=email)
    print(new_subscriber.serialize())
    db.session.add(new_subscriber)
    try:
        db.session.commit()
        return jsonify({'msg':"You are now subscribed!"}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg':"You are already subscribed"}), 400

@api.route('/report', methods = ['POST'])
@jwt_required()
def report():
    user_id = get_jwt_identity()
    step_id = request.json.get('stepId')
    time = request.json.get('time')
    if time == 'NOW':
        time = datetime.now()
    else:
        time = datetime.strptime(time, '%Y-%m-%dT%H:%M:%S.%f%z') 
    reporte = Reportes(user_id = user_id, step_id = step_id, time=time.time() , date = time.date())
    db.session.add(reporte)
    db.session.commit()
    return (jsonify({'msg':'report registered'})),200

@api.route('/report')
@jwt_required()
def get_reports():
    user_id = get_jwt_identity()

    dates = db.session.query(Reportes.date).group_by(Reportes.date).all()
    date_collection = []
    for date in dates:
        date_collection.append(
            {
                'date': date[0].isoformat(),
                'reports': [reporte.serialize() for reporte in Reportes.query.filter_by(user_id=user_id, date = date[0]).all()]
            }
        )
    return jsonify(date_collection), 200