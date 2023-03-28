import React, {useContext} from "react";
import { Context } from "../store/appContext";

export function DeleteHabitModal() {
    const { store, actions } = useContext(Context);
    

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
                    closeHandler()
                }}>Si</button>
                <button onClick={() => closeHandler()}>No</button>
            </div>
        </motion.div>
    )

}