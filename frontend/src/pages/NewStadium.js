import { useNavigate } from "react-router-dom";
import Layout from "../Components/layout/Layout";

import NewStadiumForm from "../Components/meetups/NewStadiumForm";
import classes from "../Components/ui/Card.module.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";

function NewStaium() {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  function addStadupHandler(meetupData) {
    fetch(`${process.env.REACT_APP_API_URL}api/addstadium/`, {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(meetupData);
        if (res.status !== 200) {
          setModalVisible(true);
          setModalError("Error in adding the stadium");
        } else {
          history("/Home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Layout>
      <section>
        <Modal
          show={modalVisible}
          onHide={() => {
            setModalVisible(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Input error</Modal.Title>
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
        <h1
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Add Stadium
        </h1>
        <NewStadiumForm onAddMeetup={addStadupHandler} />
      </section>
    </Layout>
  );
}

export default NewStaium;
