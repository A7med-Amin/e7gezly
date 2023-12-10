import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Icon.png";
import "./Signup.css";
import "../Portal.css";
import { password_pattern, username_pattern, email_pattern } from "../utils";
import { Modal } from "react-bootstrap";
export const Signup = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Manager");
  const [selectedGender, setSelectedGender] = useState("Male");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState("");
  const handleRoleChange = (event) => {
    console.log(event.target.value);
    setSelectedRole(event.target.value);
  };
  const handleGenderChange = (event) => {
    console.log(event.target.value);
    setSelectedGender(event.target.value);
  };
  const validateSignUp = (event) => {
    event.preventDefault();
    // Validate inputs
    const signup_data = {
      username: event.target.username.value,
      password: event.target.password.value,
      repPassword: event.target.reppassword.value,
      fullname: event.target.fullname.value,
      email: event.target.email.value,
      role: selectedRole[0].toUpperCase(),
      gender: selectedGender[0].toUpperCase(),
      date: event.target.date.value,
    };

    console.log(signup_data);

    // Check if any inputs are empty
    if (
      signup_data.username === "" ||
      signup_data.password === "" ||
      signup_data.repPassword === "" ||
      signup_data.fullname === "" ||
      signup_data.email === "" ||
      signup_data.role === "" ||
      signup_data.gender === ""
    ) {
      setModalVisible(true);
      setModalError("All fields are required");
      return;
    }

    // Check if inputs meet the requirements
    const split_name = signup_data.fullname.split(" ");
    if (split_name.length < 2) {
      setModalVisible(true);
      setModalError("Name must be at least 2 words");
    } else if (username_pattern.test(signup_data.username) == null) {
      setModalVisible(true);
      setModalError("Username must be alphanumeric");
    } else if (signup_data.password !== signup_data.repPassword) {
      setModalVisible(true);
      setModalError("Passwords do not match");
    } else if (password_pattern.test(signup_data.password) == null) {
      setModalVisible(true);
      setModalError(
        "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
      );
    } else if (new Date(event.target.date.value) > Date.now()) {
      setModalVisible(true);
      setModalError("Date cannot be in the future");
    } else if (email_pattern.test(signup_data.email) == null) {
      setModalVisible(true);
      setModalError("Invalid email format");
    } else {
      // Send data to server
      axios
        .post(`${process.env.REACT_APP_API_URL}api/adduser/`, signup_data)
        .then((res) => {
          if (res.status !== 200) {
            setModalVisible(true);
            setModalError("No user with this data");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          setModalVisible(true);
          setModalError("No user with this data");
          console.log(err);
        });
    }
  };

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
      <div className="login-page">
        <img className="logo" src={logo} width={250} height={250} alt="logo" />
        <div className="login-box">
          <h2>Sign up</h2>
          <form onSubmit={validateSignUp}>
            <div className="user-box">
              <input
                type="text"
                name="fullname"
                required
                className="input-box"
              />
              <label>Full name</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="username"
                required
                className="input-box"
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="date"
                name="date"
                placeholder=""
                required
                className="input-box"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <label>Date of birth</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required
                className="input-box"
              />
              <label>Password</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="reppassword"
                required
                className="input-box"
              />
              <label>Repeat Password</label>
            </div>
            <div className="user-box">
              <input type="email" name="email" required className="input-box" />
              <label>Email Address</label>
            </div>
            <div className="check-box">
              <label>Gender</label>

              <div class="radio-button">
                <input
                  type="radio"
                  class="radio-button__input"
                  id="male"
                  name="radio-group"
                  checked={selectedGender === "Male"}
                  onChange={handleGenderChange}
                  value={"Male"}
                />
                <label class="radio-button__label" htmlFor="male">
                  <span class="radio-button__custom"></span>
                  Male
                </label>
              </div>
              <div class="radio-button">
                <input
                  type="radio"
                  class="radio-button__input"
                  id="female"
                  name="radio-group"
                  checked={selectedGender === "Female"}
                  onChange={handleGenderChange}
                  value={"Female"}
                />
                <label class="radio-button__label" htmlFor="female">
                  <span class="radio-button__custom"></span>
                  Female
                </label>
              </div>
            </div>

            <div className="check-box">
              <label>Role</label>
              <div className="radio-inputs">
                <label className="radio">
                  <input
                    type="radio"
                    value={"Manager"}
                    checked={selectedRole === "Manager"}
                    onChange={handleRoleChange}
                  />
                  <span className="name">Manager</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    value={"Fan"}
                    checked={selectedRole === "Fan"}
                    onChange={handleRoleChange}
                  />
                  <span className="name">Fan</span>
                </label>
              </div>
            </div>

            <button type="submit">Submit</button>
            <div className="check-box">
              <span>
                <Link to="/login">Already have an account?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
