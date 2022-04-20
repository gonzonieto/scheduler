import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props){
  const formatAppointmentString = (time) => {
    return time ? `Appointment at ${time}` : "No Appointments";
  };

  return(
    <article className="appointment">{formatAppointmentString(props.time)}</article>
  );
};