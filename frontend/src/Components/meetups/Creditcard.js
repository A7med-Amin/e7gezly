import "./style.css";
import { useNavigate } from "react-router-dom";
import "../../pages/Globalvariable";
import { Modal } from "react-bootstrap";
import { useState } from "react";

function Creditcard(props) {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditPinNumber, setCreditPinNumber] = useState("");
  var LoggedIn = localStorage.getItem("LoggedIn");
  LoggedIn = JSON.parse(LoggedIn);

  function Fetching(DataToFetch) {
    fetch(
      `${process.env.REACT_APP_API_URL}api/addticket/${LoggedIn[0]["username"]}/`,
      {
        method: "POST",
        body: JSON.stringify(DataToFetch),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(DataToFetch);
        if (res.status === 401) {
          setModalVisible(true);
          setModalError("You Already have a ticket of a clashing match");
        } else if (res.status !== 200) {
          setModalVisible(true);
          setModalError("Server Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function confirmReserve(event) {
    event.preventDefault();
    const creditNumber = /^[0-9]+$/.test(creditCardNumber);
    const pinNumber = /^[0-9]+$/.test(creditPinNumber);
    if (!creditNumber) {
      setModalVisible(true);
      setModalError("Please enter a numeric value for a credit card");
    } else if (!pinNumber) {
      setModalVisible(true);
      setModalError("Please enter a numeric value for a Pin number");
    } else {
      const user_seats = JSON.parse(localStorage.getItem("user_seats", []));
      console.log("user_seats", user_seats);
      for (let i = 0; i < user_seats.length; i++) {
        if (user_seats[i].seat_status === true) {
          console.log(user_seats[i]);
          Fetching(user_seats[i]);
        }
      }
      navigate("/Home");
    }
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
          <Modal.Title>Transaction failed</Modal.Title>
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
      <div
        className="conte"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6), black)",
        }}
      >
        <form
          action=""
          style={{ marginTop: "40px", borderRadius: "20px" }}
          onSubmit={confirmReserve}
        >
          <div style={{ marginTop: "-120px" }}>
            <img
              src="https://www.visa.ca/dam/VCOM/regional/na/canada/card-products/images/visa-gold-card-800x450.jpg"
              alt=""
              style={{ width: "400px", height: "200px", marginLeft: "75px" }}
            />
          </div>
          <div className="inputBox">
            <span>Card Number</span>
            <input
              type="text"
              className="card-number-input"
              required
              minLength={16}
              maxLength={16}
              onChange={(e) => setCreditCardNumber(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <span>PIN Number</span>
            <input
              type="text"
              className="card-holder-input"
              required
              onChange={(e) => setCreditPinNumber(e.target.value)}
              minLength={4}
              maxLength={4}
            />
          </div>
          <div className="flexbox">
            {/* <div className="inputBox">
              <span>Expiration MM</span>
              <select required name="" id="" className="month-input">
                <option value="month" selected disabled>
                  Month
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div> */}
            {/* <div className="inputBox">
              <span>Expiration YY</span>
              <select required name="" id="" className="year-input">
                <option value="year" selected disabled>
                  Year
                </option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div> */}
            {/* <div className="inputBox">
              <span>CVV</span>
              <input
                type="text"
                minLength={3}
                maxLength={3}
                className="cvv-input"
                required
              />
            </div> */}
          </div>
          <input type="submit" value="submit" className="submit-btn" />
        </form>
      </div>
    </>
  );
}
export default Creditcard;
