export function getAppointmentsForDay(state, day) {
  const result = [];
  const selectedDay = state.days.find((item) => item.name === day);

  if (selectedDay) {
    result.push(...selectedDay.appointments.map((appointmentID) => state.appointments.find((appointment) => appointment.id === appointmentID)));
  }

  return result;
};

// export function getInterview(state, interview) {
//   return interview
//     ? {student: interview.student, interviewer: state.interviewers[interview.interviewer - 1]}
//     : null;
// };