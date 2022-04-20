import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss"

function InterviewerList(props){
  const { interviewers, setInterviewer, interviewer} = props;

  const interviewerList = interviewers.map((item) => (
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={item.id === interviewer}
      setInterviewer={() => setInterviewer(item.id)}
    />
  ));

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
};
export default InterviewerList