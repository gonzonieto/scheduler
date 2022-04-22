export function getAppointmentsForDay(state, day) {
  const result = [];
  const selectedDay = state.days.find((item) => item.name === day);

  if (selectedDay) {
    result.push(...selectedDay.appointments.map((appointment) => state.appointments[appointment]));
  }

  return result;
}