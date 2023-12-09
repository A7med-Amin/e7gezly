// Import necessary modules
import { useRef, useEffect, useState } from 'react';
import Card from "../ui/Card";
import classes from './NewStadiumForm.module.css';

function NewMatchForm(props) {
    const [empdata, empdatachange] = useState(null);
    const [teams, setTeams] = useState([]);

    // Refs
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

    // Fetch teams
    useEffect(() => {
        fetch("https://conso-backend.onrender.com/api/teams/")
            .then(res => res.json())
            .then(data => setTeams(data))
            .catch(err => console.log(err));
    }, []);

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

    return (
        <Card>
            <form className={classes.form} onSubmit={Validate}>
                {/* ... other code ... */}
                
                {/* Home Team Dropdown */}
                <div className={classes.control}>
                    <label htmlFor='Hteam'><span className={classes.vip}>Home</span> Team</label>
                    <select name="teams" ref={homeTeamRef} style={{ height: '35px' }}>
                        <option value="" selected disabled hidden>Select Home Team</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>

                {/* Away Team Dropdown */}
                <div className={classes.control}>
                    <label htmlFor='Ateam'><span className={classes.vip}>Away</span> Team</label>
                    <select name="teams" ref={awayTeamRef} style={{ height: '35px' }}>
                        <option value="" selected disabled hidden>Select Away Team</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team.name}>{team.name}</option>
                        ))}
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
