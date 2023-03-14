import { array } from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from '../../styles/dashboard.module.css'
import { motion, AnimatePresence } from "framer-motion";

let year = 2023
let firstDay = new Date(year, 0, 1)
let regist = []
let today = new Date()
const oneDay = 86400000
const oneWeek = oneDay * 7
const thisWeekNumber = Math.ceil((Date.now() - firstDay.getTime()) / 1000 / 86400 / 7)

function WeekDays() {


    const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    return (
        <div className={stl.weekdays}>
            {weekDays.map((e, i) => {
                return (<div className={`${stl.weekday}  ${stl.cell}`} key={i}><span>{e}</span></div>)
            })}
        </div>
    )
}

function WeekNumbers() {
    let arr = Array.from({ length: 54 }, (x, i) => i)
    return (
        <div className={stl.weeknumbers}>
            {arr.map((e, i) => {
                return (
                    <div key={i} className={stl.cell}>
                        <span>{thisWeekNumber - i}</span>
                    </div>)
            })}
        </div>
    )
}

function Day({ day, week, date }) {
    const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    return <div className={`${stl.cell} ${stl.day}`}
        style={{ 'gridArea': `${week}/${day + 1}/${week}/${day + 1}` }}
    >
        <CellBar percentage={50} />
        <span>{`${weekDays[day]}-${new Intl.DateTimeFormat('en-US', { month: "short" }).format(date)}-${date.getDate()}`}</span>
    </div>
}
function CellBar({ percentage }) {
    return <div className={stl['cell-bar']}>
        <div style={{ width: `${percentage}%` }}></div>
    </div>
}

function ActivityRegisterPanel({ closeHandler }) {
    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={stl.backdrop}
        >
            <div className={stl.panel}>
                <button onClick={() => closeHandler()}>X</button>
                <label htmlFor="habito">Habito:</label>
                <select name="habito" id="habito">
                    <option value="rigatoni">Rigatoni</option>
                    <option value="dave">Dave</option>
                    <option value="pumpernickel">Pumpernickel</option>
                    <option value="reeses">Reeses</option>
                </select>


                <button>Registrar Actividad</button>
            </div>
        </motion.div>

    )
}

function Days({ days }) {
    return (
        <div className={stl.days}>
            {days?.map((e, i) => <Day
                key={i}
                date={e.date}
                day={e.date.getDay()}
                week={thisWeekNumber - Math.floor((e.date.getTime() - firstDay.getTime()) / 1000 / 86400 / 7)}
            />)}
        </div>
    )

}

function HabitRegisterPanel({ closeHandler }) {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('')
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={stl.backdrop}
        >
            <div className={stl.panel}>
                <button onClick={() => closeHandler()}>X</button>
                <label>Nombre</label>
                <input type='text' onChange={(e)=>setName(e.target.value)}/>
                <label htmlFor="habito">Habito:</label>
                <select name="habito" id="habito">
                    <option value="rigatoni">Rigatoni</option>
                    <option value="dave">Dave</option>
                    <option value="pumpernickel">Pumpernickel</option>
                    <option value="reeses">Reeses</option>
                </select>

                <button onClick={()=>actions.addHabit(name)}>Registrar Actividad</button>
            </div>
        </motion.div>
    )

}

export function Dashboard() {
    // const [registries, setRegitries] = useState(regist)
    const [showPanel, setShowPanel] = useState(false)
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getRegistries()
    }, [])

    function showPanelHandler(panelName) {
        setShowPanel(panelName)
    }
    function closePanelHandler() {
        setShowPanel(false)
    }

    let panel = []
    if (showPanel == 'activity') {
        panel = <ActivityRegisterPanel closeHandler={closePanelHandler} />
    } else if (showPanel == 'habit') {
        panel = <HabitRegisterPanel closeHandler={closePanelHandler} />
    }

    return (
        <div className={stl.dashboard}>
            <AnimatePresence>
                {panel}
            </AnimatePresence>
            <div className={stl['dashboard-bar']}>
                <button
                    onClick={() => {
                        showPanelHandler('activity')
                    }}
                >Registrar Actividad</button>

                <button
                    onClick={() => {
                        showPanelHandler('habit')
                    }}
                >Crear nuevo habito</button>

            </div>
            <div className={stl.year}>
                <WeekDays />
                <WeekNumbers />
                <Days days={store.registries} />
            </div>
        </div>
    )
}