// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "./NewMatchForm.css";
import { useRef } from 'react';
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import classes from './NewStadiumForm.module.css';

function NewMatchForm(props) {

    const [empdata, empdatachange] = useState(null);

    console.log(props.time);

    const homeTeamRef = useRef();
    const awayTeamRef = useRef();
    const stadiumRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const mainRefreeRef = useRef();
    const lineManOneRef = useRef();
    const lineManTwoRef = useRef();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}api/stadiums/`).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    function submitHandler() {
        const HomeTeam = homeTeamRef.current.value;
        const AwayTeam = awayTeamRef.current.value;
        const Stadium = stadiumRef.current.value;
        const MatchDate = dateRef.current.value;
        const MatchTime = timeRef.current.value;
        const MainRefree = mainRefreeRef.current.value;
        const LineManone = lineManOneRef.current.value;
        const LineManTwo = lineManTwoRef.current.value;

        const meetupData = {
            h_team: HomeTeam,
            a_team: AwayTeam,
            stadium: Stadium,
            date: MatchDate,
            time: MatchTime,
            refree: MainRefree,
            line1: LineManone,
            line2: LineManTwo
        };

        props.onAddMeetup(meetupData);
    }

    function Validate(event) {
        event.preventDefault();
        if (homeTeamRef.current.value === awayTeamRef.current.value) {
            alert("Same Team Cant be selected more than once");
            console.log("Same Team Cant be selected more than once");
        }
        else if (mainRefreeRef.current.value === lineManOneRef.current.value || lineManTwoRef.current.value === mainRefreeRef.current.value || lineManTwoRef.current.value === lineManOneRef.current.value) {
            alert("Same Refree Cant be selected more than once");
            console.log("Same Refree Cant be selected more than once");
        }
        else {
            if (props.text === "Edit Match" && stadiumRef.current.value !== props.Stadium) {
                alert("Changing match stadium will automatically Delete all match tickets");
            }
            submitHandler();
        }
    }
    // disabled={props.text==="Edit Match" ? true:false}
    return (
        <Card>
            <form className={classes.form} onSubmit={Validate}>
                <div className={classes.control}>
                    <label htmlFor='Hteam'><span className={classes.vip}>Home</span> Team</label>
                    <select name="teams" ref={homeTeamRef} style={{ height: '35px' }} >
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value={props.H_team} selected disabled hidden>{props.H_team}</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Argentina">Argentina</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Australia">Australia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Belgium">Belgium</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Brazil">Brazil</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Canada">Canada</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Cameroon">Cameroon</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Costa Rica">Costa Rica</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Croatia">Croatia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Denmark">Denmark</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Ecuador">Ecuador</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="England">England</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="France">France</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Germany">Germany</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Ghana">Ghana</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Iran">Iran</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Japan">Japan</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Mexico">Mexico</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Morocco">Morocco</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Netherlands">Netherlands</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Poland">Poland</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Portugal">Portugal</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Qatar">Qatar</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Saudi Arabia">Saudi Arabia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Senegal">Senegal</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Serbia">Serbia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="South Korea">South Korea</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Spain">Spain</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Switzerland">Switzerland</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Tunisia">Tunisia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="USA">United States</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Uruguay">Uruguay</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Wales">Wales</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Ateam'><span className={classes.vip}>Away</span> Team</label>
                    <select name="teams" ref={awayTeamRef} style={{ height: '35px' }} >
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value={props.A_team} selected disabled hidden>{props.A_team}</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Argentina">Argentina</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Australia">Australia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Belgium">Belgium</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Brazil">Brazil</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Canada">Canada</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Cameroon">Cameroon</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Costa Rica">Costa Rica</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Croatia">Croatia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Denmark">Denmark</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Ecuador">Ecuador</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="England">England</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="France">France</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Germany">Germany</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Ghana">Ghana</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Iran">Iran</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Japan">Japan</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Mexico">Mexico</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Morocco">Morocco</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Netherlands">Netherlands</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Poland">Poland</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Portugal">Portugal</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Qatar">Qatar</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Saudi Arabia">Saudi Arabia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Senegal">Senegal</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Serbia">Serbia</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="South Korea">South Korea</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Spain">Spain</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Switzerland">Switzerland</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="USA">United States</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Uruguay">Uruguay</option>
                        <option style = {{backgroundColor : '#273c75' , fontWeight : '600'}} value="Wales">Wales</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Stad'><span className={classes.vip}>Stadium</span> Name</label>
                    <select name="teams" ref={stadiumRef} style={{ height: '35px' }} >
                        <option value={props.Stadium} selected disabled hidden>{props.Stadium}</option>
                        {empdata && empdata.map((item, key) => (
                            <option value={item.name} key={key}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Mdate'><span className={classes.vip}>Match</span> Date</label>
                    <input type='date' required id='Mdate' ref={dateRef} defaultValue={props.date} style={{ height: '30px' }} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='Mtime'><span className={classes.vip}>Match</span> Time</label>
                    <input type='time' required id='Mtime' ref={timeRef} defaultValue={props.time} style={{ height: '30px' }} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='MainRef'><span className={classes.vip}>Main</span> Refree</label>
                    <select name="teams" ref={mainRefreeRef} style={{ height: '35px' }} >
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value={props.refree} selected disabled hidden>{props.refree}</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ibrahim Nour Eldin">Ibrahim Nour Eldin</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Abdelaziz Elsayed">Abdelaziz Elsayed</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Tarek Magdy">Tarek Magdy</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Adel">Mohamed Adel</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Maarouf">Mohamed Maarouf</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Salama">Mohamed Salama</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Youssef">Mohamed Youssef</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Walid Abdelrazak">Walid Abdelrazak</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Bassiouni">Mohamed Bassiouni</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Elbanna">Mahmoud Elbanna</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Amin Omar">Amin Omar</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Elghandour">Ahmed Elghandour</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Nagy">Mahmoud Nagy</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Wael Farhan">Wael Farhan</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Wafa">Mahmoud Wafa</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Gamal">Ahmed Gamal</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Nassef">Mahmoud Nassef</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Hesham Elkadi">Hesham Elkadi</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Nader Kamar">Nader Kamar</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Hamdi">Ahmed Hamdi</option>
                    </select>

                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManOne'>Lineman<span className={classes.vip}> 1</span></label>
                    <select name="teams" ref={lineManOneRef} style={{ height: '35px' }} >
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value={props.refree} selected disabled hidden>{props.refree}</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ibrahim Nour Eldin">Ibrahim Nour Eldin</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Abdelaziz Elsayed">Abdelaziz Elsayed</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Tarek Magdy">Tarek Magdy</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Adel">Mohamed Adel</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Maarouf">Mohamed Maarouf</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Salama">Mohamed Salama</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Youssef">Mohamed Youssef</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Walid Abdelrazak">Walid Abdelrazak</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Bassiouni">Mohamed Bassiouni</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Elbanna">Mahmoud Elbanna</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Amin Omar">Amin Omar</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Elghandour">Ahmed Elghandour</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Nagy">Mahmoud Nagy</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Wael Farhan">Wael Farhan</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Wafa">Mahmoud Wafa</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Gamal">Ahmed Gamal</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Nassef">Mahmoud Nassef</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Hesham Elkadi">Hesham Elkadi</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Nader Kamar">Nader Kamar</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Hamdi">Ahmed Hamdi</option>
                    </select>

                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManTwo'>Lineman<span className={classes.vip}> 2</span></label>
                    <select name="teams" ref={lineManTwoRef} style={{ height: '35px' }} >
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value={props.refree} selected disabled hidden>{props.refree}</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ibrahim Nour Eldin">Ibrahim Nour Eldin</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Abdelaziz Elsayed">Abdelaziz Elsayed</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Tarek Magdy">Tarek Magdy</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Adel">Mohamed Adel</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Maarouf">Mohamed Maarouf</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Salama">Mohamed Salama</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Youssef">Mohamed Youssef</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Walid Abdelrazak">Walid Abdelrazak</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mohamed Bassiouni">Mohamed Bassiouni</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Elbanna">Mahmoud Elbanna</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Amin Omar">Amin Omar</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Elghandour">Ahmed Elghandour</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Nagy">Mahmoud Nagy</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Wael Farhan">Wael Farhan</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Wafa">Mahmoud Wafa</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Gamal">Ahmed Gamal</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Mahmoud Nassef">Mahmoud Nassef</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Hesham Elkadi">Hesham Elkadi</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Nader Kamar">Nader Kamar</option>
                        <option style = {{backgroundColor : "#273c75" , fontWeight : '600'}} value="Ahmed Hamdi">Ahmed Hamdi</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button>{props.text}</button>
                </div>
            </form>
        </Card>
    );
}
export default NewMatchForm;
