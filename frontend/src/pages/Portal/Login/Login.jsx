import React from "react";
import "../Portal.css";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Icon.png";
import { password_pattern } from "../utils";
import "./Login.css";
export const Login = () => {
  const navigate = useNavigate();

  function ValidateSignIn(event) {
    event.preventDefault();

    const userData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    if (!password_pattern.test(userData.password)) {
      alert(
        "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
      );
    } else {
      /*Local Storage*/
      axios
        .post(`${process.env.REACT_APP_API_URL}api/login/`, userData)
        .then((res) => {
          if (res.status !== 200) {
            alert(" No User With This Data ");
          } else {
            if (res.data.role === "A") {
              navigate("/admin");
            } else {
              var localData = [];
              localData.push({
                username: res.username,
                role: res.role,
              });

              localStorage.setItem("LoggedIn", JSON.stringify(localData));
              navigate("/Home");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) alert("Unapproved manager");
          else if (err.response.status === 404) alert("No user with this data");
          else if (err.response.status === 500) alert("Server Error");
          alert("No user with this data");
        });
    }
  }

  return (
    <div className="login-page">
      <img src={logo} width={300} height={300} alt="logo" />
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
  );
};

export default Login;
