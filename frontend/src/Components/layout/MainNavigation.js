import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "./Icon.png";
function MainNavigation(props) {
  function LoggingOut() {
    localStorage.removeItem("LoggedIn");
  }

  function WhatUser() {
    var LoggedIn = localStorage.getItem("LoggedIn");
    LoggedIn = JSON.parse(LoggedIn);
    console.log(LoggedIn);
    if (LoggedIn) {
      if (LoggedIn[0]["role"] === "M") {
        return (
          <header className={classes.header}>
            <img src={logo} alt="Marhaba" height={70} width={100} />
            <nav>
              <ul>
                <li>
                  <Link to="/Home">Home</Link>
                </li>

                <li>
                  <Link to="/Matches">Matches</Link>
                </li>

                <li>
                  <Link to="/NewMatch">Add Match</Link>
                </li>

                <li>
                  <Link to="/new-stadium">Add Stadium</Link>
                </li>

                <li>
                  <Link to="/" onClick={LoggingOut}>
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
        );
      } else if (LoggedIn[0]["role"] === "F") {
        return (
          <header className={classes.header}>
            <img src={logo} alt="Marhaba" height={70} width={100} />
            <nav>
              <ul>
                <li>
                  <Link to="/Home">Home</Link>
                </li>

                <li>
                  <Link to="/Profile">Profile</Link>
                </li>

                <li>
                  <Link to="/Matches">Matches</Link>
                </li>

                <li>
                  <Link to="/YourTickets">
                    Your Tickets
                    <span className={classes.badge}>
                      {props.Ticketsnum ?? 0}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/" onClick={LoggingOut}>
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
        );
      }
    } else {
      return (
        <header className={classes.header}>
          <img src={logo} alt="Marhaba" height={70} width={100} />
          <nav>
            <ul>
              <li>
                <Link to="/Home">Home</Link>
              </li>

              <li>
                <Link to="/Matches">Matches</Link>
              </li>

              <li>
                <Link to="/">LogIn</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    }
  }

  return <WhatUser />;
}

export default MainNavigation;
