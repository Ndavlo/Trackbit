import React from "react";
import stl from '../../styles/dashboard.module.css'

export function Dashboard (){
    return (
        <div className={stl.dashboard}>
            <div className={stl.year}></div>
        </div>
    )
}