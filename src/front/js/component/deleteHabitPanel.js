import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";

export function DeleteHabitPanel({ closeHandler, data }) {
    const { store, actions } = useContext(Context);


    return (
        <div className="tb-panel">
            <button onClick={() => closeHandler()} className='tb-close-x' />
            <span> Realmente quieres borrar el habito "{data.name}"?</span>
            <div>
                <button
                    onClick={() => {
                        console.log(data)
                        actions.deleteHabit(data.id)
                        closeHandler()
                    }}
                    className='tb-btn'>Si</button>
                <button onClick={() => closeHandler()} className='tb-btn'>No</button>
            </div>
        </div>

    )

}