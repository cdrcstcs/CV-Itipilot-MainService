import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/User/RegisterPage.jsx";
import LoginPage from "./pages/User/LoginPage.jsx";
import ProfilePage from "./pages/User/ProfilePage.jsx";
import CreateItineraryPage from './pages/itinerary/CreateItinerary.jsx';
import AttractionListPage from './pages/Attraction/SelectAttraction.jsx';
import RatingPage from './pages/Rating/RatingPage.jsx';
import CreateRating from './pages/Rating/CreateRating.jsx';
import EventListPage from './pages/Event/EventsPage.jsx';
import CreateEvent from './pages/Event/CreateEvent.jsx';
import TagListPage from './pages/Tag/TagsPage.jsx';
import CreateTag from './pages/Tag/CreateTag.jsx';
import Header from './Header.jsx';
import CookiesProvider from "./Cookies.jsx";
import { ImageUploader } from "./pages/Image/ImageUploader.jsx";
import { SingleImage } from "./pages/Image/ImagePage.jsx";
import YourItinerariesPage from "./pages/itinerary/UserItineraries.jsx";
import SearchPage from "./pages/Search/SearchPage.jsx";
import SavedItinerariesPage from "./pages/itinerary/SavedItineraries.jsx";
function App() {
  return (
    <CookiesProvider>
      <Header path="/hi"/>
      <Routes>
        <Route path="/image/create" element={<ImageUploader/>}/>
        <Route path="/image" element={<SingleImage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/itineraries/user" element={<YourItinerariesPage />} />
        <Route path="/itineraries/saved" element={<SavedItinerariesPage />} />
        <Route path="/itinerary/create" element={<CreateItineraryPage />} />
        <Route path="/attractions" element={<AttractionListPage />} />
        <Route path="/ratings" element={<RatingPage />} />
        <Route path="/ratings/create" element={<CreateRating />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/tags" element={<TagListPage />} />
        <Route path="/tags/create" element={<CreateTag />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
