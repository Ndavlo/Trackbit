import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";



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
    const { store, actions } = useContext(Context);
    const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
    const time = new Date(date)
    const day = time.getDay()
    const week = thisWeekNumber - Math.floor((time.getTime() - firstDay.getTime()) / 1000 / 86400 / 7)

    const [expanded, setExpanded] = useState(false)

    let bars = data.reduce((a, e) => {
        let index = a.findIndex((ele) => ele.habitId == e.habit_id)
        if (index != -1) {
            a[index].events.push(e)
        } else {
            a.push({
                habitId: e.habit_id,
                habitName: e.habit_name,
                habitOrder : e.habit_order,
                events: [e]
            })
        }
        return a
    },
        [])

    return (
        <div
            className={expanded ? `expanded-day` : `${stl.cell} ${stl.day}`}
            style={{ gridArea: `${week}/${day + 1}/${week}/${day + 1}` }}
            onClick={!expanded ? (e) => {
                setExpanded(!expanded)
            } : null}
        >
            <span>{time.toLocaleString('es-US', { month: "short", day: 'numeric', weekday: 'short' })}</span>
            <span className="close-x" onClick={expanded ? (e) => {
                setExpanded(!expanded)
            } : null}>X</span>
            {bars.sort((a,b)=>(a.habitId>b.habitId)?1:-1).map((e, i) => {
                return (
                    <div className='h-bar' key={i}>
                    <span>{e.habitName}</span>
                        {e.events.sort((a,b)=>(a.id>b.id)?1:-1).map((ele, ind) => {
                            return (<div key={ind}style={(ele.done)?{backgroundColor : ele.habit_color}:{}}
                                onClick={
                                    expanded ? (e) => { actions.setTaskDone(ele.id, !ele.done) } : null
                                }></div>)
                        })}
                    </div>
                )
            })}

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