
import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../store/appContext";
import stl2 from '../../styles/newhabitpanel.module.css'
import styles from '../../styles/registroDePaso.css'

String.prototype.replaceAt = function (index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

export function StepPanel({ index }) {
  const { store, actions } = useContext(Context);

  function handleClose() {
    let newSteps = store.newSteps
    newSteps.splice(index, 1)
    actions.setNewStepInStore({ newSteps: newSteps })
  }

  function WeekDays() {
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    return (<div className={stl2.weekcheck}>
      {weekDays.map((e, i) => {
        let checked = (store.newSteps[index].interval[i + 1] == '0') ? false : true
        return (<input key={i} type='checkbox' checked={checked} onChange={(e) => {
          let interval = store.newSteps[index].interval
          interval = interval.replaceAt(i + 1, e.target.checked ? '1' : '0')
          actions.setNewStepProperty(index, 'interval', interval)
        }} />)
      }
      )}
    </div>)
  }

  const step = store.newSteps[index]

  return (
    <>
      <motion.div
        initial={false}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className={stl2.paso}>
        <div className="registroDePaso">
        <h3>Nuevo paso</h3>
        <button className="btn" onClick={handleClose}>Quitar paso</button>
        <label>Nombre</label>
        <input type="text" value={step?.name} onChange={(e) => {
          actions.setNewStepProperty(index, 'name', e.target.value)
        }} />
        <label>Descripción</label>
        <textarea value={step?.description} onChange={(e) => {
          actions.setNewStepProperty(index, 'description', e.target.value)
        }} />
        <label>Contenido</label>
        <textarea value={step?.content} onChange={(e) => {
          actions.setNewStepProperty(index, 'content', e.target.value)
        }} />

        <div>
          <h2>Recurrencia</h2>
          <label>Se repite cada:</label>
          <input className="numberInput" type="number" value={step?.repetition} onChange={(e) => {
            actions.setNewStepProperty(index, 'repetition', e.target.value)
          }} />
          <select className="timeSelect" name="interval" id="interval" value={step?.interval[0]} onChange={(e) => {
            console.log(e.target.value)
            if (e.target.value == 'W') {
              actions.setNewStepProperty(index, 'interval', 'W0000000')
            } else {
              actions.setNewStepProperty(index, 'interval', e.target.value)
            }
          }}>
            <option value="D">Dias</option>
            <option value='W'>Semanas</option>
            <option value="M">Meses</option>
            <option value="Y">Anos</option>
          </select>
          {(store.newSteps[index]?.interval.length > 1) ? <WeekDays /> : ''}
        </div>

        <label>Empieza en:</label>
        <input type="date" value={step?.startDate} onChange={(e) => {
          actions.setNewStepProperty(index, 'startDate', e.target.value)
        }} />
        <label>Termina en:</label>
        <input type="date" value={step?.endDate} onChange={(e) => {
          actions.setNewStepProperty(index, 'endDate', e.target.value)
        }} />
        </div>

      </motion.div>
      </>
  );
}