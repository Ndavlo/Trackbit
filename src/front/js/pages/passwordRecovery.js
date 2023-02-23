import React, { useState, useEffect, useContext } from "react";
import "../../styles/login.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PasswordRecovery = () => {
	const { store, actions } = useContext(Context);
	const searchParams=useSearchParams()
	const {resetPassword}=actions
	const [mensaje, setMensaje]=useState("")
	const navigate = useNavigate()
	useEffect(() => {
		setTimeout(() =>setMensaje(""),5000)
	},[mensaje])

	async function submitForm(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const passwords1 = formData.get("password1");
		const passwords2 = formData.get("password2");
		if (passwords1 !== passwords2) {
		  setMensaje("Las claves deben coincidir");
		  return;
		}
		let token = searchParams.get(token)
		let resp = await resetPassword(token, passwords[0])
	}

	return (
		<>
			<div id="loginContainer">
				<div className="loginFormCont">
					<form id="formLogin" onSubmit={submitForm}>
					<h1 id="loginHead">Recupera tu contraseña</h1>
					{mensaje ? (<div className="alert alert-primary" role="alert">{mensaje}</div>) : ("")}
						<div className="mb-3">
							<label htmlFor="inputPassword1" className="visually-hidden">Contraseña</label>
							<input type="password" className="form-control" id="inputPassword1" placeholder="Password" name="password1"/>
						</div>
						<div className="mb-3">
							<label htmlFor="inputPassword2" className="visually-hidden">Contraseña</label>
							<input type="password" className="form-control" id="inputPassword2" placeholder="Password" name="password2"/>
						</div>
						<button type="submit" className="btn btn-primary">Recuperar</button>
					</form>
				</div>
				<div className="loginImg"></div>
			</div>
		</>
	);
};
