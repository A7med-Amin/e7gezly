import { useNavigate } from 'react-router-dom';
import Layout from '../Components/layout/Layout';

import NewStadiumForm from '../Components/meetups/NewStadiumForm'


function NewStaium() {
  const history = useNavigate();

  function addStadupHandler(meetupData) {
    fetch(
      `${process.env.REACT_APP_API_URL}api/addstadium/`,
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
        alert(" Can't add a stadium of same name " );
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
        <h1 style = {{fontWeight : 'bold' , textAlign : 'center' , marginBottom : '15px'}}>Add Stadium</h1>
        <NewStadiumForm onAddMeetup={addStadupHandler} />
      </section>
    </Layout>
  );

}

export default NewStaium;