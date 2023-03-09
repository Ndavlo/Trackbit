import { array } from "prop-types";
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import stl from '../../styles/dashboard.module.css'
import { motion, AnimatePresence } from "framer-motion";

let year = 2023
let firstDay = new Date(year, 0, 1)
let regist = []

function WeekDays() {


    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
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
                        <span>{i}</span>
                    </div>)
            })}
        </div>
    )
}

function Day({ day, week }) {
    return <div className={stl.cell}
        style={{ 'gridArea': `${week}/${day}/${week}/${day}` }}
    >
        <CellBar percentage={50} />
    </div>
}
function CellBar({ percentage }) {
    return <div className={stl['cell-bar']}>
        <div style={{ width: `${percentage}%` }}></div>
    </div>
}

function ActivityRegister() {
    return (
        <div>
            <label for="habito">Habito:</label>
            <select name="habito" id="habito">
                <option value="rigatoni">Rigatoni</option>
                <option value="dave">Dave</option>
                <option value="pumpernickel">Pumpernickel</option>
                <option value="reeses">Reeses</option>
            </select>

            <button>Registrar Actividad</button>
        </div>
    )
}

function Days({ days }) {
    return (
        <div className={stl.days}>
            {days.map((e, i) => <Day key={i} day={e.day} week={e.week} />)}
        </div>
    )

}

export function Dashboard() {
    const [registries, setRegitries] = useState(regist)
    const { store, actions } = useContext(Context);

    return (
        <div className={stl.dashboard}>
            <div className={stl['dashboard-bar']}>
                <button
                    onClick={() => {
                        let now = new Date()
                        let registry = {
                            time: now,
                            day: now.getDay(),
                            week: Math.ceil((now.getTime() - firstDay.getTime()) / 1000 / 86400 / 7),
                            week2: (now.getTime() - firstDay.getTime()) / 604800000
                        }
                        console.log(registry)
                        setRegitries([...registries, registry])
                    }}
                >Registrar Actividad</button>
            </div>
            <div className={stl.year}>
                <WeekDays />
                <WeekNumbers />
                <Days days={registries} />
            </div>
        </div>
    )
}