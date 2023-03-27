"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import tempfile
from .sendrecovery import recovery_password_email
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import (
    db,
    User,
    Rutina,
    Paso,
    BlockedTokens,
    Newsletter_emails,
    Reportes,
    Event,
)
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jti,
)
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import date, time, datetime, timezone, timedelta
from firebase_admin import storage
from sqlalchemy import func
from firebase_admin import storage
import tempfile

api = Blueprint("api", __name__)
app = Flask(__name__)
crypto = Bcrypt(app)


def calculate_event_for_step (step_id, user_id):
    #delete previusly created events for given step id
    events = Event.query.filter_by(step_source = step_id).delete()
    db.session.commit()
    
    step = Paso.query.get(step_id)
    
    print(step.nombre)
    start_date = step.inicio
    match step.periodo[0]:
        case "D":
            # print('It is Day')
            while start_date <= step.terminacion:
                db.session.add(
                    Event(
                        user_id=user_id,
                        step_source=step.id,
                        scheduled_date=start_date,
                        scheduled_time=step.time,
                        done=False,
                    )
                )
                start_date = start_date + timedelta(days=int(step.repeticion))
            db.session.commit()

        case "W":
            print("It is Week")
            print(step.periodo)
            start_date_weekday = step.inicio.weekday()
            print(f"s_d_w {start_date_weekday}")

            # convert from notation W####### and start date to the first days of the step
            w_days = step.periodo
            w_days = list(
                filter(
                    lambda d: d != None,
                    [i - 1 if d == "1" else None for i, d in enumerate(w_days)],
                )
            )  # DON'T ASK!!
            w_days = list(
                map(
                    lambda d: d + 7 - start_date_weekday
                    if ((d - start_date_weekday) < 0)
                    else d - start_date_weekday,
                    w_days,
                )
            )
            w_days = list(map(lambda d: start_date + timedelta(days=d), w_days))
            print(f"w days: {w_days}")
            for d in w_days:
                while d < step.terminacion:
                    db.session.add(
                        Event(
                            user_id=user_id,
                            step_source=step.id,
                            scheduled_date=d,
                            scheduled_time=step.time,
                            done=False,
                        )
                    )
                    d += timedelta(weeks=1)
            db.session.commit()

        case "M":
            print("It is Month")

        case "Y":
            print("It is Year")

    pass


@api.route("/signup", methods=["POST"])
def create_user():
    email = request.json.get("email")
    name = request.json.get("name")
    last_name = request.json.get("last_name")
    password = request.json.get("password")
    password = crypto.generate_password_hash(password, rounds=12).decode("utf8")
    new_user = User(
        email=email,
        password=password,
        name=name,
        last_name=last_name,
        username=email,
        is_active=True,
    )
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"msg": "Sign Up Sucessfull"}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg": "email already in use"}), 400


@api.route("/login", methods=["POST"])
def user_login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "Login Failed"}), 401
    if not crypto.check_password_hash(user.password, password):
        return jsonify({"msg": "Login Failed"}), 401

    refresh_token = create_refresh_token(identity=user.id)
    # jti = refresh_token.get_jti
    additional_claims = {"r_jti": get_jti(refresh_token)}
    token = create_access_token(identity=user.id, additional_claims=additional_claims)
    return jsonify({"access_token": token, "refresh_token": refresh_token})


@api.route("/rutinas", methods=["GET"])
@jwt_required()
def mostrar_rutinas():
    user = get_jwt_identity()
    rutinas = Rutina.query.filter_by(user_id=user).all()
    response_body = list(map(lambda r: r.serialize_with_steps(), rutinas))
    return jsonify(response_body), 200

@api.route('/habit', methods= ['PATCH'])
@jwt_required()
def patch_habit():
    user_id = get_jwt_identity()
    habit_id = request.json.get('habit_id')
    habit = Rutina.query.filter_by(user_id=user_id, id = habit_id).first()
    body = request.get_json()
    msg = ""
    for key, value in body.items():
        if key == 'habit_id': continue
        try:
            habit[key] = value
            print(f'Habit "{key}" field updated to : {value}')
        except AttributeError:
            print('Habit does not have field "' + key + '", it will not be updated')
    db.session.add(habit)
    db.session.commit()
    return jsonify({"msg": "ok"}), 200

    



    return jsonify({'msg':"habit updated"}), 200


