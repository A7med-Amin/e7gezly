import { useNavigate } from "react-router-dom";
import Layout from "../Components/layout/Layout";

import NewMatchForm from "../Components/meetups/NewMatchForm";
import classes from "../Components/ui/Card.module.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";

function NewMatch() {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  function addMatchupHandler(meetupData) {
    fetch(`${process.env.REACT_APP_API_URL}api/addmatch/`, {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(meetupData);
        if (res.status === 403) {
          setModalVisible(true);
          setModalError("There is a refree having a match on same day");
        }else if (res.status === 402) {
          setModalVisible(true);
          setModalError("There a match in the stadium on same day");
        } else if (res.status === 401) {
          setModalVisible(true);
          setModalError("Cant add a team already playing on same day");
        } else if (res.status === 400) {
          setModalVisible(true);
          setModalError(
            "Invalid data provided, please check all fields and try again"
          );
        } else if (res.status === 405) {
          setModalVisible(true);
          setModalError("Old Date, please select a recent date");
        } else if (res.status === 500) {
          setModalVisible(true);
          setModalError("Error with server");
        } else if (res.status === 200) {
          history("/Matches");
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
          <button className="modal-button" onClick={() => {}}>
            Close
          </button>
          <button className="modal-button">Confirm</button>
        </Modal.Footer>
      </Modal>
      <Layout>
        <section style={{ padding: "10px" }}>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Add Match
          </h1>
          <div className={classes.cardoutsidelayoyt}>
            <NewMatchForm onAddMeetup={addMatchupHandler} text="Add Match" />
          </div>
        </section>
      </Layout>
    </>
  );
}

export default NewMatch;
