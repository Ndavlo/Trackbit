import { motion, AnimatePresence } from "framer-motion";
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { HabitRegisterPanel } from "./HabitRegiterPanel";
import { DeleteHabitPanel } from "./deleteHabitPanel";



export function ModalDisplay() {
    const { store, actions } = useContext(Context);

    const modals = {
        newHabit: <HabitRegisterPanel data={store.modal?.data} closeHandler={closeHandler} />,
        deleteHabit: <DeleteHabitPanel data={store.modal?.data} closeHandler={closeHandler}/>
    }

    function closeHandler() {
        actions.closeModal()
    }

    const panel = <div></div>

    return (
        <AnimatePresence>
            {
                store.modal ?
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 100
                        }}
                        className='tb-backdrop'
                    >

                        {modals[store.modal.modal]}
                    </motion.div>
                    :
                    null

            }
        </AnimatePresence>
    )

}