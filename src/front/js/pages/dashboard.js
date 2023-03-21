import { array } from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";
import stl2 from '../../styles/newhabitpanel.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HabitRegisterPanel } from "../component/HabitRegiterPanel";
import { ActivityGraph } from "../component/ActivityGraph";
import { ActivityRegisterPanel } from "../component/activityRegisterPanel";
import { HabitsPanel } from "../component/habitsPanel";

export function Dashboard() {
  // const [registries, setRegitries] = useState(regist)
  const [showPanel, setShowPanel] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()


  useEffect(() => {
    if (store.accessToken === null) return
    if (store.accessToken == '') {
      navigate('/')
    }
  }, [store.accessToken])

  useEffect(() => {
    actions.getRegistries();
  }, []);

  function showPanelHandler(panelName) {
    setShowPanel(panelName);
  }
  function closePanelHandler() {
    setShowPanel(false);
  }

  let panel = [];
  if (showPanel == "activity") {
    panel = <ActivityRegisterPanel closeHandler={closePanelHandler} />;
  } else if (showPanel == "habit") {
    panel = <HabitRegisterPanel closeHandler={closePanelHandler} />;
  }

  return (
    <div className={stl.dashboard}>
      <div className="container pt-3 pb-5" id="dashContainer">

        <div className="row">
          <div className="col-12 col-md-6">
          <AnimatePresence>{panel}</AnimatePresence>
          <div className={stl["dashboard-bar"]}>
          <button className="btn mb-3"
              onClick={() => {
                []
                showPanelHandler("habit");
              }}
            >
              Crear nuevo habito
            </button>
            <button className="btn mb-3"
              onClick={() => {
                showPanelHandler("activity");
              }}
            >
              Registrar Actividad
            </button>
          </div>
        <ActivityGraph />
          </div>
          <div className="col-12 col-md-6">
        <HabitsPanel />
          </div>
          </div>
        </div>
      </div>
      );
}
