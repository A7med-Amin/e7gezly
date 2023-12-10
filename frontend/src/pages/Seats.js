import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Reservation from "../Components/meetups/CinemaMode";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

function Seats() {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  const { state } = useLocation();
  const { matchID, rows, seats_per_row } = state; // Read values passed on state

  var LoggedIn = localStorage.getItem("LoggedIn");
  LoggedIn = JSON.parse(LoggedIn);
  var TheRole;

  if (LoggedIn) {
    TheRole = LoggedIn[0]["role"];
  } else {
    TheRole = "G";
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}api/seats/${matchID}`)
      .then((response) => {
        if (response.status === 405) {
          setModalVisible(true);
          setModalError("The date is old");
          history("/Matches");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <Spinner animation="border" />
      </section>
    );
  }
  return (
    <section
      style={{
        backgroundImage:
          "url('https://dissingweitling.com/assets/upload/_landscape1200/DissingWeitling_lusailbridges_render-night.jpg')",
        height: "100vh",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
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
      <Reservation
        no={rows}
        seatsPerRow={seats_per_row}
        role={TheRole}
        matchData={loadedMeetups}
      />
    </section>
  );
}

export default Seats;
