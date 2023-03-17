import { array } from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import stl from "../../styles/dashboard.module.css";
import stl2 from '../../styles/newhabitpanel.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

function ActivityRegisterPanel({ closeHandler }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={stl.backdrop}
    >
      <div className={stl.panel}>
        <button onClick={() => closeHandler()}>X</button>
        <label htmlFor="habito">Habito:</label>
        <select name="habito" id="habito">
          <option value="rigatoni">Rigatoni</option>
          <option value="dave">Dave</option>
          <option value="pumpernickel">Pumpernickel</option>
          <option value="reeses">Reeses</option>
        </select>

        <button>Registrar Actividad</button>
      </div>
    </motion.div>
  );
}

function Days({ days }) {
  return (
    <div className={stl.days}>
      {days?.map((e, i) => (
        <Day
          key={i}
          date={e.date}
          day={e.date.getDay()}
          week={
            thisWeekNumber -
            Math.floor(
              (e.date.getTime() - firstDay.getTime()) / 1000 / 86400 / 7
            )
          }
        />
      ))}
    </div>
  );
}



function Step({ setStep, index }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [repetition, setRepetition] = useState(0);
  const [time, setTime] = useState("day");
  const [weekCheckboxes, setWeekCheckboxes] = useState([false, false, false, false, false, false, false]);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleWeekCheckboxChange = (index) => {
    const newWeekCheckboxes = [...weekCheckboxes];
    newWeekCheckboxes[index] = !newWeekCheckboxes[index];
    setWeekCheckboxes(newWeekCheckboxes);
  };

  const data = {
    name,
    description,
    content,
    repetition,
    time,
    weekCheckboxes,
    startDate,
    endDate
  };


  return (
    <div className="paso">
      <h3>Paso 1</h3>
      <label>Nombre</label>
      <input type="text" value={name} onChange={(e) => {
        data.name = e.target.value
        setStep(index, data)
        setName(e.target.value)
      }} />
      <label>Descripción</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Contenido</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <div>
        <h2>Recurrencia</h2>
        <label>Se repite:</label>
        <input type="number" value={repetition} onChange={(e) => setRepetition(parseInt(e.target.value))} />
        <select name="time" id="time" value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="day">Dia</option>
          <option value="week">Semana</option>
          <option value="month">Mes</option>
          <option value="year">Ano</option>
        </select>
        <label>Empieza en:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>

      <div className={stl2.weekcheck}>
        {weekCheckboxes.map((checked, index) => (
          <input key={index} type="checkbox" checked={checked} onChange={() => handleWeekCheckboxChange(index)} />
        ))}
      </div>

      <label>Termina en:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </div>
  );
}



function HabitRegisterPanel({ closeHandler }) {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [description, serDescription] = useState("");
  const [steps, setSteps] = useState([0,])

  let stps = [{
    name: 'Nombre',
    description: 'Descripcion',
    content: 'Contenitdo',
    repetition: 'repeticion',
    time: 'week',
    weekCheckboxes: 'L',
    startDate: '',
    endDate: ''
  }]



  function test() {
    console.log('Testing:')
    console.log(stps)
  }

  function addPaso() {
    setSteps([...steps+steps[steps.length-1]])

  }

  function setStepData(index, data) {
    stps[index] = data
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={stl.backdrop}

    >
      <button onClick={e => test(e)}>TEST</button>
      <div className={`${stl.panel} ${stl2.panel}`}>
        <button onClick={() => closeHandler()}>X</button>
        <div className="habito">
          <label>Nombre</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <label>Decripción</label>
          <textarea onChange={(e) => serDescription(e.target.value)} />
        </div>
        <div className="pasos">
          <div></div>
          <h2>Pasos</h2>
          <button onClick={addPaso}>Agregar Paso</button>
          {steps.map((e, i) => {
            return (<Step key={i} setStep={setStepData} index={i}/>)
          })}

        </div>
        <button onClick={() => actions.addHabit(name, description)}>
          Registrar Habito
        </button>
      </div>
    </motion.div>
  );
}

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
  } else if (/*showPanel == "habit"*/true) {
    panel = <HabitRegisterPanel closeHandler={closePanelHandler} />;
  }

  return (
    <div className={stl.dashboard}>
      <AnimatePresence>{panel}</AnimatePresence>
      <div className={stl["dashboard-bar"]}>
        <button
          onClick={() => {
            showPanelHandler("activity");
          }}
        >
          Registrar Actividad
        </button>

        <button
          onClick={() => {
            showPanelHandler("habit");
          }}
        >
          Crear nuevo habito
        </button>
      </div>
      <div className={stl.year}>
        <WeekDays />
        <WeekNumbers />
        <Days days={store.registries} />
      </div>
    </div>
  );
}
