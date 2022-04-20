import React from "react";
import DayListItem from "components/DayListItem";

function DayList(props){
  const { days, day, setDay } = props;

  const dayList = days.map((item) => (
    <DayListItem
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === day}
      setDay={() => setDay(item.name)}
    />
  ));
  
  return(
    <ul>
      {dayList}
    </ul>
  );
};
export default DayList