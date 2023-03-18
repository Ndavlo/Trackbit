import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  function submitSignUp (e){
    e.preventDefault();
    if (email !== "" && password !== "" && confirmedPassword !== "" && name !== "" && lastName !== ""){
      if (password === confirmedPassword) {
        actions?.signUp(email, password, name, lastName)
        .then(() => {
          actions?.login(email, password)
          .then(() => {
            navigate('/userprofile');
          })
          .catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        alert("Las contraseñas no coinciden");
      }
    } else {
      alert("Formulario incorrecto");
    }
  }

	return (
		<>

			<div className="container-fluid">
				<div className="row">
					<div className="loginFormCont col m-0">
							<form id="formLogin">
								<h1 id="loginHead">Registrate</h1>
								<div className="mb-3">
									<label htmlFor="name" className="form-label">Nombre</label>
									<input type="text" className="form-control text-dark" id="inputText" aria-describedby="name" onChange={(e) => setName(e.target.value)} />
								</div>
								<div className="mb-3">
									<label htmlFor="name" className="form-label">Apellido</label>
									<input type="text" className="form-control text-dark" id="inputText" aria-describedby="name" onChange={(e) => setLastName(e.target.value)} />
								</div>
								<div className="mb-3">
									<label htmlFor="inputEmail" className="form-label">Correo Electronico</label>
									<input type="emailsdf" className="form-control text-dark" id="inputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
								</div>
								<div className="mb-3">
									<label htmlFor="inputPassword" className="form-label">Contraseña</label>
									<input type="password" className="form-control text-dark" id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
								</div>
								<div className="mb-3">
									<label htmlFor="inputPassword" className="form-label">Confirmar Contraseña</label>
									<input type="password" className="form-control text-dark" id="inputPasswordConfirm" onChange={(e) => setConfirmedPassword(e.target.value)} />
								</div>
								<button type="submit" className="btn" onClick={(e)=>submitSignUp(e)}>Registro</button>
							</form>
					</div>

					<div className="col m-0 d-none d-sm-none d-md-none d-lg-block">
						<div className="loginImg"></div>
					</div>
				</div>
			</div>

		</>
	);
};