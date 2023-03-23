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
    console.log(store.habits)
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
                                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target={"#"+String(e.id)}>Ver mas</button>
                                        <button className="btn trashIcon"><i onClick={() => deleteHabit(e.id)} className="bi bi-trash3-fill"></i></button>
                                    </div>
                                </div>


                                {/* <!-- Modal --> */}
                                <div className="modal fade" id={String(e.id)} tabIndex="-1" aria-labelledby="whatever" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={e.id +"idModalLabel"}>Modal title</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                ...
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
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