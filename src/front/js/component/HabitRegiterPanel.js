import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";
import stl2 from '../../styles/newhabitpanel.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { StepPanel } from "./StepPanel";
import styles from "../../styles/registroDePaso.css";


export function HabitRegisterPanel({ closeHandler }) {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [description, serDescription] = useState("");

  useEffect(() => {
    actions.pushNewStepInStore()
  }, [])



  return (
    <div className="stepContainer">
        <div className={`${stl.panel} ${stl2.panel}`}>
          <button className="btn" onClick={() => {
            actions.clearNewsSteps()
            closeHandler()
          }}><i className="bi bi-x-circle"></i></button>
          <div className="habito">
            <label>Nombre</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <label>Decripción</label>
            <textarea onChange={(e) => serDescription(e.target.value)} />
          </div>
          <div className="pasos">
            <div></div>
            <h2>Pasos</h2>
            <button className="btn" onClick={actions.pushNewStepInStore}>Agregar Paso</button>


            <AnimatePresence>
              {store.newSteps.map((e, i) => {
                return (
                  <StepPanel key={i} index={i} />
                )
              })}
            </AnimatePresence>


          </div>
          <button className="btn" onClick={() => { 
            actions.addHabit(
              name, 
              description, 
              store.habits.length, 
              `#${Math.floor(Math.random() * 256 * 256 * 256).toString(16)}`, 
              store.newSteps)
            closeHandler()
            }}>
            Registrar Habito
          </button>
        </div>
    </div>
  );
}