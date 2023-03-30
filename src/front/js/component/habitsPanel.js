import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";
import { TBMenu } from "./menu";
import stl from '../../styles/dashboard.module.css'


function HabitContaitner() {
    const { store, actions } = useContext(Context);
    const [active, setActive] = useState(-1)
    const [deleteConfirmation, setDeleteConfirmation] = useState(-1)

    return (
        <div className="tb-habits-container">
            {store.habits.map((e, i) => {
                return (
                    <div key={i}>
                        <AnimatePresence>
                            {(deleteConfirmation == i) ?
                                <DeleteHabitConfirmationPanel closeHandler={() => setDeleteConfirmation(-1)} habitName={e.name} habitId={e.id} />
                                :
                                ''
                            }
                        </AnimatePresence>
                        <div className="tb-habit-header"
                            onClick={() => setActive(active == i ? -1 : i)}>
                            <h2>{e.name}</h2>
                            <div>
                                <div className="tb-habit-color"
                                    onClick={(ele) => {
                                        ele.stopPropagation()
                                        actions.setHAbitColor(
                                            e.id,
                                            '#' + Math.floor(Math.random() * 256 * 256 * 256).toString(16))
                                    }
                                    }
                                    style={{ backgroundColor: `${e.color}` }}></div>
                                <TBMenu menuTitle='...' options={[{
                                    option: 'Borrar Habito',
                                    action: () => { actions.showModal('deleteHabit', { id: e.id, name: e.name }) }
                                }]} />
                            </div>
                        </div>
                        <AnimatePresence>
                            {active == i ?
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div className="tb-habit-info">
                                        <h3>Descripcion:</h3>
                                        <p>{e.description}</p>
                                        <h3>Pasos:</h3>
                                        {e.steps.map((step, ind) => (
                                            <div key={ind}>
                                                <h4>{step.name}</h4>
                                                <div className="tb-step-bar">
                                                    {
                                                        Array.apply(null, Array(step.total_events)).map((el, iin) => {
                                                            return (<div key={iin} style={iin >= step.done_count ? {} : { backgroundColor: e.color }} />)
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                        )}
                                    </div>
                                </motion.div> : null}

                        </AnimatePresence>
                    </div>)
            }
            )



            }
        </div>
    )


}


export function HabitsPanel() {
    const { store, actions } = useContext(Context);



    function deleteHabit(id) {
        actions.deleteHabit(id)
    }
    useEffect(() => {
        if (store.accessToken === null) return
        actions.getHabits()
    }, [store.accessToken])

    return (
        <div className="tb-hbt-section">
            <h1>Tus Habitos:</h1>

            <HabitContaitner />

        </div>
    )
}