import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";
import { TBMenu } from "./menu";
import stl from '../../styles/dashboard.module.css'

export function DeleteHabitConfirmationPanel({ closeHandler, habitName, habitId }) {
    const { store, actions } = useContext(Context);

    console.log(habitId)

    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={stl.backdrop}
        >
            <div className="stepContainer">
                <button onClick={() => closeHandler()}>x</button>
                <span> Realmente quieres borrar el habito {habitName}</span>
                <button onClick={() => {
                    console.log(habitId)
                    actions.deleteHabit(habitId)
                    closeHandler()}}>Si</button>
                <button onClick={() => closeHandler()}>No</button>
            </div>
        </motion.div>
    );
}

function HabitContaitner() {
    const { store, actions } = useContext(Context);
    const [active, setActive] = useState(-1)
    const [deleteConfirmation, setDeleteConfirmation] = useState(-1)


    

    const variants = {
        open: {
            height: 'auto',
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            },
        },
        closed: {
            height: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            },

        }
    }

    return (
        <div>
            {store.habits.map((e, i) => {
                return (<div key={i}>
                    <AnimatePresence>
                        {(deleteConfirmation == i) ?
                            <DeleteHabitConfirmationPanel closeHandler={() => setDeleteConfirmation(-1)} habitName={e.name} habitId={e.id} />
                            :
                            ''
                        }
                    </AnimatePresence>

                    <div className="tb-habit-header"
                        onClick={(e) => setActive(active == i ? -1 : i)}>
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
                                action: () => { setDeleteConfirmation(i) }
                            }]} />
                        </div>
                    </div>

                    <motion.div
                        animate={active == i ? "open" : "closed"}
                        variants={variants}
                        className="tb-habit-info">
                        <h3>Descripcion:</h3>
                        <p>{e.Descripcion}</p>
                        <h3>Pasos:</h3>
                        {e.steps.map((e) => (
                            <div>
                                <h4>{e.name}</h4>

                            </div>
                        )
                        )}
                    </motion.div>
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
        <div className="tb-habits-container">
            <h1>Tus Habitos:</h1>

            <HabitContaitner />

        </div>
    )
}