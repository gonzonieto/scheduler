import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from 'helpers/selectors';

export default function useApplicationData() {
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

  const updateSpots = (appointmentID) => {
    setState((prev) => {
      // Get the index of the day being updated
      const dayIndex = prev.days.findIndex((day) =>
        day.appointments.includes(appointmentID)
      );

      // Count number of spots where `interview` property is null
      const spots = getAppointmentsForDay(
        prev,
        prev.days[dayIndex].name
      ).reduce((a, appointment) => a + (appointment.interview === null), 0);

      // Create new day object with updates spots count
      const newDay = { ...prev.days[dayIndex], spots };

      // Copy existing array of days in state
      const days = [...prev.days];

      // Update the day
      days[dayIndex] = newDay;

      // Create new state object with updated days array
      const newState = { ...prev, days };

      return newState;
    });
  };

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
        // updateSpots(id);
      });
  };

  const cancelInterview = (id) => {
    // This function deletes an interview from the database by using the id to find the right appointment slot, and setting its 'interview' property to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
        updateSpots(id);
      });
  };

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  return { state, setDay, bookInterview, cancelInterview };
}
