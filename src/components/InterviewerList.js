import React from "react";

import "components/InterviewerList.scss"

function InterviewerList(props){
  const { interviewers, setInterviewer, interviewer} = props;
  
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
};
export default InterviewerList