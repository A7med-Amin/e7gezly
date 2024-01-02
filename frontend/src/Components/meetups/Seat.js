import { useState } from "react";
import "./container.css";
import "../../pages/Globalvariable";
import "../../pages/Globalvariable2";
function Seat(probes) {
  const [btnstate, setbtnstate] = useState(probes.state);
  function btnhandler() {
    if (btnstate === false) {
      localStorage.setItem(
        "count_of_seats",
        localStorage.getItem("count_of_seats") + 1
      );
    } else {
      localStorage.setItem(
        "count_of_seats",
        localStorage.getItem("count_of_seats") - 1
      );
    }
    setbtnstate((btnstate) => !btnstate);
    for (let i = 0; i < global.arrreserved.length; i++) {
      if (
        global.arrreserved[i].row === probes.rown &&
        global.arrreserved[i].seat === probes.coln
      ) {
        global.arrreserved[i].seat_status = !btnstate;
      }

      console.log(`the count is: ${localStorage.getItem("count_of_seats")}`);
    }
    console.log(`${probes.rown},${probes.coln}`);
  }
  let toggleclass = btnstate ? " occupied" : null;

  return (
    <button
      disabled={
        probes.state === true || probes.role === "G" || probes.role === "M"
          ? "disabled"
          : ""
      }
      className={`seat ${toggleclass}`}
      onClick={btnhandler}
      value={`${probes.rown},${probes.coln}`}
    ></button>
  );
}
export default Seat;
