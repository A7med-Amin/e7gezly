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

    // Referees
    const referees = ["Ibrahim Nour Eldin", "Abdelaziz Elsayed", "Tarek Magdy", "Mohamed Adel", 
    "Mohamed Maarouf", "Mohamed Salama", "Mohamed Youssef", "Walid Abdelrazak", 
    "Mohamed Bassiouni", "Mahmoud Elbanna", "Amin Omar", "Ahmed Elghandour", "Mahmoud Nagy", "Wael Farhan", 
    "Mahmoud Wafa", "Ahmed Gamal", "Mahmoud Nassef", "Hesham Elkadi", "Nader Kamar", "Ahmed Hamdi"];


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
                    <select name="teams" ref={homeTeamRef} style={{ padding : '10px' }}>
                        <option className={classes.optionstyle} value="" selected disabled hidden>Select Home Team</option>
                        {teams.map((team, index) => (
                            <option className={classes.optionstyle} key={index} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>

                {/* Away Team Dropdown */}
                <div className={classes.control}>
                    <label htmlFor='Ateam'><span className={classes.vip}>Away</span> Team</label>
                    <select name="teams" ref={awayTeamRef} style={{ padding : '10px' }}>
                        <option className={classes.optionstyle} value="" selected disabled hidden>Select Away Team</option>
                        {teams.map((team, index) => (
                            <option className={classes.optionstyle} key={index} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                <label htmlFor='Stad'><span className={classes.vip}>Stadium</span> Name</label>
                <select name="teams" ref={stadiumRef} style={{ padding : '10px' }} >
                    <option className={classes.optionstyle} selected disabled hidden>{props.Stadium}</option>
                    {empdata && empdata.map((item, key) => (
                        <option className={classes.optionstyle} value={item.name} key={key}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor='Mdate'><span className={classes.vip}>Match</span> Date</label>
                <input type='date' required id='Mdate' ref={dateRef} defaultValue={props.date} style={{ padding : '10px' }} />
            </div>
            <div className={classes.control}>
                <label htmlFor='Mtime'><span className={classes.vip}>Match</span> Time</label>
                <input type='time' required id='Mtime' ref={timeRef} defaultValue={props.time} style={{ padding : '10px' }} />
            </div>
            <div className={classes.control}>
                <label htmlFor='MainRef'><span className={classes.vip}>Main</span> Refree</label>
                <select name="teams" ref={mainRefreeRef} style={{ padding:'10px' }} >
                    <option className={classes.optionstyle} value={props.refree} selected disabled hidden>{props.refree}</option>
                    {referees.map((referee) => 
                        <option className={classes.optionstyle} value={referee}>{referee}</option>
                    )}
                </select>

                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManOne'>Lineman<span className={classes.vip}> 1</span></label>
                    <select name="teams" ref={mainRefreeRef} style={{ padding:'10px' }} >
                    <option className={classes.optionstyle} value={props.refree} selected disabled hidden>{props.refree}</option>
                    {referees.map((referee) => 
                        <option className={classes.optionstyle} value={referee}>{referee}</option>
                    )}
                    </select>

                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManTwo'>Lineman<span className={classes.vip}> 2</span></label>
                    <select name="teams" ref={mainRefreeRef} style={{ padding:'10px' }} >
                    <option className={classes.optionstyle} value={props.refree} selected disabled hidden>{props.refree}</option>
                    {referees.map((referee) => 
                        <option className={classes.optionstyle} value={referee}>{referee}</option>
                    )}
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
