import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card'
import classes from './MatchInfoItem.module.css';
import Backdrop from "./Backdrop";
import EditMatch from './EditMatch';

function MatchInfoItem(props) {

    const navigate = useNavigate();
    const [EditIsOpen, SetEditIsOpen] = useState(false);


    function toogleTcketsStateHandler() {
        navigate('/Seats', { state: { matchID: props.id, rows: props.Stadium.rows, seats_per_row: props.Stadium.seats_per_row } });
    }

    function editmatch() {
        SetEditIsOpen(true);
    }


    function closeeditMatch() {
        SetEditIsOpen(false);
    }


    function WhatUser() {
        var LoggedIn = localStorage.getItem('LoggedIn');
        LoggedIn = JSON.parse(LoggedIn);

        if (LoggedIn) {
            if (LoggedIn[0]["role"] === 'M') {
                return (
                    <div className={classes.actions}>
                        <button className="btn" onClick={editmatch}>Edit Info</button>
                        <button className="btn--alt" onClick={toogleTcketsStateHandler}>Seats Status</button>

                        {EditIsOpen && <EditMatch onConfirm={closeeditMatch} matchID={props.id} H_team={props.H_team.name}
                            A_team={props.A_team.name} Stadium={props.Stadium.name}
                            date={props.date} time={props.time} refree={props.refree}
                            line1={props.line1} line2={props.line2}
                        />}
                        {EditIsOpen && <Backdrop oncCancel={closeeditMatch} />}
                    </div>
                );

            } else if (LoggedIn[0]["role"] === 'F') {
                return (
                    <div className={classes.actions}>
                        <button className="btn" onClick={toogleTcketsStateHandler} >Buy Now</button>
                    </div>
                );
            }
        }
        else {
            return (
                <div className={classes.actions}>
                    <button className="btn--alt" onClick={toogleTcketsStateHandler}>Seats Status</button>
                </div>
            );
        }
    }

    return (
        <div >
            <Card>
                <div className={classes.image}>
                    <img src={props.H_team.link} alt={props.H_team.name} />
                    <h3 className= {classes.vs}>VS</h3>
                    <img src={props.A_team.link} alt={props.A_team.name} />
                </div>

                <div className={classes.Teams}>
                    <h5>{props.H_team.name}</h5>
                    <h5>{props.A_team.name}</h5>
                </div>

                <div className={`${classes.content} ${classes.divaya}`}>
                    <div className={`${classes.content} ${classes.subcontent}`}>
                        <h5 className={classes.info} >Stadium</h5>
                        <address className={classes.Time}>{props.Stadium.name}</address>
                    </div>

                    <div className={`${classes.content} ${classes.subcontent}`}>
                        <h5 className={classes.info} >Date</h5>
                        <address className={classes.Time}>{props.date}</address>
                    </div>

                    <div className={`${classes.content} ${classes.subcontent}`}>
                        <h5 className={classes.info}>Time</h5>
                        <address className={classes.Time}>{props.time}</address>
                    </div>

                    <h5 className={classes.info}>Referees</h5>
                    <div className={`${classes.LinesMan} ${classes.divaya}`}>
                        <address className={classes.Time}>{props.refree}</address>
                        <address className={classes.Time}>{props.line1}</address>
                        <address className={classes.Time}>{props.line2}</address>
                    </div>
                </div>

                <WhatUser />

            </Card>
        </div>
    );
}

export default MatchInfoItem;