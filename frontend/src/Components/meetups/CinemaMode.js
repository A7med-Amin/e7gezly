import "./container.css";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import "../../pages/Globalvariable";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function Reservation(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  const navigate = useNavigate();
  global.arrreserved = props.matchData;
  console.log(global.arrreserved);
  function Purchasehandler() {
    console.log(`The purchase: ${localStorage.getItem("count_of_seats")}`);
    if (localStorage.getItem("count_of_seats") > 0) navigate("/creditCard");
    else {
      setModalVisible(true);
      setModalError("You Should Select at least 1 chair to purchase");
    }
  }

  function GoBackHandler() {
    navigate("/Matches");
  }

  const arr = [];
  for (var i = 0; i < props.no; i++) {
    arr.push(i);
  }

  let content;

  if (props.role === "F") {
    console.log(`the first count is: ${localStorage.getItem("count_of_seats")}`);
    content = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginLeft: "100px",
          marginTop: "30px",
        }}
      >
        <button
          className="btnCheck"
          onClick={GoBackHandler}
          style={{ fontWeight: "bold" }}
        >
          Go Back
        </button>
        <button
          className="btnCheck"
          onClick={Purchasehandler}
          style={{ fontWeight: "bold" }}
        >
          Purchase
        </button>
      </div>
    );
  } else {
    content = (
      <button className="btnCheck" onClick={GoBackHandler}>
        Go Back
      </button>
    );
  }

  return (
    <>
      <Modal
        show={modalVisible}
        onHide={() => {
          setModalVisible(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Signup error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalError}</Modal.Body>
        <Modal.Footer>
          <button
            className="modal-button"
            onClick={() => {
              setModalVisible(false);
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div style={{ position: "relative" }}>
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            position: "absolute",
            top: "-150px",
            marginLeft: "70px",
          }}
        >
          Stadium Seats
        </h1>
        <div className="chairs">
          {arr.map((user) => (
            <Container no={props.seatsPerRow} row={user} role={props.role}>
              {" "}
            </Container>
          ))}
          {content}
        </div>
      </div>
    </>
  );
}
export default Reservation;
