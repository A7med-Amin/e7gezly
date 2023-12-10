import { useState } from "react";
import Card from "../ui/Card";
import classes from "./MatchInfoItem.module.css";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

function BouhgtTickets(props) {

    // const BoughtTickets = useContext(TicketsContext);
    // // const IsBought = BoughtTickets.itemIsBought(props.id);

    console.log("______________");
    console.log(props);
    console.log("______________");

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const [modalIsOpen, SetModalIsOpen] = useState(false);

  function buyHandler() {
    SetModalIsOpen(true);
  }

  function closeModalHandler() {
    SetModalIsOpen(false);
  }

  //remove only if confirm deletion
  function ConfirmRemove(meetupData) {
    closeModalHandler();

    /*
     * Remove from server
     */
    fetch(
      /*Get user name from local storage */
      `${process.env.REACT_APP_API_URL}api/deleteticket/${props.id}/`,
      {
        method: "GET",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 403) {
          alert("Can't delete a tickets before 3 days of match ");
        } else if (res.status !== 200) {
          alert(" Server Error");
        } else {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.Teams} style={{paddingBottom: '20px' , height: '15vh'}}>
                    <img src={props.match.H_team.link} alt={props.match.H_team.name} />
                    <h3 className= {classes.vs}>VS</h3>
                    <img src={props.match.A_team.link} alt={props.match.A_team.name} />
                    
                </div>
                <div className={`${classes.content} ${classes.divaya}`}>
                    <div className={`${classes.content} ${classes.subcontent}`}>
                        <h5 className={classes.info}>Stadium</h5>
                        <address className={classes.Time}>{props.match.stadium}</address>
                    </div>
                    <div className={`${classes.content} ${classes.subcontent}`}>
                        <h5 className={classes.info} >Date</h5>
                        <address className={classes.Time}>{props.match.date}</address>
                    </div>
                    <div className={`${classes.content} ${classes.subcontent}`}>
                        <h5 className={classes.info}>Seat</h5>
                        <address className={classes.Time}>{alphabet[props.row]}{props.seat}</address>
                    </div>
                </div>

        <div className={`${classes.content} ${classes.divaya}`}>
          <div className={`${classes.content} ${classes.subcontent}`}>
            <h5 className={classes.info}>Time</h5>
            <address className={classes.Time}>{props.match.time}</address>
          </div>
          <div className={`${classes.content} ${classes.subcontent}`}>
            <h5 className={classes.info}>Ticket ID</h5>
            <address className={classes.Time}>{props.id}</address>
          </div>
        </div>

        <div className={classes.actions}>
          <button className="btn" onClick={buyHandler}>
            Remove
          </button>
          {modalIsOpen && (
            <Modal onCancel={closeModalHandler} onConfirm={ConfirmRemove} />
          )}
          {modalIsOpen && <Backdrop oncCancel={closeModalHandler} />}
        </div>
      </Card>
    </li>
  );
}

export default BouhgtTickets;
