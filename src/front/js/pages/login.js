import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [password, setPassword] = useState()
	const [email, setEmail] = useState()
	const [recoveryEmail, setRecoveryEmail] = useState("")

	const navigate = useNavigate()

	useEffect(() => {
		console.log(store.accessToken)
		if (store.accessToken) {
			navigate('/userprofile')
		}
	}, [store.accessToken])

	async function submitLogin(e) {
		e.preventDefault()
		let resp = await actions.login(email, password)
	}

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

			<div className="container-fluid">
				<div className="row">
					<div className="loginFormCont col m-0">
							<form id="formLogin">
								<h1 id="loginHead">Accede a tu cuenta</h1>
								<div className="mb-3">
									<label htmlFor="inputEmail" className="form-label">Correo Electronico</label>
									<input type="emailsdf" className="form-control text-dark" id="inputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
								</div>
								<div className="mb-3">
									<label htmlFor="inputPassword" className="form-label">Contraseña</label>
									<input type="password" className="form-control text-dark" id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
								</div>
								<div className="mb-3 form-check">
									<input type="checkbox" className="form-check-input" id="exampleCheck1" />
									<label className="form-check-label" htmlFor="exampleCheck1">Mantener sesion inciada</label>
								</div>
								<div className="logButtons gap-3 flex-column flex-md-row">
									<button type="submit" className="btn" onClick={(e) => submitLogin(e)}>Acceder</button>

									{/* <!-- Modal Button --> */}
									<button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#recoveryModal">
										Olvide mi contraseña
									</button>
								</div>
								</form>
								{/* <!-- Modal --> */}
								<div className="modal fade" id="recoveryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


					</div>

					<div className="col m-0 d-none d-sm-none d-md-none d-lg-block">
						<div className="loginImg"></div>
					</div>
				</div>
			</div>

		</>
	);
};
