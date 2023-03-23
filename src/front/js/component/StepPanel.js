
import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../store/appContext";
import stl2 from '../../styles/newhabitpanel.module.css'

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
        let checked = (store.newSteps[index].time[i + 1] == '0') ? false : true
        return (<input key={i} type='checkbox' checked={checked} onChange={(e) => {
          let time = store.newSteps[index].time
          time = time.replaceAt(i + 1, e.target.checked ? '1' : '0')
          actions.setNewStepProperty(index, 'time', time)
        }} />)
      }
      )}
    </div>)
  }

  const step = store.newSteps[index]

  return (
    
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className={stl2.paso}>
        <h3>Paso 1</h3>
        <button onClick={handleClose}>X</button>
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
          <label>Se repite:</label>
          <input type="number" value={step?.repetition} onChange={(e) => {
            actions.setNewStepProperty(index, 'repetition', e.target.value)
          }} />
          <select name="time" id="time" value={step?.time[0]} onChange={(e) => {
            console.log(e.target.value)
            if (e.target.value == 'W') {
              actions.setNewStepProperty(index, 'time', 'W0000000')
            } else {
              actions.setNewStepProperty(index, 'time', e.target.value)
            }
          }}>
            <option value="D">Dia</option>
            <option value='W'>Semana</option>
            <option value="M">Mes</option>
            <option value="Y">Ano</option>
          </select>
          {(store.newSteps[index]?.time.length > 1) ? <WeekDays /> : ''}
        </div>



        <label>Empieza en:</label>
        <input type="date" value={step?.startDate} onChange={(e) => {
          actions.setNewStepProperty(index, 'startDate', e.target.value)
        }} />
        <label>Termina en:</label>
        <input type="date" value={step?.endDate} onChange={(e) => {
          actions.setNewStepProperty(index, 'endDate', e.target.value)
        }} />

      </motion.div>
  );
}