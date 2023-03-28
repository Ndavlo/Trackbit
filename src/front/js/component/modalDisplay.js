import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { HabitRegisterPanel } from "./HabitRegiterPanel";

export function ModalDisplay() {
    const { store, actions } = useContext(Context);

    const modals = {
        newHabit: HabitRegisterPanel,
        deleteHabit: ';' 

    }

    const panel = <div></div>

    return (
        <div>
            <panel/>
        </div>
    )

}