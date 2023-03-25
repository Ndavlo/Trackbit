import { array } from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";
import stl2 from '../../styles/newhabitpanel.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HabitRegisterPanel } from "../component/HabitRegiterPanel";


let year = 2023;
let firstDay = new Date(year, 0, 1);
const oneDay = 86400000;
const oneWeek = oneDay * 7;
const thisWeekNumber = Math.ceil(
    (Date.now() - firstDay.getTime()) / 1000 / 86400 / 7
);

function WeekDays() {
    const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
    return (
        <div className={stl.weekdays}>
            {weekDays.map((e, i) => {
                return (
                    <div className={`${stl.weekday}  ${stl.cell}`} key={i}>
                        <span>{e}</span>
                    </div>
                );
            })}
        </div>
    );
}

function WeekNumbers() {
    let arr = Array.from({ length: 54 }, (x, i) => i);
    return (
        <div className={stl.weeknumbers}>
            {arr.map((e, i) => {
                return (
                    <div key={i} className={stl.cell}>
                        <span>{thisWeekNumber - i}</span>
                    </div>
                );
            })}
        </div>
    );
}

function Day({ date, data }) {
    const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
    const time = new Date(date)
    const day = time.getDay()
    const week = thisWeekNumber - Math.floor((time.getTime() - firstDay.getTime()) / 1000 / 86400 / 7)

    let bars = data.reduce((a, e) => {
        a[e.habit_id] = a[e.habit_id] ? [...a[e.habit_id], e] : [e]
        return a
    },
        {})

    let bars_sections= []
    for (let x in bars) {
        bars_sections.push(<div className="h-bar">
            {bars[x].map((e, i)=><div key={i} className="h-bar-section"></div>)}
            </div>)
    }

    return (
        <div
            className={`${stl.cell} ${stl.day}`}
            style={{ gridArea: `${week}/${day + 1}/${week}/${day + 1}` }}
        >
            {bars_sections}


        </div>
    );
}
function CellBar({ percentage }) {
    return (
        <div className={stl["cell-bar"]}>
            <div style={{ width: `${percentage}%` }}></div>
        </div>
    );
}


function Days() {
    const { store, actions } = useContext(Context);

    return (
        <div className={stl.days}>
            {store.events?.map((e, i) => {
                return (
                    <Day
                        key={i}
                        date={e.date}
                        data={e.events}
                    />
                )
            })}
        </div>
    );
}

export function ActivityGraph() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.accessToken) return
        actions.getEvents()
    }, [store.accessToken])

    return (
        <div className={stl.year}>
            <WeekDays />
            <WeekNumbers />
            <Days />
        </div>
    )
}