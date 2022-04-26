import React from 'react';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Error from 'components/Appointment/Error';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from 'hooks/useVisualMode';
import 'components/Appointment/styles.scss';

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const CONFIRM_DELETE = 'CONFIRM_DELETE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const confirmDestroy = () => {
    transition(CONFIRM_DELETE);
  };

  const destroy = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const edit = () => {
    transition(EDIT);
  };

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show {...interview} onEdit={edit} onDelete={confirmDestroy} />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={save} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Saving ..." />}
      {mode === DELETING && <Status message="Deleting ..." />}
      {mode === ERROR_DELETE && (
        <Error
          message="Unable to delete this appointment."
          onClose={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Unable to update appointment details."
          onClose={() => transition(interview ? SHOW : EMPTY)}
        />
      )}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onConfirm={destroy}
          onCancel={back}
        />
      )}
    </article>
  );
}
