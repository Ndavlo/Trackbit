import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [menuOptions, setMenuOptions] = useState([
		{
			text: <i className="bi bi-houses"></i>,
			link: "/",
			id: "buttonOne"
		},
		{
			text: "Blog",
			link: "/blog",
			id: "buttonTwo"
		},
		{
			text: "Sign Up",
			link: "/signup",
			id: "buttonThree"

		},
		{
			text: "Login",
			link: "/login",
			id: "buttonFour"
		},
	])

	useEffect(() => {
		if (store.accessToken) {
			setMenuOptions([
				{
					text: <i className="bi bi-houses"></i>,
					link: "/",
					id: "buttonOne"
				},
				{
					text: "Dashboard",
					link: "/dashboard",
					id: "buttonTwo"
				},
				{
					text: "Perfil",
					link: "/userProfile",
					id: "buttonThree"
				},
				{
					text: "Blog",
					link: "/blog",
					id: "buttonFour"
				},
				{
					text: "Logout",
					action: () => actions.logOut(),
					id: "buttonFive"
				}]
			)
		}else{
			setMenuOptions([
				{
					text: <i className="bi bi-houses"></i>,
					link: "/",
					id: "buttonOne"
				},
				{
					text: "Blog",
					link: "/blog",
					id: "buttonTwo"
				},
				{
					text: "Sign Up",
					link: "/signup",
					id: "buttonThree"
		
				},
				{
					text: "Login",
					link: "/login",
					id: "buttonFour"
				},
			])
		}
	}, [store.accessToken])

	// Ahora aparece el boton del menu del navbar y los navbuttons al mismo tiempo, como logras hacer dos menus? Por que no aparecen los botones del nav al final, si tiene justify end??

	return (

		<nav className="navbar navbar-expand-md mb-0">
			<div className="container">
				<Link to="/" id="tLogo"><span className="navbar-brand mb-0 h1">TrackBit</span> </Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasMd" aria-controls="navbarOffcanvasMd">
					<i className="bi bi-list text-white navbar-toggler-icon"></i>
				</button>
				<div className="ml-auto d-none d-md-flex" id="navbarButtons">
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

				<div className="offcanvas offcanvas-end d-md-none" tabIndex="-1" id="navbarOffcanvasMd" aria-labelledby="navbarOffcanvasMdLabel">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offCanvasHeader">Menu</h5>
						<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						{menuOptions.map((option, key) => {
							return !!option.link ?
								<Link className="navMenuButton offButton " id={option.id} key={key} to={option.link} onClick={() => { window.location.href = option.link; document.getElementById("navbarOffcanvasMd").setAttribute("data-bs-dismiss", "offcanvas"); }}>{option.text}</Link>
								:
								<a className="navMenuButton offButton" id={option.id} key={key} onClick={() => { option.action(); document.getElementById("navbarOffcanvasMd").setAttribute("data-bs-dismiss", "offcanvas"); }}>{option.text}</a>
						})}
					</div>
				</div>
			</div>
		</nav>
	);
};
