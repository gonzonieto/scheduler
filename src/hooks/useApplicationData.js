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
    // Request data from our 3 API endpoints
    Promise.all([
      axios.get('https://scheduler-api-test.herokuapp.com/api/days'),
      axios.get('https://scheduler-api-test.herokuapp.com/api/appointments'),
      axios.get('https://scheduler-api-test.herokuapp.com/api/interviewers'),
    ])
      .then((all) => {
        // Use the data returned by the API endpoints to update state
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => console.log('LOGGING "error":', error));
  }, []);

  // Returns an integer representing the number of open appointment slots for the given day
  const countSpots = (state, dayIndex) => {
    const appointments = getAppointmentsForDay(
      state,
      state.days[dayIndex].name
    );
    // Count the number of appointment slots that are empty
    return appointments.reduce((a, appt) => a + (appt.interview === null), 0);
  };

  // Takes an appointment ID and returns the index of the day which contains that interview
  const getDayIndexByAppointmentId = (id) => {
    return state.days.findIndex((day) => day.appointments.includes(id));
  };

  // Updates the number of open spots for a given day
  const updateSpots = (appointmentID) => {
    // Get the index of the day being updated
    const dayIndex = getDayIndexByAppointmentId(appointmentID);

    // TODO - update with useReducer
    setState((prev) => {
      // Copy existing array of days in state and update spots count
      const days = [...prev.days];
      days[dayIndex].spots = countSpots(prev, dayIndex);

      // Return updated state object
      return { ...prev, days };
    });
  };

  // Book a new interview and write it to the database
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

    // Write the new interview to the database
    return axios
      .put(
        `https://scheduler-api-test.herokuapp.com/api/appointments/${id}`,
        appointment
      )
      .then(() => {
        // TODO - update with useReducer
        setState({ ...state, appointments });
        updateSpots(id);
      });
  };

  // This function deletes an interview from the database by using the id to find the right appointment slot, and setting its 'interview' property to null
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // TODO - update with useReducer
    return axios
      .delete(`https://scheduler-api-test.herokuapp.com/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
        updateSpots(id);
      });
  };

  // TODO - update with useReducer
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  return { state, setDay, bookInterview, cancelInterview };
}
