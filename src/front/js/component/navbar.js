import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
					<span className="navbar-brand mb-0 h1">TrackBit</span>
				</Link>
				<div className="ml-auto" id="navbarButtons">
				<button id="navButton" type="button" className="btn btn-sm">Newsletter</button>
				<button id="navButton" type="button" className="btn btn-sm">Registrate</button>
				<button id="navButton" type="button" className="btn btn-sm">Log In</button>
				</div>
			</div>
		</nav>
	);
};
