import React from 'react';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';
import 'components/Appointment/styles.scss';

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
}) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    console.log('Calling bookInterview() ...');
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((reject) => console.log('REJECT: ', reject));
  };

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => console.log('Clicked onEdit')}
          onDelete={() => console.log('Clicked onDelete')}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}
