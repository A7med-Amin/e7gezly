import { useState, useEffect } from 'react';
import Layout from '../Components/layout/Layout';
import MatchInfoList from '../Components/meetups/MatcchInfoList'
import Spinner from 'react-bootstrap/Spinner';

function MatchesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}api/matches`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <section>
          <Spinner animation="border" />
        </section>
      </Layout>
    );
  }
  return (
    <Layout>
      <section>
        <h1 style = {{textAlign : 'center' , fontWeight : 'bold' , marginBottom : '10px'}}>Matches</h1>
        <MatchInfoList meetups={loadedMeetups} />
      </section>
    </Layout>
  );
}

export default MatchesPage;