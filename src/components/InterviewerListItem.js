import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

function InterviewerListItem(props){
  // id:integer, name:string, avatar:url
  const { id, name, avatar, selected, setInterviewer} = props;

  const interviewerListItemClasses = classNames({"interviewers__item--selected": selected});

  return(
    <li className={interviewerListItemClasses} onClick={() => setInterviewer(id)}>
      <img
        key={id}
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};
export default InterviewerListItem