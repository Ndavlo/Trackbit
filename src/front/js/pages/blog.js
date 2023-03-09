import React, { useState, useEffect, useContext } from "react";
import "../../styles/blog.css";
import { Context } from "../store/appContext";

export const Blog = () => {

    return (
        <>
            <section id="blogSection">
                <div className="container">
                    <div className="row row-cols-2 gy-5">
                        <div className="col blogCol">
                            <div className="blogImg"><img src="https://firebasestorage.googleapis.com/v0/b/trackbit-4cb19.appspot.com/o/running-runner-long-distance-fitness-40751.webp?alt=media&token=1eb48637-f734-4094-8bfe-4c3a262193be"></img></div>
                            <div className="blogTxt">
                                <h1>Llega a nuevos lugares</h1>
                                <div className="containerText">
                                    <p>Lorem ipsum dolor sit amet. A consequuntur internos quo reiciendis alias ex magni minima?</p>
                                    {/* <!-- Button trigger modal --> */}
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Leer mas
                                    </button>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header modalHeader">
                                                    <h5 className="modal-title modalTitle text-white" id="exampleModalLabel">Llega a nuevos lugares</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body modalBody">
                                                    <p className="modalP">Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!

                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!
                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!


                                                    </p>
                                                </div>
                                                <div className="modal-footer modalFooter">
                                                    <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col blogCol">
                            <div className="blogImg"><img src="https://firebasestorage.googleapis.com/v0/b/trackbit-4cb19.appspot.com/o/pexels-photo-1010513.webp?alt=media&token=b9c763c5-bf35-49af-920f-856630132dcf"></img></div>
                            <div className="blogTxt">
                                <h1>No pierdas ni un segundo</h1>
                                <div className="containerText">
                                    <p>Lorem ipsum dolor sit amet. A consequuntur internos quo reiciendis alias ex magni minima?</p>
                                    {/* <!-- Button trigger modal --> */}
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Leer mas
                                    </button>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header modalHeader">
                                                    <h5 className="modal-title modalTitle text-white" id="exampleModalLabel">No pierdas ni un segundo</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body modalBody">
                                                    <p className="modalP">Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!

                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!
                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!


                                                    </p>
                                                </div>
                                                <div className="modal-footer modalFooter">
                                                    <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col blogCol">
                            <div className="blogImg"><img src="https://firebasestorage.googleapis.com/v0/b/trackbit-4cb19.appspot.com/o/pexels-photo-1552617.webp?alt=media&token=f1655ca3-d6fd-4ce9-8473-c85f0880fb61"></img></div>
                            <div className="blogTxt">
                                <h1>Cumple objetivos</h1>
                                <div className="containerText">
                                    <p>Lorem ipsum dolor sit amet. A consequuntur internos quo reiciendis alias ex magni minima?</p>
                                    {/* <!-- Button trigger modal --> */}
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Leer mas
                                    </button>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header modalHeader">
                                                    <h5 className="modal-title modalTitle text-white" id="exampleModalLabel">Cumple objetivos</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body modalBody">
                                                    <p className="modalP">Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!

                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!
                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!


                                                    </p>
                                                </div>
                                                <div className="modal-footer modalFooter">
                                                    <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col blogCol">
                            <div className="blogImg"><img src="https://firebasestorage.googleapis.com/v0/b/trackbit-4cb19.appspot.com/o/pexels-photo-3756168.webp?alt=media&token=730179b2-6bc1-4e12-bf92-d39a4b87cb65"></img></div>
                            <div className="blogTxt">
                                <h1>Se quien siempre haz querido</h1>
                                <div className="containerText">
                                    <p>Lorem ipsum dolor sit amet. A consequuntur internos quo reiciendis alias ex magni minima?</p>
                                    {/* <!-- Button trigger modal --> */}
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Leer mas
                                    </button>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header modalHeader">
                                                    <h5 className="modal-title modalTitle text-white" id="exampleModalLabel">Se quien siempre haz querido</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body modalBody">
                                                    <p className="modalP">Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!

                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!
                                                        Lorem ipsum dolor sit amet. Qui possimus nobis sit sunt quis non quaerat eius. Eum voluptatibus rerum et obcaecati quaerat in culpa ullam eos excepturi iste vel aliquam magni ut explicabo dolorem ea repellat atque. Qui nihil saepe et beatae iure quo magni quia ab quam labore et pariatur quod non delectus dolor nam doloribus fuga.

                                                        Et aliquam odio eum nostrum perferendis sed quibusdam assumenda. Ex veritatis perferendis et recusandae omnis id cupiditate blanditiis vel doloremque totam est porro blanditiis. Et deserunt excepturi est eius sequi aut velit sint et eius fugit qui voluptas animi. Ut ipsa totam est veniam veritatis qui assumenda aliquid non illum rerum 33 veniam error sit blanditiis autem ut quia praesentium.

                                                        Ab veritatis voluptatum sit voluptatem provident qui earum placeat et unde optio eum quia numquam? Ad eius quas eum rerum dolores aut enim voluptate non eveniet excepturi hic autem labore et autem ipsa. Qui enim unde sed natus quaerat eum nesciunt illum sed molestiae reiciendis et sunt repellat est nemo voluptate!


                                                    </p>
                                                </div>
                                                <div className="modal-footer modalFooter">
                                                    <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>


        </>

    );
};
