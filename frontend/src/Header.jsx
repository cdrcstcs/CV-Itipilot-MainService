import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from './Cookies';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const cookie = useCookies();
  const token = cookie.get('usertoken');
  const hiddenLinkRefs = useRef([]);

  useEffect(() => {
    setLoggedIn(token !== '');
  }, [token]);

  const handleLogout = () => {
    cookie.set('usertoken', '');
    setLoggedIn(false);
  };

  const handleClick = (index) => {
    hiddenLinkRefs.current[index].click();
    replaceHistory(window.location.href);
  };

  const replaceHistory = (url) => {
    window.history.replaceState({}, document.title, url);
  };

  return (
    <header
      style={{
        fontFamily: 'fantasy',
        textDecorationColor: 'ButtonHighlight',
        marginTop: '20px',
        fontSize: '17px',
        alignItems: 'center',
        gap:'50px',
        justifyContent:'flex-start',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        overflowX: 'auto', // Make the header scrollable
        padding: '10px 20px', // Adjust padding for better appearance
        borderRadius:'20px',
        border: '5px solid white'
      }}
    >
      <div>
        <img
          src="../icon.png"
          alt="Icon"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      </div>
        {!loggedIn ? (
          <Link to="/login" style={{ textDecoration: 'none', color: 'orangered' }}>Login</Link>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/account" style={{ textDecoration: 'none', color: 'orangered'}}>Profile</Link>
            <Link to="/itineraries" style={{ textDecoration: 'none', color: 'orangered'}}>Itineraries</Link>
            <Link to="/itinerary/create" style={{ textDecoration: 'none', color: 'orangered'}}>Create Itinerary</Link>
            <Link to="/events/create" style={{ textDecoration: 'none', color: 'orangered' }}>Create Event</Link>
            <Link to="/itineraries/user" style={{ textDecoration: 'none', color: 'orangered' }}>Your Itineraries</Link>
            {[
              { text: 'Social Media', url: 'http://localhost:5000' },
              { text: 'Attraction Map', url: 'http://localhost:5600' },
              { text: 'Weather', url: 'http://localhost:5700' },
              { text: 'Note', url: 'http://localhost:5800' },
              { text: 'Food', url: 'http://localhost:5174' },
            ].map((link, index) => (
              <div
                key={index}
                style={{cursor: 'pointer',backgroundColor: 'transparent',color: 'orangered'}}
                onClick={() => handleClick(index)}
              >
                {link.text}
                <a href={link.url} ref={(el) => (hiddenLinkRefs.current[index] = el)} style={{ display: 'none' }}>Hidden Link</a>
              </div>
            ))}
          </>
        )}
    </header>
  );
};

export default Header;