import Layout from "../Components/layout/Layout";
import React from "react";
import { useState, useEffect } from 'react';
import TicketsList from "../Components/meetups/TicketsList";
import Spinner from 'react-bootstrap/Spinner';


function YourTickets() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  var LoggedIn = localStorage.getItem('LoggedIn');
  LoggedIn = JSON.parse(LoggedIn);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      /*Get user name from local storage */
      `${process.env.REACT_APP_API_URL}api/tickets/${LoggedIn[0]["username"]}`
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

  // console.log(loadedMeetups);

  if (isLoading) {
    return (
      <Layout>
        <section>
          <Spinner animation="border" />
        </section>
      </Layout>
    );
  }

  let content;

  if (loadedMeetups.length === 0) {
    content = <div class = "NoTickets">No Tickets yet</div>
  }
  else {
    content = <TicketsList meetups={loadedMeetups} />
  }

  return (
    <Layout TicketsNum={loadedMeetups.length}>
      <section>
        <h1 style={{ color: '#192a56', textAlign: 'center' }}>Your Tickets</h1>
        {content}
      </section>
    </Layout>
  );
}

export default YourTickets;