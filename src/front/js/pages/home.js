import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import calendar from "../../img/ChelbySobras_use_the_stlye_of_this_image_generate_a_calendar_as_e973ee70-ba18-4818-b282-32befb9b47a3-removebg-preview.png"
import winner from "../../img/winner.png"
import bell from "../../img/bell.png"
import cup from "../../img/cup.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<main className="mainClass">
				<div>
					<h1 id="header">Todavía hay una mejor versión de ti.<br></br>¡Desbloquéala ahora!</h1></div>
				<div><h4 id="header">Alcanza todas tus metas con TrackBit.<br></br>¿Interesado?</h4> </div>
				<div id="buttonDiv"> <Link id="calltoAct" to="/signup" type="button" className="btn btn-lg">¡Empieza ahora!</Link> </div>
			</main>

			<section id="firstSection">
				<div id="firstSectionHeader">
					<h1>Sé quién siempre has querido en 4 pasos.</h1>
					<h4>Inicia una rutina, ejecuta las tareas, <br></br> gana experiencia y ¡logra tus metas!</h4>
				</div>
				<div id="cards" className="container mt-5 w-100% text-center ">
					<div className="row d-flex">

						<div className="col-sm-6 col-xl-3 ">
							<div id="homeCard" className="card border-0 mb-3 bg-transparent">
								<img src={calendar} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">1. ¡Selecciona una rutina!</h5>
									<p className="card-text">Crea tus propias rutinas o inscribete a la de algun creador.</p>
								</div>
							</div>
						</div>

						<div className="col-sm-6 col-xl-3">
							<div id="homeCard" className="card border-0 mb-3 bg-transparent">
								<img src={winner} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">2. ¡Gana puntos de experiencia!</h5>
									<p className="card-text">Por cada tarea cumplida recibe puntos de XP y alcanza rachas semanales!</p>
								</div>
							</div>
						</div>

						<div className="col-sm-6 col-xl-3">
							<div id="homeCard" className="card border-0 mb-3 bg-transparent">
								<img src={bell} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">3. ¡No perderás el ritmo!</h5>
									<p className="card-text">Recibe recordatorios y notificaiones cuando mas las necesites.</p>
								</div>
							</div>
						</div>

						<div className="col-sm-6 col-xl-3">
							<div id="homeCard" className="card border-0 mb-3 bg-transparent">
								<img src={cup} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">4. ¡Alcanza tus objetivos!</h5>
									<p className="card-text">Diviértete mientras alcanzas todas tus metas.</p>
								</div>
							</div>
						</div>

					</div>

				</div>
			</section>

			<section id="secondSection">
				<h3>Aprende más sobre como se forjan los hábitos en tu mente <br></br> con este video cortesia de Kurzgesagt</h3>
				<div id="video" className="ratio ratio-16x9">
					<iframe src="https://www.youtube.com/embed/75d_29QWELk"></iframe>
				</div>
			</section>
		</>
	);
};
