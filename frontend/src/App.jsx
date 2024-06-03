import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import UserContextProvider from "./pages/User/UserContext.jsx";
import RegisterPage from "./pages/User/RegisterPage.jsx";
import LoginPage from "./pages/User/LoginPage.jsx";
import ProfilePage from "./pages/User/ProfilePage.jsx";
import CreateItineraryPage from './pages/itinerary/CreateItinerary.jsx';
import CreateAttractionPage from './pages/Attraction/CreateAttraction.jsx';
import ItinerariesPage from './pages/itinerary/ItineraryPage.jsx';
import AttractionListPage from './pages/Attraction/SelectAttraction.jsx';
import RatingPage from './pages/Rating/RatingPage.jsx';
import CreateRating from './pages/Rating/CreateRating.jsx';
import EventListPage from './pages/Event/EventsPage.jsx';
import CreateEvent from './pages/Event/CreateEvent.jsx';
import TagListPage from './pages/Tag/TagsPage.jsx';
import CreateTag from './pages/Tag/CreateTag.jsx';
import Header from './Header.jsx';
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<ItinerariesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/itinerary/create" element={<CreateItineraryPage />} />
          <Route path="/attraction/create" element={<CreateAttractionPage />} />
          <Route path="/attractions" element={<AttractionListPage />} />
          <Route path="/ratings" element={<RatingPage />} />
          <Route path="/ratings/create" element={<CreateRating />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/tags" element={<TagListPage />} />
          <Route path="/tags/create" element={<CreateTag />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
