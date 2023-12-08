import { Route, Routes } from 'react-router-dom';
import AllMeetupsPage from "../pages/AllMeetups";
import NewStaium from "../pages/NewStadium";
import Login from "../pages/Login";
import MatchesPage from "../pages/Matches"
import Profile from "../pages/Profile"
import NewMatch from "../pages/NewMatch"
import YourTickets from "../pages/YourTickets"
import Adminstrator from '../pages/AdminPage';
import Seats from '../pages/Seats';
import Creditcard from '../Components/meetups/Creditcard';


function App() {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Adminstrator />} />
        <Route path='/Home' element={<AllMeetupsPage />} />
        <Route path='/new-stadium' element={<NewStaium />} />
        <Route path='/Matches' element={<MatchesPage />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/NewMatch' element={<NewMatch />} />
        <Route path='/YourTickets' element={<YourTickets />} />
        <Route path='/Seats' element={<Seats />} />
        <Route path='/creditCard' element={<Creditcard />} />
      </Routes>
  );
}

export default App;
