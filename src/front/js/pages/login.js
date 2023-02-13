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
						<div class="mb-3">
							<label for="exampleInputEmail1" class="form-label">Correo Electronico</label>
							<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
						</div>
						<div class="mb-3">
							<label for="exampleInputPassword1" class="form-label">Contraseña</label>
							<input type="password" class="form-control" id="exampleInputPassword1"/>
						</div>
						<div class="mb-3 form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1"/>
								<label class="form-check-label" for="exampleCheck1">Mantener sesion inciada</label>
						</div>
						<button type="submit" class="btn btn-primary">Acceder</button>
					</form>
				</div>


				<div className="loginImg"></div>
			</div>
		</>
	);
};