@api.route("/rutina", methods=["POST"])
@jwt_required()
def crear_rutina():
    user_id = get_jwt_identity()
    name = request.json.get("name")
    description = request.json.get("description")
    steps = request.json.get("steps")
    nueva_rutina = Rutina(name=name, description=description, user_id=user_id)
    db.session.add(nueva_rutina)
    try:
        db.session.commit()
    except Exception as inst:
        # TODO check if there is a rutine with the same name, handle exception
        return jsonify({"msg": "There is a rutine with the same name"}), 409

    
    for step in steps:
        step = Paso(
                rutina_id=nueva_rutina.id,
                nombre=step["name"],
                descripcion=step["description"],
                contenido=step["content"],
                inicio=step["startDate"],
                terminacion=step["endDate"],
                periodo=step["interval"],
                repeticion=step["repetition"],
                user_id=user_id,
                time=step["time"],
            )
        db.session.add(step)  
        db.session.commit()
        calculate_event_for_step(step_id=step.id, user_id=user_id)    
        

    return jsonify({"msg": "Rutina creada!", "id": nueva_rutina.id})


@api.route("/rutina/<int:rutina_id>", methods=["DELETE"])
@jwt_required()
def eliminar_rutina(rutina_id):
    user_id = get_jwt_identity()
    rutina = Rutina.query.filter_by(id=rutina_id, user_id=user_id).first()
    if not rutina:
        return jsonify({"msg": "No existe esa rutina"}), 404
    db.session.delete(rutina)
    db.session.commit()
    return jsonify({"msg": "Rutina eliminada correctamente"})


@api.route("/rutina/paso", methods=["POST"])
@jwt_required()
def crear_paso(rutina_id):
    ### buscar rutina, si existe continuar, sino, error
    rutina = Rutina.query.get(rutina_id)  ##NO ES rutina.id???
    if rutina is None:
        return jsonify({"msg": "La rutina no existe"}), 404
    current_user_id = get_jwt_identity()
    nombre = request.json.get("nombre")
    descripcion = request.json.get("descripcion")
    objetivo = request.json.get("objetivo")
    instrucciones = request.json.get("instrucciones")
    contenido = request.json.get("contenido")
    meta = request.json.get("meta")
    temporalidad = request.json.get("temporalidad")
    periodo = request.json.get("periodo")
    repeticion = request.json.get("repeticion")
    inicio = request.json.get("inicio")
    terminacion = request.json.get("terminacion")
    nuevo_paso = Paso(
        nombre=nombre,
        user_id=current_user_id,
        meta=meta,
        temporalidad=temporalidad,
        periodo=periodo,
        repeticion=repeticion,
        rutina_id=rutina_id,
        descripcion=descripcion,
        objetivo=objetivo,
        instrucciones=instrucciones,
        contenido=contenido,
        inicio=inicio,
        terminacion=terminacion,
    )
    db.session.add(nuevo_paso)
    db.session.commit()
    return jsonify({"msg": "Paso agregado!"})


#### Ruta para acceder a la informacion del perfil
@api.route("/user")
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    print(user.__repr__)
    response_data = user.serialize_info()
    print(response_data)
    bucket = storage.bucket(name="trackbit-4cb19.appspot.com")
    profile_pic = user.profile_pic
    resource = bucket.blob(profile_pic)
    profile_pic_url = resource.generate_signed_url(version="v4", expiration=timedelta(minutes=10), method="GET")
    response_data["profile_pic"] = profile_pic_url
    return jsonify(response_data)

#### Ruta para cambiear la informacion del usuario
@api.route("/user", methods=["PATCH"])
@jwt_required()
def patch_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    body = request.get_json()
    msg = ""
    for key, value in body.items():
        if key == "email":
            print("Email cannot be change, it will not be updated")
            continue
        if key == "password":
            print("Password cannot be change with this method, it will not be updated")
            continue
        try:
            user[key] = value
            print('Updating user field "' + key + '" to :' + value)
        except AttributeError:
            print('User does not have field "' + key + '", it will not be updated')
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "ok"}), 200

@api.route('/setprofilepic', methods=['POST'])
@jwt_required()
def upload_pic():
    user_id = get_jwt_identity()
    file=request.files['file']
    extension=file.filename.split('.')[1]
    temp=tempfile.NamedTemporaryFile(delete=False)
    file.save(temp)
    bucket=storage.bucket(name="trackbit-4cb19.appspot.com")
    filename="profile_pics/"+str(user_id)+"."+extension
    resource = bucket.blob(filename)
    resource.upload_from_filename(temp.name, content_type="image/"+extension)
    user = User.query.get(user_id)
    user.profile_pic=filename
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "se subio la imagen"})



