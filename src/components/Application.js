import React from 'react';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';
import 'components/Application.scss';

export default function Application() {
  // Custom hook
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  // Creating an array of Appointment components to be rendered
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        interviewers={interviewers}
        {...appointment}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
        {/* Render array of Appointment components */}
        {schedule}
        {/* Add empty appointment slot at the end of each day */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
