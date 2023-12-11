import { useState, useEffect } from 'react';
import Layout from '../Components/layout/Layout';
import MatchInfoList from '../Components/meetups/MatcchInfoList'
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../Components/pagination/Pagination';

function MatchesPage() {

  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Set the number of items per page


  // fetching
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

  return (
    <Layout>
      <section style={{ width: '100%' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Matches</h1>
        <MatchInfoList meetups={currentItems} /> {/* Display the current items */}
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

export default MatchesPage;