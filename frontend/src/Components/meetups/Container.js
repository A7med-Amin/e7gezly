import "./container.css";
import Seat from "./Seat";
import "../../pages/Globalvariable";
import "../../pages/Globalvariable2";
import { useEffect } from "react";
function Container(propes) {
  const newArrReserved = JSON.parse(
    localStorage.getItem("arrreserved") || "[]"
  );

  const arr = [];
  for (var i = 0; i < propes.no; i++) {
    arr.push(i);
  }
  useEffect(() => {}, [newArrReserved]);
  return (
    <div className="rows balls">
      {arr.map((user) => {
        let state = null;
        newArrReserved.forEach((items) => {
          if (items.row === propes.row && items.seat === user) {
            state = items.seat_status;
          }
        });
        return (
          <Seat
            rown={propes.row}
            coln={user}
            state={state}
            role={propes.role}
          ></Seat>
        );
      })}
    </div>
  );
}
export default Container;
