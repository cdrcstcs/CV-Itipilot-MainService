import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from './Cookies';
import { useState } from 'react';
import { useEffect } from 'react';
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const cookie = useCookies();
  useEffect(() => {
    const token = cookie.get('token');
    console.log(token);
    if (token == '') {
      setLoggedIn(true);
      setUserName(user.name); 
    } else {
      setLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLogout = () => {
    cookie.set('token','');
    setLoggedIn(false);
    setUserName('');
  };

  return (
    <header style={{ fontSize:'17px',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)',backgroundImage: 'url("../header.jpg")', color: 'white', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="flex justify-between bg-gray-100 p-4">
      <img 
        src="../icon.png" 
        alt="Icon" 
        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
      />
      <nav>
        <ul className="flex gap-4">
          {!loggedIn ? (
            <li><Link to="/login">Login</Link></li>
          ) : (
            <>
              <li>Welcome, {userName}!</li>
              <li><button onClick={handleLogout}>Logout</button></li>
              <li><Link to="/account">Profile</Link></li>
              <li><Link to="/itinerary/create">Create Itinerary</Link></li>
              <li><Link to="/attraction/create">Create Attraction</Link></li>
              <li><Link to="/">Itineraries</Link></li>
              <li><Link to="/attractions">Attractions</Link></li>
              <li><Link to="/ratings">Ratings</Link></li>
              <li><Link to="/ratings/create">Create Rating</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/events/create">Create Event</Link></li>
              <li><Link to="/tags">Tags</Link></li>
              <li><Link to="/tags/create">Create Tag</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
