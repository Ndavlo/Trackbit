import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";



export function HabitsPanel() {
    const { store, actions } = useContext(Context);
    function deleteHabit(id) {
        actions.deleteHabit(id)
    }
    useEffect(() => {
        if (store.accessToken === null) return
        actions.getHabits()
    }, [store.accessToken])

    return (
        <>
            <h1 className="text-light pt-3 text-center">Lista de Habitos</h1>
            <div className="container habitContainer">
                <div className="row text-light justify-content-center">
                    {store.habits.map((e, i) => {
                        return (
                            <>
                                <div key={i} className="p-3 g-3" id="habitsDisplay">
                                    <div className="habitHeadDisplay">
                                        <h5 className="habitTitle">{`${e.name}`}</h5>
                                        <p>{`${e.description}`}</p>
                                    </div>
                                    <div className="habitButton justify-content-between">
                                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target={"#modal" + e.id}>Ver pasos</button>
                                        <button className="btn trashIcon"><i onClick={() => deleteHabit(e.id)} className="bi bi-trash3-fill"></i></button>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: `#${e.color}`,
                                            width: '20px',
                                            aspectRatio: 1
                                        }}
                                        onClick={() => {
                                            actions.setHAbitColor(e.id, (Math.floor(Math.random() * (256 * 256 * 256))).toString(16))
                                        }}
                                    >{`#${e.color}`}</div>
                                </div>


                                {/* <!-- Modal --> */}
                                <div className="modal fade" key={i} id={"modal" + e.id} tabIndex="-1" aria-labelledby="whatever" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            <h5 className="modal-title text-dark" id={e.id + "idModalLabel"}>{`${e.name}`}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                            <ul class="list-group">
                                                    {e.steps.map((step, ind)=>{
                                                        return (
                                                            <li class="list-group-item" key={ind}>{`${step.name}`}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>



















        </>
    )
}