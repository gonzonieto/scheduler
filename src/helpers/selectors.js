export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((item) => item.name === day);

  if (!state.days || !selectedDay) return [];

  // from the array of appointments for the selected day, 
  return selectedDay.appointments.map(
    appointmentID => Object.values(state.appointments).find(
      appointment => appointment.id === appointmentID
    )
  )
};

export function getInterview(state, interview) {
  if (!interview) return null;
  // interview is an Object with student:String, interviewer:integer
  // this function returns an Object with student:String, interviewer:Object
  
  const result = {};
  const interviewerID = interview.interviewer;
  const interviewers = Object.values(state.interviewers);
  
  result.student = interview.student;
  result.interviewer = interviewers.find(interviewer => interviewer.id === interviewerID);
  
  return result;
};