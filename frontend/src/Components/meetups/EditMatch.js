import { useNavigate } from "react-router-dom";
import NewMatchForm from "./NewMatchForm";
import { Modal } from "react-bootstrap";
import { useState } from "react";

function EditMatch(props) {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  function editMatchupHandler(meetupData) {
    fetch(`${process.env.REACT_APP_API_URL}api/updatematch/${props.matchID}`, {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(meetupData);
        if (res.status === 401) {
          setModalVisible(true);
          setModalError("One of 2 teams has a match at the same time");
        } else if (res.status === 403) {
          setModalVisible(true);
          setModalError("There is a clashing match at same stadium");
        } else if (res.status === 405) {
          setModalVisible(true);
          setModalError("The date is old");
        } else if (res.status === 400) {
          setModalVisible(true);
          setModalError("This stadium has a match at the same time");
        } else if (res.status === 200) {
          history("/Matches");
          props.onConfirm();
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Modal.Title>Incorrect input</Modal.Title>
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
      <div className="showeditmatchmodal">
        <NewMatchForm
          onAddMeetup={editMatchupHandler}
          text="Edit Match"
          matchID={props.matchID}
          H_team={props.H_team}
          A_team={props.A_team}
          Stadium={props.Stadium}
          date={props.date}
          time={props.time}
          refree={props.refree}
          line1={props.line1}
          line2={props.line2}
        />
      </div>
    </>
  );
}

export default EditMatch;
