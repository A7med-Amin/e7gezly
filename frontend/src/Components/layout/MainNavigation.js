import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "./Icon.png";
import "./Navbar.css";
import { useContext, useEffect } from "react";
import { TicketsContext } from "../../pages/store/UserTickets_Context";
function MainNavigation(props) {
  const tickets = useContext(TicketsContext);
  console.log("totalTickets", tickets);
  const navigate = useNavigate();
  function LoggingOut() {
    localStorage.removeItem("LoggedIn");
    navigate("/");
  }

  function WhatUser() {
    var LoggedIn = localStorage.getItem("LoggedIn");
    LoggedIn = JSON.parse(LoggedIn);
    if (LoggedIn) {
      if (LoggedIn[0]["role"] === "M") {
        return (
          <header className={classes.header}>
            <img
              className={classes.logoicon}
              src={logo}
              alt="Icon"
              height={70}
              width={100}
              onClick={() => navigate("/home")}
            />
            <nav>
              <Link to="/home" className="navbar-element">
                Home
              </Link>

              <Link to="/matches" className="navbar-element">
                Matches
              </Link>

              <Link className="navbar-element" to="/NewMatch">
                Add Match
              </Link>

              <Link className="navbar-element" to="/new-stadium">
                Add Stadium
              </Link>

              <a className="navbar-element" onClick={() => LoggingOut()}>
                Logout
              </a>
            </nav>
          </header>
        );
      } else if (LoggedIn[0]["role"] === "F") {
        return (
          <header className={classes.header}>
            <img
              className={classes.logoicon}
              src={logo}
              alt="Icon"
              height={70}
              width={100}
              onClick={() => navigate("/home")}
            />
            <nav>
              <Link to="/home" className="navbar-element">
                Home
              </Link>
              <Link to="/profile" className="navbar-element">
                Profile
              </Link>
              <Link to="/yourtickets" className="navbar-element">
                Your Tickets
                {/* <span className={classes.badge}>{tickets ?? 0}</span> */}
              </Link>
              <Link to="/matches" className="navbar-element">
                Matches
              </Link>
              <a className="navbar-element" onClick={() => LoggingOut()}>
                Logout
              </a>
            </nav>
          </header>
        );
      }
    } else {
      return (
        <header className={classes.header}>
          <img
            className={classes.logoicon}
            src={logo}
            alt="Icon"
            height={70}
            width={100}
            onClick={() => navigate("/home")}
          />

          <nav>
            <Link to="/home" className="navbar-element">
              Home
            </Link>
            <Link to="/matches" className="navbar-element">
              Matches
            </Link>
            <Link className="navbar-element" to="/">
              Login
            </Link>
          </nav>
        </header>
      );
    }
  }

  return <WhatUser />;
}
export default MainNavigation;
