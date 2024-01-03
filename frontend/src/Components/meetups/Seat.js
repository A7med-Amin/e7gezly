import { useEffect, useState } from "react";
import "./container.css";
import "../../pages/Globalvariable";
import "../../pages/Globalvariable2";
function Seat(probes) {
  const [btnstate, setbtnstate] = useState(probes.state);

  function btnhandler() {
    const countOfSeats = parseInt(localStorage.getItem("count_of_seats") || 0);
    const user_seats = JSON.parse(localStorage.getItem("user_seats") || "[]");
    const arrreserved = JSON.parse(localStorage.getItem("arrreserved") || "[]");

    if (btnstate === false) {
      localStorage.setItem("count_of_seats", countOfSeats + 1);

      user_seats.push({
        row: probes.rown,
        seat: probes.coln,
        seat_status: true,
      });
    } else {
      localStorage.setItem("count_of_seats", countOfSeats - 1);
      for (let i = 0; i < user_seats.length; i++) {
        // If seat is already reserved, remove it
        if (
          user_seats[i].row === probes.rown &&
          user_seats[i].seat === probes.coln
        ) {
          user_seats.splice(i, 1);
        }
      }
    }

    setbtnstate((btnstate) => !btnstate);

    arrreserved.forEach((items) => {
      if (items.row === probes.rown && items.seat === probes.coln) {
        items.seat_status = btnstate;
      }
    });

    localStorage.setItem("arrreserved", JSON.stringify(arrreserved));
    localStorage.setItem("user_seats", JSON.stringify(user_seats));
  }

  let toggleclass = btnstate ? " occupied" : null;
  useEffect(() => {
    setbtnstate(probes.state);
  }, [probes.state]);
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
