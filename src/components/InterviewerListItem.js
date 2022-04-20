import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

function InterviewerListItem(props){
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerListItemClasses = classNames(
    {"interviewers__item--selected": selected}
  );

  return(
    <li className={interviewerListItemClasses} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {(selected && name)}
    </li>
  );
};
export default InterviewerListItem