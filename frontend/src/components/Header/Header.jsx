import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
const Header = () => {
  // let LoggedIn = localStorage.getItem("LoggedIn");
  let LoggedIn = "mk"
  // LoggedIn = JSON.parse(LoggedIn);
  const Logout = () => {
    // localStorage.removeItem("LoggedIn");
  };
    if (true) {

      if (true) {
        return (
          <header className= "header">
            kkk
            <div className = "logo">Marhaba</div>
            <nav>
              <ul>
                <li>
                  <Link to='/Home'>Home</Link>
                </li>

                <li>
                  <Link to='/Matches'>Matches</Link>
                </li>

                <li>
                  <Link to='/NewMatch'>Add Match</Link>
                </li>

                <li>
                  <Link to='/new-stadium'>Add Stadium</Link>
                </li>

                <li>
                  <Link to='/' onClick={Logout}>Logout</Link>
                </li>
              </ul>
            </nav>
          </header>
        );

      }

      else if (false) {
        return (
          <header className = "header">
            <div className = "logo">Marhaba</div>
            <nav>
              <ul>
                <li>
                  <Link to='/Home'>Home</Link>
                </li>

                <li>
                  <Link to='/Profile'>Profile</Link>
                </li>

                <li>
                  <Link to='/Matches'>Matches</Link>
                </li>

                <li>
                  <Link to='/YourTickets'>Your Tickets
                    <span className="badge"></span>
                  </Link>
                </li>

                <li>
                  <Link to='/' onClick={Logout}>Logout</Link>
                </li>
              </ul>
            </nav>
          </header>
        );
      }

    }
    else {
      return (
        <header className = "header">
          <div className = "logo">Marhaba</div>
          <nav>
            <ul>
              <li>
                <Link to='/Home'>Home</Link>
              </li>

              <li>
                <Link to='/Matches'>Matches</Link>
              </li>

              <li>
                <Link to='/'>LogIn</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    }
}
export default Header
