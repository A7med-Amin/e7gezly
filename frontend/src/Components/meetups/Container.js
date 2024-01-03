import "./container.css";
import Seat from "./Seat";
import "../../pages/Globalvariable";
import "../../pages/Globalvariable2";
function Container(propes) {
  const newArrReserved = JSON.parse(
    localStorage.getItem("arrreserved") || "[]"
  );

  const arr = [];
  for (var i = 0; i < propes.no; i++) {
    arr.push(i);
  }

  return (
    <div className="rows balls">
      {arr.map(
        (user) => (
          newArrReserved.map((items) => {
            items.row === propes.row && items.seat === user
              ? (global.statee = items.seat_status)
              : (items.seat_status = items.seat_status);
          }),
          (
            <Seat
              rown={propes.row}
              coln={user}
              state={global.statee}
              role={propes.role}
            ></Seat>
          )
        )
      )}
    </div>
  );
}
export default Container;
