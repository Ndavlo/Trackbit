import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div id="loginContainer">
				<div className="loginFormCont">
					<form id="formLogin">
					<h1 id="loginHead">Accede a tu cuenta</h1>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">Correo Electronico</label>
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
							<input type="password" className="form-control" id="exampleInputPassword1"/>
						</div>
						<div className="mb-3 form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
								<label className="form-check-label" htmlFor="exampleCheck1">Mantener sesion inciada</label>
						</div>
						<div className="logButtons">
						<button type="submit" className="btn">Acceder</button>
						<button type="submit" className="btn">Olvide mi contraseña</button></div>
					</form>
				</div>
				<div className="loginImg"></div>
			</div>
		</>
	);
};
