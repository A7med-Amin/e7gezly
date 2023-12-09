import { useNavigate } from 'react-router-dom';
import Layout from "../Components/layout/Layout";
import UserInfo from '../Components/UserInfo/UserInfo';
import classes from '../Components/ui/Card.module.css';
function Profile() {

    const history = useNavigate();

    var LoggedIn=localStorage.getItem('LoggedIn');
    LoggedIn=JSON.parse(LoggedIn);

    function editUser(meetupData) {
      fetch(
        /*Get user name from local storage */
        `${process.env.REACT_APP_API_URL}api/updateuser/${LoggedIn[0]["username"]}/`,
        {
          method: 'POST',
          body: JSON.stringify(meetupData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        console.log(meetupData);
        if (res.status !== 200) {
          alert("Error: " + res.status );
        }
        else {
          history('/Home');
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  
    return (
      <Layout>
        <section>
          <h1 style = {{textAlign : 'center' , fontWeight : 'bold' , marginBottom : '20px'}}>Profile</h1>
          <div className = {classes.cardoutsidelayoyt}>
          <UserInfo onAddMeetup={editUser} />
          </div>
        </section>
      </Layout>
    );
}

export default Profile;