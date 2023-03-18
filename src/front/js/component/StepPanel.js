
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl2 from '../../styles/newhabitpanel.module.css'


export function StepPanel({ setStep, deleteStepHandler, index }) {
    const { store, actions } = useContext(Context);
    const [showWeekCheckboxes, setShowWeekCheckboxes] = useState(false)
  
    function handleClose() {
      let newSteps = store.newSteps
      newSteps.splice(index, 1)
      actions.setNewStepInStore({ newSteps: newSteps })
    }
  
    const step = store.newSteps[index]
  
    return (
      <div className="paso">
        <h3>Paso 1</h3>
        <button onClick={handleClose}>X</button>
        <label>Nombre</label>
        <input type="text" value={step.name} onChange={(e) => {
          actions.setNewStepProperty(index, 'name', e.target.value)
        }} />
        <label>Descripción</label>
        <textarea value={step.description} onChange={(e) => {
          actions.setNewStepProperty(index, 'description', e.target.value)
        }} />
        <label>Contenido</label>
        <textarea value={step.content} onChange={(e) => {
          actions.setNewStepProperty(index, 'content', e.target.value)
        }} />
  
        <div>
          <h2>Recurrencia</h2>
          <label>Se repite:</label>
          <input type="number" value={step.repetition} onChange={(e) => {
            actions.setNewStepProperty(index, 'repetition', e.target.value)
          }} />
          <select name="time" id="time" value={step.time} onChange={(e) => {
            actions.setNewStepProperty(index, 'time', e.target.value)
          }}>
            <option value="day">Dia</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Ano</option>
          </select>
  
        </div>
  
        <div className={stl2.weekcheck}>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>        
        </div>
  
        <label>Empieza en:</label>
        <input type="date" value={step.startDate} onChange={(e) => {
          actions.setNewStepProperty(index, 'startDate', e.target.value)
        }} />
        <label>Termina en:</label>
        <input type="date" value={step.endDate} onChange={(e) => {
          actions.setNewStepProperty(index, 'endDate', e.target.value)
        }} />
  
      </div>
    );
  }