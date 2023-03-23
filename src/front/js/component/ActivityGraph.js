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
let regist = [];
let today = new Date();
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

function Day({ day, week, date }) {
    const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
    return (
        <div
            className={`${stl.cell} ${stl.day}`}
            style={{ gridArea: `${week}/${day + 1}/${week}/${day + 1}` }}
        >
            <CellBar percentage={50} />
            <span>{`${weekDays[day]}-${new Intl.DateTimeFormat("en-US", {
                month: "short",
            }).format(date)}-${date.getDate()}`}</span>
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


function Days({ days }) {
    return (
        <div className={stl.days}>
            {days?.map((e, i) => {
                const time = new Date(e.date)
                return (
                    <Day
                        key={i}
                        date={time}
                        day={time.getDay()}
                        week={
                            thisWeekNumber -
                            Math.floor(
                                (time.getTime() - firstDay.getTime()) / 1000 / 86400 / 7
                            )
                        }
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
        actions.getReports()
    }, [store.accessToken])

    return (
        <div className={stl.year}>
            <WeekDays />
            <WeekNumbers />
            <Days days={store.reports} />
        </div>
    )
}