import React from "react";

export default function Confirm(){
  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold"></h1>
      <section className="appointment__actions">
        <Button danger></Button>
        <Button danger></Button>
      </section>
    </main>
  );
};