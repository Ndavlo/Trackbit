import React, { useEffect , useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";





export const Navbar = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		
	},[])

	
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
					<span className="navbar-brand mb-0 h1">TrackBit</span>
				</Link>
				<div className="ml-auto" id="navbarButtons">
				<button id="navButton" type="button" className="btn btn-sm">Blog</button>
				<Link to="/signup"><button id="navButton" type="button" className="btn btn-sm">Registrarse</button></Link>
				<Link to="/login"><button id="navButton" type="button" className="btn btn-sm">Log In</button></Link>
				<button id="navButton" type="button" className="btn btn-sm" onClick={()=>{actions.logOut()}}>Log out</button>
				</div>
			</div>
		</nav>
	);
};
