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
      actions.setNewStepInStore({newSteps:[
      ]})
    },[])
  
    function test() {
      console.log('stps:')
      console.log(stps)
      console.log('steps')
      console.log(steps)
    }
  
    function deleteStepHandler(index) {
      console.log('deleting step')
      stps.splice(index, 1)
      setSteps([...(steps.splice(index, 1))])
      console.log(steps)
  
    }
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={stl.backdrop}
  
      >
        <button onClick={e => test(e)}>TEST</button>
        <div className={`${stl.panel} ${stl2.panel}`}>
          <button onClick={() => closeHandler()}>X</button>
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
            {store.newSteps.map((e, i) => {
              return (<StepPanel key={i} index={i} deleteStepHandler={deleteStepHandler} />)
            })}
  
          </div>
          <button onClick={() => actions.addHabit(name, description)}>
            Registrar Habito
          </button>
        </div>
      </motion.div>
    );
  }