import "./container.css";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import "../../pages/Globalvariable";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function Reservation(props) {
  global.countofseats = 0;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  const navigate = useNavigate();
  global.arrreserved = props.matchData;

  function Purchasehandler() {
    console.log(`The purchase: ${global.countofseats}`);
    if (global.countofseats > 0) navigate("/creditCard");
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
    console.log(`the first count is: ${global.countofseats}`);
    content = (
      <div style={{ marginTop: "-3%", width: "20%" }}>
        <button
          className="btnCheck"
          onClick={GoBackHandler}
          style={{ marginBottom: "7%" }}
        >
          Go Back
        </button>
        <button className="btnCheck" onClick={Purchasehandler}>
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
      <div className="container main-box">
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
