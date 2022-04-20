import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

function DayListItem(props){
  const { name, spots, selected, setDay } = props;

  const dayListItemClasses = classNames(
    'day-list__item',
    {'day-list__item--selected': (selected)},
    {'day-list__item--full': (spots === 0)}
  );

  const formatSpots = (spots) => {
    if (!spots) return "no spots remaining";
    if (spots === 1) return "1 spot remaining";
    return `${spots} spots remaining`;
  };

  return(
    <li className={dayListItemClasses} onClick={() => setDay(name)}>
      <h2>{name}</h2>
      <h3>{formatSpots(spots)}</h3>
    </li>
  );
};
export default DayListItem