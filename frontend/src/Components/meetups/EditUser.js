import { useRef } from 'react';
import { useState, useEffect } from 'react';
import Card from "../ui/Card";
import classes from './NewStadiumForm.module.css';

function EditUser(props) {
    const [MaleFemale, setMaleFemale] = useState();
    // const [Passo, SetPasso] = useState("false");
    let Passo="false";
    var theRole;

    var LoggedIn = localStorage.getItem('LoggedIn');
    LoggedIn = JSON.parse(LoggedIn);

    const [loadedMeetups, setLoadedMeetups] = useState([]);
    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}api/getuser/${LoggedIn[0]["username"]}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(`Data is: ${data}`);
                const meetup = data;
                // console.log(`meetup is: ${JSON.stringify(meetup)}`);
                setLoadedMeetups(meetup);
                setMaleFemale(meetup.gender);
            });
    }, []);

    if (loadedMeetups.role === 'F') {
        theRole = "Fan";
    }
    else {
        theRole = "Manager";
    }

    const usernameRef = useRef();
    const oldpasswordRef = useRef();
    const passwordRef = useRef();
    const ConpasswordRef = useRef();
    const fisrtNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const birthRef = useRef();
    const MgenderRef = useRef();
    const FgenderRef = useRef();
    const NationRef = useRef();
    const roleRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        
        var Gndr;
        if(MaleFemale ==='M')
        {
            Gndr=MgenderRef.current.value;
        }
        else
        {
            Gndr=FgenderRef.current.value;
        }
        const oldPassword = oldpasswordRef.current.value;
        const Password = passwordRef.current.value;
        const conPassword = ConpasswordRef.current.value;
        const firstName = fisrtNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const birthdate = birthRef.current.value;
        const Gender = Gndr;
        const Nation = NationRef.current.value;

        /*Paswords check*/
        console.log(oldpasswordRef.current.value.length);
        if (oldpasswordRef.current.value.length !== 0 || passwordRef.current.value.length !== 0 || ConpasswordRef.current.value.length !== 0 ) {
            Passo="true";
            console.log(Passo);
        }
        else {
            Passo="false";
            console.log(Passo);
        }
        console.log(Passo);

        var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (loadedMeetups.password !== oldPassword && Passo==="true") {
            alert("You Entered Wrong Password");
        }
        else if (!password_pattern.test(Password) && Passo==="true") {
            alert("Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number");
        }
        else if (conPassword !== Password && Passo==="true") {
            alert("Unamtched Passwords");
        }
        else if(Passo==="true")
        {
            const meetupData = {
                password: Password,
                first_name: firstName,
                last_name: lastName,
                birthdate: birthdate,
                gender: Gender,
                nationality: Nation,
            };
            props.onAddMeetup(meetupData);
        }
        else {
            const meetupData = {
                password: loadedMeetups.password,
                first_name: firstName,
                last_name: lastName,
                birthdate: birthdate,
                gender: Gender,
                nationality: Nation,
            };
            props.onAddMeetup(meetupData);
        }
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='username'><span className={classes.vip}>User</span>Name</label>
                    <input style = {{padding:'15px'}} type='text' placeholder='username' required id='username' ref={usernameRef} disabled value={loadedMeetups.username} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='opass'><span className={classes.vip}>Old</span> Password</label>
                    <input style = {{padding:'15px'}} type='password' placeholder='password' required={Passo === "true" ? true : false} id='opass' ref={oldpasswordRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='pass'><span className={classes.vip}>Pass</span>word</label>
                    <input style = {{padding:'15px'}} type='password' placeholder='password' required={Passo === "true" ? true : false} id='pass' ref={passwordRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='cpass'><span className={classes.vip}>Confirm</span> Password</label>
                    <input style = {{padding:'15px'}} type='password' placeholder='password' required={Passo === "true" ? true : false} id='cpass' ref={ConpasswordRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='first_name'><span className={classes.vip}>First</span> Name</label>
                    <input style = {{padding:'15px'}} type='text' placeholder='First name' required id='first_name' ref={fisrtNameRef} defaultValue={loadedMeetups.first_name} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='last_name'><span className={classes.vip}>Last</span> Name</label>
                    <input style = {{padding:'15px'}} type='text' placeholder='Second name' required id='last_name' ref={lastNameRef} defaultValue={loadedMeetups.last_name} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input style = {{padding : '15px'}} type='email' placeholder='Email' required id='email' ref={emailRef} disabled value={loadedMeetups.email} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='birth'><span className={classes.vip}>Birth</span>date</label>
                    <input style = {{padding : '15px'}} type='date' required id='birth' ref={birthRef} defaultValue={loadedMeetups.birthdate} />
                </div>

                <div className="options_type">
                    <div className="type" style = {{display : 'flex'}}>
                        <div style = {{display : 'flex' , alignItems: 'center'}}>
                            <input type="radio" required id="gender" value="F" name="gender" ref={FgenderRef} checked={MaleFemale === "F" ? true : false} onClick={() => setMaleFemale('F')} style = {{marginRight:'5px'}} />
                            <label htmlFor="female" style={{ color: "#273c75", fontWeight: 'bold', marginRight: "20px" }}>Female</label>
                        </div>
                        <div style = {{display: 'flex', alignItems : 'center'}}>
                            <input type="radio" required id="gender" value="M" name="gender" ref={MgenderRef} checked={MaleFemale === "M" ? true : false} onClick={() => setMaleFemale('M')} style = {{marginRight : '5px'}} />
                            <label htmlFor="male" style={{ color: "#273c75" , fontWeight : 'bold' }}>Male</label>
                        </div>
                    </div>
                    <div className="options">
                        <label style = {{fontWeight : 'bold'}} htmlFor="nationality">Nationality</label>
                        <select name="nationality" id="nationality" ref={NationRef} style={{ backgroundColor: "#273c75", color: 'whitesmoke' , padding : '10px' , borderRadius : '10px' , fontWeight : 'bold' , appearance : 'none' }}>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}} value={loadedMeetups.nationality} selected disabled hidden>{loadedMeetups.nationality}</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}} value="afghan">Afghan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}} value="albanian">Albanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="algerian">Algerian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="american">American</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="andorran">Andorran</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="angolan">Angolan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="antiguans">Antiguans</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="argentinean">Argentinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="armenian">Armenian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="australian">Australian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="austrian">Austrian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="azerbaijani">Azerbaijani</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bahamian">Bahamian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bahraini">Bahraini</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bangladeshi">Bangladeshi</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="barbadian">Barbadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="barbudans">Barbudans</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="batswana">Batswana</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="belarusian">Belarusian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="belgian">Belgian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="belizean">Belizean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="beninese">Beninese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bhutanese">Bhutanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bolivian">Bolivian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bosnian">Bosnian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="brazilian">Brazilian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="british">British</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bruneian">Bruneian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="bulgarian">Bulgarian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="burkinabe">Burkinabe</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="burmese">Burmese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="burundian">Burundian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="cambodian">Cambodian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="cameroonian">Cameroonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="canadian">Canadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="cape verdean">Cape Verdean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="central african">Central African</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="chadian">Chadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="chilean">Chilean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="chinese">Chinese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="colombian">Colombian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="comoran">Comoran</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="congolese">Congolese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="costa rican">Costa Rican</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="croatian">Croatian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="cuban">Cuban</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="cypriot">Cypriot</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="czech">Czech</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="danish">Danish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="djibouti">Djibouti</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="dominican">Dominican</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="dutch">Dutch</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="east timorese">East Timorese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="ecuadorean">Ecuadorean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="egyptian">Egyptian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="emirian">Emirian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="equatorial guinean">Equatorial Guinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="eritrean">Eritrean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="estonian">Estonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="ethiopian">Ethiopian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="fijian">Fijian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="filipino">Filipino</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="finnish">Finnish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="french">French</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="gabonese">Gabonese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="gambian">Gambian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="georgian">Georgian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="german">German</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="ghanaian">Ghanaian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="greek">Greek</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="grenadian">Grenadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="guatemalan">Guatemalan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="guinea-bissauan">Guinea-Bissauan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="guinean">Guinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="guyanese">Guyanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="haitian">Haitian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="herzegovinian">Herzegovinian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="honduran">Honduran</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="hungarian">Hungarian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="icelander">Icelander</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="indian">Indian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="indonesian">Indonesian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="iranian">Iranian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="iraqi">Iraqi</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="irish">Irish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="italian">Italian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="ivorian">Ivorian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="jamaican">Jamaican</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="japanese">Japanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="jordanian">Jordanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="kazakhstani">Kazakhstani</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="kenyan">Kenyan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="kittian and nevisian">Kittian and Nevisian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="kuwaiti">Kuwaiti</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="kyrgyz">Kyrgyz</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="laotian">Laotian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="latvian">Latvian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="lebanese">Lebanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="liberian">Liberian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="libyan">Libyan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="liechtensteiner">Liechtensteiner</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="lithuanian">Lithuanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="luxembourger">Luxembourger</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="macedonian">Macedonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="malagasy">Malagasy</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="malawian">Malawian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="malaysian">Malaysian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="maldivan">Maldivan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="malian">Malian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="maltese">Maltese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="marshallese">Marshallese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="mauritanian">Mauritanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="mauritian">Mauritian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="mexican">Mexican</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="micronesian">Micronesian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="moldovan">Moldovan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="monacan">Monacan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="mongolian">Mongolian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="moroccan">Moroccan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="mosotho">Mosotho</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="motswana">Motswana</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="mozambican">Mozambican</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="namibian">Namibian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="nauruan">Nauruan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="nepalese">Nepalese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="new zealander">New Zealander</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="ni-vanuatu">Ni-Vanuatu</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="nicaraguan">Nicaraguan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="nigerien">Nigerien</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="north korean">North Korean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="northern irish">Northern Irish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="norwegian">Norwegian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="omani">Omani</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="Palestine">Palestine</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="pakistani">Pakistani</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="palauan">Palauan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="panamanian">Panamanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="papua new guinean">Papua New Guinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="paraguayan">Paraguayan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="peruvian">Peruvian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="polish">Polish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="portuguese">Portuguese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="qatari">Qatari</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="romanian">Romanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="russian">Russian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="rwandan">Rwandan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="saint lucian">Saint Lucian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="salvadoran">Salvadoran</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="samoan">Samoan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="san marinese">San Marinese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="sao tomean">Sao Tomean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="saudi">Saudi</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="scottish">Scottish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="senegalese">Senegalese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="serbian">Serbian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="seychellois">Seychellois</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="sierra leonean">Sierra Leonean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="singaporean">Singaporean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="slovakian">Slovakian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="slovenian">Slovenian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="solomon islander">Solomon Islander</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="somali">Somali</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="south african">South African</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="south korean">South Korean</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="spanish">Spanish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="sri lankan">Sri Lankan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="sudanese">Sudanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="surinamer">Surinamer</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="swazi">Swazi</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="swedish">Swedish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="swiss">Swiss</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="syrian">Syrian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="taiwanese">Taiwanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="tajik">Tajik</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="tanzanian">Tanzanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="thai">Thai</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="togolese">Togolese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="tongan">Tongan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="tunisian">Tunisian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="turkish">Turkish</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="tuvaluan">Tuvaluan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="ugandan">Ugandan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="ukrainian">Ukrainian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="uruguayan">Uruguayan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="uzbekistani">Uzbekistani</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="venezuelan">Venezuelan</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="vietnamese">Vietnamese</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="welsh">Welsh</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="yemenite">Yemenite</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="zambian">Zambian</option>
                            <option style = {{backgroundColor : '#273c75' , color : "white"}}value="zimbabwean">Zimbabwean</option>
                        </select>
                    </div>
                </div>
                <div className="options_type" style={{ marginTop: '-40px' }}>
                    <div className="type" style = {{display : 'flex' , alignItems : 'center'}}>
                        <label style = {{fontWeight : 'bold' , color : '#273c75'}} htmlFor="">Role</label>
                        <select name="role" id="role" ref={roleRef} style={{ display: 'flex' , alignItems : 'center' , justifyContent : 'center', backgroundColor: "#273c75" , borderRadius : '10px' , minWidth: '60px' , marginLeft : '10px' , minHeight : '30px' }} disabled>
                            {/* role from local storage */}
                            <option value={loadedMeetups.role}>{theRole}</option>
                        </select>
                    </div>
                </div>

                <div className={classes.actions}>
                    <button>Update</button>
                </div>
            </form>
        </Card>
    );
}
export default EditUser;
