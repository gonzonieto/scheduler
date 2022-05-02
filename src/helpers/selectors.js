export function getAppointmentsForDay(state, today) {
  const selectedDay = state.days.find((day) => day.name === today);

  // Return an empty array if there are no days or if the selected day is not found
  if (!state.days || !selectedDay) return [];

  const todaysAppointmentIDs = selectedDay.appointments;
  const appointmentsArray = Object.values(state.appointments);

  // map the array of appointment IDs into an array of appointment objects
  return todaysAppointmentIDs.map((id) =>
    appointmentsArray.find((appointment) => appointment.id === id)
  );
}

export function getInterviewersForDay(state, today) {
  const interviewers = state.interviewers;
  const selectedDay = state.days.find((day) => day.name === today);

  // Return an empty array if there are no interviewers or if the selected day is not found
  if (!Object.keys(interviewers).length || !selectedDay) return [];

  const todaysInterviewerIDs = selectedDay.interviewers;

  //map the array of interviewer IDs into an array of interviewer objects
  return todaysInterviewerIDs.map((id) => interviewers[id]);
}

export function getInterview(state, interview) {
  // if there is no interview in this timeslot, return null
  if (!interview) return null;

  // interview is an Object with student:String, interviewer:integer
  // this function returns an Object with student:String, interviewer:Object

  const result = {};
  const interviewerID = interview.interviewer;
  const interviewers = Object.values(state.interviewers);

  result.student = interview.student;
  result.interviewer = interviewers.find(
    (interviewer) => interviewer.id === interviewerID
  );

  return result;
}
