import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";

export function DeleteHabitPanel({closeHandler, data}) {
    const { store, actions } = useContext(Context);
    

    return (
            <div className="stepContainer">
                <button onClick={() => closeHandler()}>x</button>
                <span> Realmente quieres borrar el habito {data.name}</span>
                <button onClick={() => {
                    console.log(data)
                    actions.deleteHabit(data.id)
                    closeHandler()
                }}>Si</button>
                <button onClick={() => closeHandler()}>No</button>
            </div>
        
    )

}