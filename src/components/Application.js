import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "components/Button";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState(prev => ({ ...prev, day }));

  const setDays = (days) => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then((response) => setDays(response.data))
      .catch((error) => console.log('LOGGING "error":', error));
  }, []);

  const appointmentList =
    Object.values(appointments)
      .map((appointment) => (
        <Appointment
          key={appointment.id}
          {...appointment}
        />
      )); 

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days || []}
          value={state.day || ""}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <Button confirm onClick={() => console.log('Button clicked!')}>Bouton</Button>
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}