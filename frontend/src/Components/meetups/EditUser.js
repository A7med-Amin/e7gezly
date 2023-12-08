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
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}} value={loadedMeetups.nationality} selected disabled hidden>{loadedMeetups.nationality}</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}} value="afghan">Afghan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}} value="albanian">Albanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="algerian">Algerian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="american">American</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="andorran">Andorran</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="angolan">Angolan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="antiguans">Antiguans</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="argentinean">Argentinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="armenian">Armenian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="australian">Australian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="austrian">Austrian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="azerbaijani">Azerbaijani</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bahamian">Bahamian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bahraini">Bahraini</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bangladeshi">Bangladeshi</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="barbadian">Barbadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="barbudans">Barbudans</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="batswana">Batswana</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="belarusian">Belarusian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="belgian">Belgian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="belizean">Belizean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="beninese">Beninese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bhutanese">Bhutanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bolivian">Bolivian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bosnian">Bosnian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="brazilian">Brazilian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="british">British</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bruneian">Bruneian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="bulgarian">Bulgarian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="burkinabe">Burkinabe</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="burmese">Burmese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="burundian">Burundian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="cambodian">Cambodian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="cameroonian">Cameroonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="canadian">Canadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="cape verdean">Cape Verdean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="central african">Central African</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="chadian">Chadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="chilean">Chilean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="chinese">Chinese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="colombian">Colombian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="comoran">Comoran</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="congolese">Congolese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="costa rican">Costa Rican</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="croatian">Croatian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="cuban">Cuban</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="cypriot">Cypriot</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="czech">Czech</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="danish">Danish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="djibouti">Djibouti</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="dominican">Dominican</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="dutch">Dutch</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="east timorese">East Timorese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="ecuadorean">Ecuadorean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="egyptian">Egyptian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="emirian">Emirian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="equatorial guinean">Equatorial Guinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="eritrean">Eritrean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="estonian">Estonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="ethiopian">Ethiopian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="fijian">Fijian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="filipino">Filipino</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="finnish">Finnish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="french">French</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="gabonese">Gabonese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="gambian">Gambian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="georgian">Georgian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="german">German</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="ghanaian">Ghanaian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="greek">Greek</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="grenadian">Grenadian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="guatemalan">Guatemalan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="guinea-bissauan">Guinea-Bissauan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="guinean">Guinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="guyanese">Guyanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="haitian">Haitian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="herzegovinian">Herzegovinian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="honduran">Honduran</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="hungarian">Hungarian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="icelander">Icelander</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="indian">Indian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="indonesian">Indonesian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="iranian">Iranian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="iraqi">Iraqi</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="irish">Irish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="italian">Italian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="ivorian">Ivorian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="jamaican">Jamaican</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="japanese">Japanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="jordanian">Jordanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="kazakhstani">Kazakhstani</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="kenyan">Kenyan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="kittian and nevisian">Kittian and Nevisian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="kuwaiti">Kuwaiti</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="kyrgyz">Kyrgyz</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="laotian">Laotian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="latvian">Latvian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="lebanese">Lebanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="liberian">Liberian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="libyan">Libyan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="liechtensteiner">Liechtensteiner</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="lithuanian">Lithuanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="luxembourger">Luxembourger</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="macedonian">Macedonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="malagasy">Malagasy</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="malawian">Malawian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="malaysian">Malaysian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="maldivan">Maldivan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="malian">Malian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="maltese">Maltese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="marshallese">Marshallese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="mauritanian">Mauritanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="mauritian">Mauritian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="mexican">Mexican</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="micronesian">Micronesian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="moldovan">Moldovan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="monacan">Monacan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="mongolian">Mongolian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="moroccan">Moroccan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="mosotho">Mosotho</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="motswana">Motswana</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="mozambican">Mozambican</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="namibian">Namibian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="nauruan">Nauruan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="nepalese">Nepalese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="new zealander">New Zealander</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="ni-vanuatu">Ni-Vanuatu</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="nicaraguan">Nicaraguan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="nigerien">Nigerien</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="north korean">North Korean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="northern irish">Northern Irish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="norwegian">Norwegian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="omani">Omani</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="Palestine">Palestine</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="pakistani">Pakistani</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="palauan">Palauan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="panamanian">Panamanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="papua new guinean">Papua New Guinean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="paraguayan">Paraguayan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="peruvian">Peruvian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="polish">Polish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="portuguese">Portuguese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="qatari">Qatari</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="romanian">Romanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="russian">Russian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="rwandan">Rwandan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="saint lucian">Saint Lucian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="salvadoran">Salvadoran</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="samoan">Samoan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="san marinese">San Marinese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="sao tomean">Sao Tomean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="saudi">Saudi</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="scottish">Scottish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="senegalese">Senegalese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="serbian">Serbian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="seychellois">Seychellois</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="sierra leonean">Sierra Leonean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="singaporean">Singaporean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="slovakian">Slovakian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="slovenian">Slovenian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="solomon islander">Solomon Islander</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="somali">Somali</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="south african">South African</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="south korean">South Korean</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="spanish">Spanish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="sri lankan">Sri Lankan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="sudanese">Sudanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="surinamer">Surinamer</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="swazi">Swazi</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="swedish">Swedish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="swiss">Swiss</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="syrian">Syrian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="taiwanese">Taiwanese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="tajik">Tajik</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="tanzanian">Tanzanian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="thai">Thai</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="togolese">Togolese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="tongan">Tongan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="tunisian">Tunisian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="turkish">Turkish</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="tuvaluan">Tuvaluan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="ugandan">Ugandan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="ukrainian">Ukrainian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="uruguayan">Uruguayan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="uzbekistani">Uzbekistani</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="venezuelan">Venezuelan</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="vietnamese">Vietnamese</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="welsh">Welsh</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="yemenite">Yemenite</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="zambian">Zambian</option>
                            <option style = {{backgroundColor : '#273c75' , color : '#273c75'}}value="zimbabwean">Zimbabwean</option>
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
