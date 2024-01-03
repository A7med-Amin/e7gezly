import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Reservation from "../Components/meetups/CinemaMode";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Layout from "../Components/layout/Layout";

function remove_seat_from_users_seats(row, seat) {
  const user_seats = JSON.parse(localStorage.getItem("user_seats") || "[]");

  for (let j = 0; j < user_seats.length; j++) {
    if (user_seats[j].row === row && user_seats[j].seat === seat) {
      user_seats.splice(j, 1);
      const countOfSeats = parseInt(
        localStorage.getItem("count_of_seats") || 0
      );

      localStorage.setItem("count_of_seats", countOfSeats - 1);
      break;
    }
  }

  localStorage.setItem("user_seats", JSON.stringify(user_seats));
}

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
    localStorage.setItem("count_of_seats", 0);
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
        localStorage.setItem("arrreserved", JSON.stringify(meetups));
        localStorage.setItem("user_seats", []);
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });

    const fetchData = async () => {
      const response = fetch(
        `${process.env.REACT_APP_API_URL}api/seats/${matchID}`
      )
        .then((response) => {
          if (response.status === 405) {
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
            // meetup.seat_status = Math.random() < 0.5;
            meetups.push(meetup);
          }
          // Search for reserved seats and find reserved seats and mark them and remove from user seats
          for (let i = 0; i < meetups.length; i++) {
            if (meetups[i].seat_status === true) {
              remove_seat_from_users_seats(meetups[i].row, meetups[i].seat);
            }
          }
          localStorage.setItem("arrreserved", JSON.stringify(meetups));
          console.log(meetups);
          setIsLoading(false);
          setLoadedMeetups(meetups);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
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
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6), black)",
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
      {loadedMeetups && (
        <Reservation
          no={rows}
          seatsPerRow={seats_per_row}
          role={TheRole}
          matchData={loadedMeetups}
        />
      )}
    </section>
  );
}

export default Seats;
