
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";
import stl2 from '../../styles/newhabitpanel.module.css'
import { motion, AnimatePresence } from "framer-motion";


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
        ].join(':')
    );
}

export function ActivityRegisterPanel({ closeHandler }) {

    const { store, actions } = useContext(Context)
    const [habitIndex, setHabitIndex] = useState(0)
    const [stepIndex, setStepIndex] = useState(0)
    const [time, setTime] = useState('NOW')


    async function submmitHandler() {
        if (time == 'NOW') { 
            var reportTime = 'NOW'
        } else {
            var reportTime = new Date(time)
            //Getting date as string in ISO 8601 format for transmitting the data
            reportTime = reportTime.toISOString()
        }

        let stepId = store.habits[habitIndex].steps[stepIndex].id
        await actions.addReport(reportTime, stepId)
        closeHandler()
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={stl.backdrop}

        >
            <div className={`${stl.panel} ${stl2.panel}`}>
                <button className="btn" onClick={() => closeHandler()}><i class="bi bi-x-circle"></i></button>
                <div className="habito">
                    <label>Habito:</label>
                    <select
                        onChange={(e) => {
                            setHabitIndex(e.target.value)
                        }}>
                        {store.habits.map((e, i) => {
                            return (<>
                                <option value={i} key={i}>{e.name}</option>
                            </>)
                        })}
                    </select>
                    <label>Paso:</label>
                    <select
                        onChange={(e) => {
                            setStepIndex(e.target.value)
                        }}>
                        {store.habits[habitIndex]?.steps.map((e, i) => {
                            return (<>
                                <option value={i} key={i}>{e.name}</option>
                            </>)
                        })}
                    </select>
                    <label>Fecha y hora:</label>
                    <select onChange={(e) => {
                        if (e.target.value == 'NOW') {
                            setTime('NOW')
                        } else {
                            const [date, time] = formatDate(new Date()).split(' ');
                            setTime(date + 'T' + time)
                        }

                    }}>
                        <option value={'NOW'}>Ahora!</option>
                        <option value='datetime'>Fecha y hora</option>
                    </select>
                    {(time == 'NOW') ?
                        '' :
                        <input key={1} type='datetime-local' value={time} onChange={(e) => {
                            setTime(e.target.value)
                        }} />
                    }

                    <button className="btn" onClick={submmitHandler}>Registrar Actividad</button>
                </div>
            </div>
        </motion.div>
    )
}