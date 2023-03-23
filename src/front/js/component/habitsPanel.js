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
                                        <button className="btn">Ver mas</button>
                                        <button className="btn trashIcon"><i onClick={() => deleteHabit(e.id)} className="bi bi-trash3-fill"></i></button>
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