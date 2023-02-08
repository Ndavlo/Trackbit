import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<main>
				<div id="h1Header"><h1>Todavia hay una mejor version de ti.<br></br>Desbloquéala ahora!</h1></div>
				<div> <h5>Alcanza todas tus metas con TrackBit.<br></br>¿Interesado?</h5> </div>
				<div id="buttonDiv"> <button type="button" className="btn btn-success btn-lg">Empieza ahora!</button> </div>
			</main>

			<section>
				<div className="container mt-4 mb-4 w-100% text-center">
					<div className="row">
						<div className="col-sm-6 col-xl-3">

							<div className="card mb-3 me-3 bg-transparent" style={{ width: "18rem", height: "350px" }}>
							<img src="..." class="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">Selecciona una rutina!</h5>
									<p className="card-text">Crea tus propias rutinas o inscribete a la de algun creador.</p>
									<div className="justify-content-end"><a href="#" className="btn btn-primary">Go somewhere</a></div>
								</div>
							</div>

						</div>
						<div className="col-sm-6 col-xl-3">

							<div className="card mb-3 me-3 bg-transparent" style={{ width: "18rem", height: "350px" }}>
							<img src="..." class="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">Gana puntos de experiencia!</h5>
									<p className="card-text">Por cada tarea cumplida recibe puntos de XP y alcanza rachas semanales!</p>
									<a href="#" className="btn btn-primary">Go somewhere</a>
								</div>
							</div>

						</div>
						<div className="col-sm-6 col-xl-3">

							<div className="card mb-3 me-3 bg-transparent" style={{ width: "18rem", height: "350px" }}>
							<img src="..." class="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">No perderas el ritmo!</h5>
									<p className="card-text">Recibe recordatorios y notificaiones cuando mas las necesites.</p>
									<a href="#" className="btn btn-primary">Go somewhere</a>
								</div>
							</div>

						</div>

						<div className="col-sm-6 col-xl-3">

							<div className="card mb-3 me-3 bg-transparent" style={{ width: "18rem", height: "350px" }}>
							<img src="..." class="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">Alcanza tus objetivos!</h5>
									<p className="card-text">Diviertete mientras alcanzas todas tus metas.</p>
									<a href="#" className="btn btn-primary">Go somewhere</a>
								</div>
							</div>

						</div>

					</div>

				</div>
			</section>





			<section><h2>section 3</h2></section>
		</>
	);
};
