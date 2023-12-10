import { createContext, useEffect, useState } from "react";

export const TicketsContext = createContext();

export function TicketsContextProvider(props) {
  const [userTickets, setUserTickets] = useState([]);
  const [userTicketCount, setUserTicketCount] = useState(0);
  function addTicketeHandler(boughtTicket) {
    setUserTickets((prevUserTickets) => {
      return prevUserTickets.concat(boughtTicket);
    });
  }

  function removeTicketeHandler(matchID) {
    setUserTickets((prevUserTickets) => {
      // meetup.id is the match id
      return prevUserTickets.filter((meetup) => meetup.id !== matchID);
    });
  }

  function itemIsTicketHandler(matchID) {
    // meetup.id is the match id
    return userTickets.some((meetup) => meetup.id === matchID);
  }

  var LoggedIn = localStorage.getItem("LoggedIn");
  LoggedIn = JSON.parse(LoggedIn);

  const context = {
    tickets: userTickets,
    totaltickets: userTicketCount,
    addTicket: addTicketeHandler,
    removeTicket: removeTicketeHandler,
    itemIsBought: itemIsTicketHandler,
  };
  useEffect(() => {
    if(!LoggedIn){
      return;
    }
    fetch(
      /*Get user name from local storage */
      `${process.env.REACT_APP_API_URL}api/tickets/${LoggedIn[0]["username"]}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        context.tickets = data;
        context.totaltickets = data.length;
        setUserTickets(data);
        setUserTicketCount(data.length);
      });
  }, []);

  return (
    <TicketsContext.Provider value={ userTicketCount }>
      {props.children}
    </TicketsContext.Provider>
  );
}

export default TicketsContext;
