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
            <h1 className="text-light">Lista de Habitos</h1>
            <div className="container habitContainer">
                <div className="row text-light row p-0 g-3">
                    {store.habits.map((e, i) => {
                        return (
                            <>
                                <div className="col-12 p-3" id="habitsDisplay">
                                    <div key={i}>
                                        <div className="habitHeadDisplay">
                                            <h5>{`${e.name}`}</h5>
                                            <button className="btn trashIcon"><i onClick={() => deleteHabit(e.id)} className="bi bi-trash3-fill"></i></button>
                                        </div>
                                        <p>{`${e.description}`}</p>
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