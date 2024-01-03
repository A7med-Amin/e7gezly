import Layout from "../Components/layout/Layout";
import React from "react";
import { useState, useEffect } from "react";
import TicketsList from "../Components/meetups/TicketsList";
import Spinner from "react-bootstrap/Spinner";
import Pagination from '../Components/pagination/Pagination';


function YourTickets() {

  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page


  // fetching
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  var LoggedIn = localStorage.getItem("LoggedIn");
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
            ...data[key],
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  // pagination
  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loadedMeetups.slice(indexOfFirstItem, indexOfLastItem);


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

  if (currentItems.length === 0) {
    content = <div class="NoTickets">No Tickets yet</div>;
  } else {
    content = <TicketsList meetups={currentItems} />; // Display the current items
  }

  return (
    <Layout TicketsNum={loadedMeetups.length}>
      <section>
        <h1 style={{ color: "#192a56", textAlign: "center" }}>Your Tickets</h1>
        {content}
        <Pagination
          totalItems={loadedMeetups.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        /> {/* Add the Pagination component */}
      </section>
    </Layout>
  );
}

export default YourTickets;
