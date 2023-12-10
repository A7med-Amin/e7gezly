import React , {useState , useEffect , useRef} from 'react'
import Card from '../ui/Card'
import './UserInfo.css'
const UserInfo = (props) => {
    const [MaleFemale, setMaleFemale] = useState();
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
                const meetup = data;
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
    const submitHandler = (event) => {
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
    const nationalityOptions = [
      "Afghan","Albanian","Algerian","American","Andorran","Angolan","Antiguans","Argentinean","Armenian","Australian","Austrian","Azerbaijani","Bahamian","Bahraini","Bangladeshi","Barbadian","Barbudans","Batswana","Belarusian","Belgian","Belizean","Beninese","Bhutanese","Bolivian","Bosnian","Brazilian","British","Bruneian","Bulgarian","Burkinabe","Burmese","Burundian","Cambodian","Cameroonian","Canadian","Cape Verdean","Central African","Chadian","Chilean","Chinese","Colombian","Comoran","Congolese","Costa Rican","Croatian","Cuban","Cypriot","Czech","Danish","Djibouti","Dominican","Dutch","East Timorese","Ecuadorean","Egyptian","Emirian","Equatorial Guinean","Eritrean","Estonian","Ethiopian","Fijian","Filipino","Finnish","French","Gabonese","Gambian","Georgian","German","Ghanaian","Greek","Grenadian","Guatemalan","Guinea-Bissauan","Guinean","Guyanese","Haitian","Herzegovinian","Honduran","Hungarian","Icelander","Indian","Indonesian","Iranian","Iraqi","Irish","Italian","Ivorian","Jamaican","Japanese","Jordanian","Kazakhstani","Kenyan","Kittian and Nevisian","Kuwaiti","Kyrgyz","Laotian","Latvian","Lebanese","Liberian","Libyan","Liechtensteiner","Lithuanian","Luxembourger","Macedonian","Malagasy","Malawian","Malaysian","Maldivan","Malian","Maltese","Marshallese","Mauritanian","Mauritian","Mexican","Micronesian","Moldovan","Monacan","Mongolian","Moroccan","Mosotho","Motswana","Mozambican","Namibian","Nauruan","Nepalese","New Zealander","Ni-Vanuatu","Nicaraguan","Nigerien","North Korean","Northern Irish","Norwegian","Omani","Palestinian","Pakistani","Palauan","Panamanian","Papua New Guinean","Paraguayan","Peruvian","Polish","Portuguese","Qatari","Romanian","Russian","Rwandan","Saint Lucian","Salvadoran","Samoan","San Marinese","Sao Tomean","Saudi","Scottish","Senegalese","Serbian","Seychellois","Sierra Leonean","Singaporean","Slovakian","Slovenian","Solomon Islander","Somali","South African","South Korean","Spanish","Sri Lankan","Sudanese","Surinamer","Swazi","Swedish","Swiss","Syrian","Taiwanese","Tajik","Tanzanian","Thai","Togolese","Tongan","Trinidadian or Tobagonian","Tunisian","Turkish","Tuvaluan","Ugandan","Ukrainian","Uruguayan","Uzbekistani","Venezuelan","Vietnamese","Welsh","Yemenite","Zambian","Zimbabwean",
    ];
  return (
        <Card>
            <form className = 'form' onSubmit={submitHandler}>
                <div className = 'control'>
                    <label htmlFor='username'><span className='vip'>User</span>Name</label>
                    <input className = 'userInputField' type='text' placeholder='username' required id='username' ref={usernameRef} disabled value={loadedMeetups.username} />
                </div>
                <div className='control'>
                    <label htmlFor='opass'><span className = 'vip'>Old</span> Password</label>
                    <input className = 'userInputField' type='password' placeholder='password' required={Passo === "true" ? true : false} id='opass' ref={oldpasswordRef} />
                </div>
                <div className = 'control'>
                    <label htmlFor='pass'><span className = 'vip'>Pass</span>word</label>
                    <input className = 'userInputField' type='password' placeholder='password' required={Passo === "true" ? true : false} id='pass' ref={passwordRef} />
                </div>
                <div className = 'control'>
                    <label htmlFor='cpass'><span className = 'vip'>Confirm</span> Password</label>
                    <input className = 'userInputField' type='password' placeholder='password' required={Passo === "true" ? true : false} id='cpass' ref={ConpasswordRef} />
                </div>
                <div className = 'control'>
                    <label htmlFor='first_name'><span className = 'vip'>First</span> Name</label>
                    <input className = 'userInputField' type='text' placeholder='First name' required id='first_name' ref={fisrtNameRef} defaultValue={loadedMeetups.first_name} />
                </div>
                <div className = 'control'>
                    <label htmlFor='last_name'><span className = 'vip'>Last</span> Name</label>
                    <input className = 'userInputField' type='text' placeholder='Second name' required id='last_name' ref={lastNameRef} defaultValue={loadedMeetups.last_name} />
                </div>
                <div className = 'control'>
                    <label htmlFor='email'>Email</label>
                    <input className = 'userInputField' type='email' placeholder='Email' required id='email' ref={emailRef} disabled value={loadedMeetups.email} />
                </div>
                <div className = 'control'>
                    <label htmlFor='birth'><span className = 'vip'>Birth</span>date</label>
                    <input className = 'userInputField' type='date' required id='birth' ref={birthRef} defaultValue={loadedMeetups.birthdate} />
                </div>


                <div className="type">
                <label className = 'roleLabel' htmlFor="">Gender</label>
                    <div className = 'femaleMaleContainer'>
                        <input type="radio" required id="gender" value="F" name="gender" ref={FgenderRef} checked={MaleFemale === "F" ? true : false} onClick={() => setMaleFemale('F')} className = 'inputGender' />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className = 'femaleMaleContainer'>
                        <input type="radio" required id="gender" value="M" name="gender" ref={MgenderRef} checked={MaleFemale === "M" ? true : false} onClick={() => setMaleFemale('M')} className = 'inputGender' />
                        <label htmlFor="male">Male</label>
                    </div>
                </div>

                <div className = 'nationalityOptions'>
                        <label className = 'roleLabel' htmlFor="nationality">Nationality</label>
                        <select className = 'nationalitySelect' name="nationality" id="nationality" ref={NationRef}>
                            <option className = 'select_options' value={loadedMeetups.nationality} selected disabled hidden>{loadedMeetups.nationality}</option>
                            {nationalityOptions.map((nationality) => (
                                <option value = {nationality} className = 'select_options'>{nationality}</option>
                            ))}
                        </select>
                </div>

                <div className="control">
                        <label className = 'roleLabel' htmlFor="">Role</label>
                        <input className = 'userInputField' type='text' placeholder='role' required id='role' ref={roleRef} disabled value={theRole} />
                </div>

                <div className='actions'>
                    <button>Update</button>
                </div>
            </form>
        </Card>
  )
}
export default UserInfo
