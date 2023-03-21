import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";


export function HabitsPanel() {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (store.accessToken === null) return
        actions.getHabits()
    }, [store.accessToken])
    console.log(store.habits)
    return (
        <>
            <div className="container habitContainer">
            <h1 className="text-light">Lista de Habitos</h1>
                <div className="row text-light row p-0 g-3">
                {store.habits.map((e, i) => {
                    return (
                        <> 
                        <div className="col-12 p-3" id="habitsDisplay">
                            <div key={i}>
                                <h5>{`${e.name}`}</h5>
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