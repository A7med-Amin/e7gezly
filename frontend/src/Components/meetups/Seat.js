import { useState } from "react";
import "./container.css";
import "../../pages/Globalvariable";
import "../../pages/Globalvariable2";
function Seat(probes) {
  const [btnstate, setbtnstate] = useState(probes.state);

  function btnhandler() {
    const countOfSeats = parseInt(localStorage.getItem("count_of_seats") || 0);
    const newArrReserved = JSON.parse(localStorage.getItem("arrreserved") || '[]');

    if (btnstate === false) {
      localStorage.setItem("count_of_seats", countOfSeats + 1);
    } else {
      localStorage.setItem("count_of_seats", countOfSeats - 1);
    }

    setbtnstate((btnstate) => !btnstate);
    for (let i = 0; i < newArrReserved.length; i++) {
      if (
        newArrReserved[i].row === probes.rown &&
        newArrReserved[i].seat === probes.coln
      ) {
        newArrReserved[i].seat_status = !btnstate;
      }
    }

    localStorage.setItem("arrreserved", JSON.stringify(newArrReserved));
    console.log(newArrReserved);
    console.log(`the count is: ${localStorage.getItem("count_of_seats")}`);
    console.log(`${probes.rown},${probes.coln}`);
  }

  let toggleclass = btnstate ? " occupied" : null;

  return (
    <button
      disabled={
        probes.state === true || probes.role === "G" || probes.role === "M"
      }
      className={`seat ${toggleclass}`}
      onClick={btnhandler}
      value={`${probes.rown},${probes.coln}`}
    ></button>
  );
}
export default Seat;
