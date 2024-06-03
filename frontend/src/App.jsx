import './App.css'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/User/LoginPage.jsx";
import Layout from "./Layout";
import RegisterPage from "./pages/User/RegisterPage.jsx";
import {UserContextProvider} from "./pages/User/UserContext.jsx";
import ProfilePage from "./pages/User/ProfilePage.jsx";
import ItinerariesPage from './pages/itinerary/ItineraryPage.jsx';


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