@api.route("/refresh")
@jwt_required(refresh=True)
def refresh_token():
    user_identity = get_jwt_identity()
    # add used refresh token to blocklist
    db.session.add(BlockedTokens(token_id=get_jwt()["jti"]))
    db.session.commit()
    refresh_token = create_refresh_token(identity=user_identity)
    additional_claims = {"r_jti": get_jti(refresh_token)}
    token = create_access_token(
        identity=user_identity, additional_claims=additional_claims
    )
    return jsonify({"access_token": token, "refresh_token": refresh_token}), 200


@api.route("/logout")
@jwt_required()
def logout():
    access_token_blocked = BlockedTokens(token_id=get_jwt()["jti"])
    refresh_token_blocked = BlockedTokens(token_id=get_jwt()["r_jti"])
    db.session.add(access_token_blocked)
    db.session.add(refresh_token_blocked)
    db.session.commit()
    return jsonify({"msg": "User logged out"})


### Ruta para solicitar la recuperacion de contrasena
@api.route("/recoverypassword", methods=["POST"])  ##24:45
def recovery_password():
    email = request.json.get("email")
    user = User.query.filter(User.email == email).first()
    # Existe o no ese usuario con ese correo
    if user is None:
        return jsonify({"msg": "Correo no valido"}), 403
    # Si existe, continua
    recovery_token = create_access_token(
        identity=user.id,
        expires_delta=timedelta(minutes=5),
        additional_claims={"recovery": "true"},
    )
    recovery_URL = os.getenv("FRONTEND_URL") + "?token=" + recovery_token
    if recovery_password_email(user_email=user.email, url_recovery=recovery_URL):
        return jsonify({"msg": "Solcitud enviada con exito"})
    else:
        return jsonify({"msg": "Error en la solicitud"}, 500)


@api.route("/resetpassword", methods=["POST"])
@jwt_required()
def reset_password():
    new_password = request.json.get("password")
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    user.password = crypto.generate_password_hash(new_password).decode("utf-8")


@api.route("/newslettersub", methods=["POST"])
def subscribe_newsletter():
    email = request.json.get("email")
    new_subscriber = Newsletter_emails(email=email)
    print(new_subscriber.serialize())
    db.session.add(new_subscriber)
    try:
        db.session.commit()
        return jsonify({"msg": "You are now subscribed!"}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg": "You are already subscribed"}), 400


@api.route("/report", methods=["POST"])
@jwt_required()
def report():
    user_id = get_jwt_identity()
    step_id = request.json.get("stepId")
    time = request.json.get("time")
    if time == "NOW":
        time = datetime.now()
    else:
        time = datetime.strptime(time, "%Y-%m-%dT%H:%M:%S.%f%z")
    reporte = Reportes(
        user_id=user_id, step_id=step_id, time=time.time(), date=time.date()
    )
    db.session.add(reporte)
    db.session.commit()
    return (jsonify({"msg": "report registered"})), 200


@api.route("/report")
@jwt_required()
def get_reports():
    user_id = get_jwt_identity()

    dates = db.session.query(Reportes.date).group_by(Reportes.date).all()
    date_collection = []
    for date in dates:
        date_collection.append(
            {
                "date": date[0].isoformat(),
                "reports": [
                    reporte.serialize()
                    for reporte in Reportes.query.filter_by(
                        user_id=user_id, date=date[0]
                    ).all()
                ],
            }
        )
    return jsonify(date_collection), 200


@api.route("/steps")
@jwt_required()
def get_steps():
    user_id = get_jwt_identity()
    pasos = Paso.query.filter_by(user_id=user_id).all()
    pasos = [paso.serialize() for paso in pasos]
    return jsonify(pasos), 200


@api.route("/events", methods=["POST"])
@jwt_required()
def get_events():
    user_id = get_jwt_identity()
    beginning_date = date.fromisoformat(request.json.get("beginning_date"))
    ending_date = date.fromisoformat(request.json.get("ending_date"))
    dates = db.session.query(Event.scheduled_date).group_by(Event.scheduled_date).all()
    date_collection = [
        (
            {
                "date": d[0].isoformat(),
                "events": [
                    event.serialize()
                    for event in Event.query.filter_by(
                        user_id=user_id, scheduled_date=d[0]
                    ).all()
                ],
            }
        )
        for d in dates
    ]

    return jsonify(date_collection), 200


@api.route('/task', methods=['PATCH'])
@jwt_required()
def set_task_done():
    task_id = request.json.get('task_id')
    task = Event.query.get(task_id)
    task.done = request.json.get('value')
    db.session.add(task)
    db.session.commit()
    return jsonify({'msg': 'task updated'}), 200
