import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [password, setPassword] = useState()
	const [email, setEmail] = useState()

	const navigate = useNavigate()
	useEffect(()=>{
		if(store.accessToken){
			navigate('/userprofile')
		}
	},[store.accessToken])	

	async function submitLogin (e){
		e.preventDefault()
		let resp = await actions.login(email, password)
	}

	return (
		<>
			<div id="loginContainer">
				<div className="loginFormCont">
					<form id="formLogin">
					<h1 id="loginHead">Accede a tu cuenta</h1>
						<div className="mb-3">
							<label htmlFor="inputEmail" className="form-label">Correo Electronico</label>
							<input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp"/>
						</div>
						<div className="mb-3">
							<label htmlFor="inputPassword" className="form-label">Contraseña</label>
							<input type="password" className="form-control" id="inputPassword"/>
						</div>
						<div className="mb-3 form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
								<label className="form-check-label" htmlFor="exampleCheck1">Mantener sesion inciada</label>
						</div>
						<button type="submit" className="btn btn-primary" onClick={(e)=>submitLogin(e)}>Acceder</button>
					</form>
				</div>
				<div className="loginImg"></div>
			</div>
		</>
	);
};
