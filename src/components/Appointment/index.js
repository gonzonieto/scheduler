import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss";

export default function Appointment({ time, interview }){
  // const formatAppointmentString = (time) => {
  //   return time ? `Appointment at ${time}` : "No Appointments";
  // };

  return(
    <article className="appointment">
      <Header time={time}>
      </Header>
      {interview ? <Show /> : <Empty />}
    </article>
  );
};