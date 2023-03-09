import React, { useState, useEffect, useContext } from "react";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	
	async function submitSignUp (e){
		e.preventDefault()
		console.log(email + password)
		let resp = await actions.signUp(email, password)
	}

	return (
<>

<div className="container-fluid">
	<div className="row">
		<div className="loginFormCont col m-0">
				<form id="formLogin">
					<h1 id="loginHead">Registrate</h1>
					<div className="mb-3">
						<label htmlFor="inputEmail" className="form-label">Correo Electronico</label>
						<input type="emailsdf" className="form-control" id="inputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="mb-3">
						<label htmlFor="inputPassword" className="form-label">Contraseña</label>
						<input type="password" className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="mb-3 form-check">
						<input type="checkbox" className="form-check-input" id="exampleCheck1" />
						<label className="form-check-label" htmlFor="exampleCheck1">Mantener sesion inciada</label>
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
