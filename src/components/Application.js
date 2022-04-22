import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "components/Button";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      // console.log('DAYS');
      // console.log(all[0].data);
      // console.log('APPOINTMENTS');
      // console.log(Object.values(all[1].data));
      // console.log('INTERVIEWERS');
      // console.log(Object.values(all[2].data));
      setState((prev) => ({ ...prev, days: all[0].data, appointments: Object.values(all[1].data) }));
    })
    .catch((error) => console.log('LOGGING "error":', error));
  }, []);

  const schedule =
    appointments
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}