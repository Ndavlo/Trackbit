import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [ recoveryEmail, setRecoveryEmail ] = useState("")
	async function sendRecoveryPassword() {
		let resp = await fetch(process.env.BACKEND_URL + "/api/recoverypassword", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email: recoveryEmail }),
		})
		if (resp.ok) {
			alert("Revisa tu correo")
		} else {
			alert("Error en la solicitud")
		}
	}

	return (
		<>
			<div id="loginContainer">
				<div className="loginFormCont">
					<form id="formLogin">
						<h1 id="loginHead">Accede a tu cuenta</h1>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">Correo Electronico</label>
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
							<input type="password" className="form-control" id="exampleInputPassword1" />
						</div>
						<div className="mb-3 form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1" />
							<label className="form-check-label" htmlFor="exampleCheck1">Mantener sesion inciada</label>
						</div>
						<div className="logButtons">
							<button type="submit" className="btn">Acceder</button>
							{/* <!-- Modal Button --> */}
							<button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#recoveryModal">
								Olvide mi contraseña
							</button>
						</div>
						{/* <!-- Modal --> */}
						<div className="modal fade" id="recoveryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="exampleModalLabel">Restablecer contraseña</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										<form>
											<div className="mb-3">
												<label htmlFor="exampleInputEmail1" id="modalForm" className="form-label">Ingresa tu correo</label>
												<input
													type="email"
													value={recoveryEmail}
													onChange={(e) => setRecoveryEmail(e.target.value)}
													className="form-control"
													id="exampleInputEmail1"
													placeholder="name@example.com"
												/>
												<button type="button" onClick={sendRecoveryPassword} className="btn mt-2">Restablecer</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Modal --> */}


					</form>
				</div>
				<div className="loginImg"></div>
			</div>
		</>
	);
};
