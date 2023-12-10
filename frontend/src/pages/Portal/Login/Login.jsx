import React from "react";
import "../Portal.css";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Icon.png";
import { password_pattern } from "../utils";
import "./Login.css";
import InfoModal from "../../../Components/Modal/InfoModal";
import { Button, Modal } from "react-bootstrap/";
export const Login = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  function ValidateSignIn(event) {
    event.preventDefault();

    const userData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    if (!password_pattern.test(userData.password)) {
      setModalVisible(true);
      setModalError(
        "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
      );
    } else {
      /*Local Storage*/
      axios
        .post(`${process.env.REACT_APP_API_URL}api/login/`, userData)
        .then((res) => {
          if (res.status !== 200) {
            setModalVisible(true);
            setModalError("No user with this data");
          } else {
            console.log(res);
            if (res.data.role === "A") {
              navigate("/admin");
            } else {
              var LoggedIn = [];
              LoggedIn.push({
                username: userData.username,
                role: res.data.role,
              });

              localStorage.setItem("LoggedIn", JSON.stringify(LoggedIn));
              navigate("/Home");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            setModalVisible(true);
            setModalError("Unapproved manager");
          } else if (err.response.status === 404) {
            setModalVisible(true);
            setModalError("No user with this data");
          } else if (err.response.status === 500) {
            setModalVisible(true);
            setModalError("Server Error");
          } else {
            setModalVisible(true);
            setModalError("No user with this data");
          }
        });
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
          <Modal.Title>Login failed</Modal.Title>
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
      <div className="login-page">
        <img className="logo" src={logo} width={250} height={250} alt="logo" />
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={ValidateSignIn}>
            <div className="user-box">
              <input
                type="text"
                name="username"
                required=""
                className="input-box"
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required=""
                className="input-box"
              />
              <label>Password</label>
            </div>
            <div className="check-box">
              <input type="checkbox" name="" id="keep-signed" />
              <label className="check" htmlFor="keep-signed">
                Keep Me Signed In
              </label>
            </div>
            <button>Submit</button>
            <div className="check-box">
              <span>
                <Link to="/signup">Don't have an account?</Link>
              </span>
            </div>
            <div className="check-box">
              <span>
                <Link to="/home">Continue as Guest</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
