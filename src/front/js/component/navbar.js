import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [menuOptions, setMenuOptions] = useState([
		{
			text: "Blog",
			link: "/blog"
		},
		{
			text: "Login",
			link: "/login"
		},
		{
			text: "Sign Up",
			link: "/signup"
		},
		{
			text: "Logout",
			action: () => actions.logOut()
		}
	])
	useEffect(() => {

	}, [])

// Ahora aparece el boton del menu del navbar y los navbuttons al mismo tiempo, como logras hacer dos menus? Por que no aparecen los botones del nav al final, si tiene justify end??

	return (

		<nav className="navbar navbar-expand-md">
			<div className="container">
				<Link to="/" id="tLogo"><span className="navbar-brand mb-0 h1">TrackBit</span> </Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasMd" aria-controls="navbarOffcanvasMd">
					<i className="bi bi-list text-white navbar-toggler-icon"></i>
				</button>
					<div className="ml-auto" id="navbarButtons">
						{menuOptions.map((option, key) => {
							return !!option.link ?
								<Link key={key} to={option.link}> <button className="btn" id="navButton">{option.text}</button></Link>
								:
								<button key={key} className="btn btn-sm" id="navButton" onClick={option.action}>{option.text}</button>
						})}
						{/* <button id="navButton" type="button" className="btn btn-sm">Blog</button>
					<Link to="/signup"><button id="navButton" type="button" className="btn btn-sm">Registrarse</button></Link>
					<Link to="/login"><button id="navButton" type="button" className="btn btn-sm">Log In</button></Link>
					<button id="navButton" type="button" className="btn btn-sm" onClick={() => { actions.logOut() }}>Log out</button> */}
					</div>

				<div className="offcanvas offcanvas-end" tabindex="-1" id="navbarOffcanvasMd" aria-labelledby="navbarOffcanvasMdLabel">
				</div>
			</div>
		</nav>
	);
};
