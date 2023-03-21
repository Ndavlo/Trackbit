import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";


export function HabitsPanel(){
    const { store, actions } = useContext(Context);
    useEffect(()=>{
        if(store.accessToken === null) return
        actions.getHabits()
    },[store.accessToken])
    console.log('Rendeirnf Habist Panel')
    return(
        <div>
            {store.habits.map((e,i)=>{
                return(
                <div key={i}>
                    <h2>Habito</h2>
                </div>
                )
            })}
        </div>
    )
}