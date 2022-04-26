import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from 'components/Button';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';

import 'components/Application.scss';

export default function Application() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => console.log('LOGGING "error":', error));
  }, []);

  const bookInterview = (id, interview) => {
    // This function creates new appointment object with the details of the interview that was booked, makes an axios PUT request to update the appointment in the database, updates state, and returns a Promise for the axios PUT request so the Appointment component that called this function can transition view modes once the database has been updated.

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments });
      })
      .catch((error) => {
        console.log(`Axios error to PUT /appointments/${id}`, error);
      });
  };

  const cancelInterview = (id) => {
    // This function deletes an interview from the database by using the id to find the right appointment slot, and setting its 'interview' property to null
  };

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        interviewers={interviewers}
        {...appointment}
        interview={interview}
        bookInterview={bookInterview}
      />
    );
  });

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
            value={state.day || ''}
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
        <Button confirm onClick={() => console.log('Button clicked!')}>
          Bouton
        </Button>
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
