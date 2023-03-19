
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";
import stl2 from '../../styles/newhabitpanel.module.css'
import { motion, AnimatePresence } from "framer-motion";


export function ActivityRegisterPanel({closeHandler}) {

    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [description, serDescription] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={stl.backdrop}

        >
            <div className={`${stl.panel} ${stl2.panel}`}>
                <button onClick={() => closeHandler()}>X</button>
                <div className="habito">
                    <label>Nombre</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                    <label>Decripción</label>
                    <textarea onChange={(e) => serDescription(e.target.value)} />
                </div>
            </div>
        </motion.div>
    )
}