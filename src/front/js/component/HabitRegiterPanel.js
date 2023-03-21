import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";
import stl2 from '../../styles/newhabitpanel.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { StepPanel } from "./StepPanel";


export function HabitRegisterPanel({ closeHandler }) {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [description, serDescription] = useState("");
  
    useEffect(()=>{
      actions.pushNewStepInStore()
    },[])
  

  
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={stl.backdrop}
  
      >
        <div className={`${stl.panel} ${stl2.panel}`}>
          <button onClick={() => {
            actions.clearNewsSteps()
            closeHandler()
            }}>X</button>
          <div className="habito">
            <label>Nombre</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <label>Decripción</label>
            <textarea onChange={(e) => serDescription(e.target.value)} />
          </div>
          <div className="pasos">
            <div></div>
            <h2>Pasos</h2>
            <button onClick={actions.pushNewStepInStore}>Agregar Paso</button>
            
            <AnimatePresence >
            {store.newSteps.map((e, i) => {
              return (
                  <StepPanel key={i} index={i} />
              )
            })}
            </AnimatePresence>
  
          </div>
          <button onClick={() => actions.addHabit(name, description, store.newSteps)}>
            Registrar Habito
          </button>
        </div>
      </motion.div>
    );
  }