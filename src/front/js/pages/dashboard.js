import React from "react";
import stl from '../../styles/dashboard.module.css'

function WeekDays() {
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    return (
        <div className={stl.weekdays}>
            {weekDays.map((e, i)=>{
                return(<div className={`${stl.weekday}  ${stl.cell}`} key={i}><span>{e}</span></div>)
            })}
        </div>
    )
}

export function Dashboard() {
    return (
        <div className={stl.dashboard}>
            <div className={stl.year}>
                {<WeekDays/>}
                <div className={stl.weeknumbers}></div>
                <div className={stl.days}>2</div>
            </div>
        </div>
    )
}