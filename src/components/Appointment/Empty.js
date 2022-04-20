import React from "react";

function Empty({onAdd}){
  return(
    <main onClick={onAdd}  className="appointment__add">
      <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add" />
    </main>
  );
};
export default Empty