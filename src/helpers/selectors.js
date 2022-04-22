export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((item) => item.name === day);

  if (!state.days || !selectedDay) return [];
  
  return selectedDay.appointments.map(
    appointmentID => state.appointments.find(appointment => appointment.id === appointmentID)
  )
};

// export function getInterview(state, interview) {
//   return interview
//     ? {student: interview.student, interviewer: state.interviewers[interview.interviewer - 1]}
//     : null;
// };