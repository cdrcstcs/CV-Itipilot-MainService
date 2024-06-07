import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from './Cookies';
import { useState } from 'react';
import { useEffect } from 'react';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const cookie = useCookies();
  const token = cookie.get('token');
  useEffect(() => {
    console.log(token);
    if (token !== '') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]); // Watch for changes in cookie

  const handleLogout = () => {
    cookie.set('token', '');
    setLoggedIn(false);
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundImage: 'url("../header.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        overflowX: 'auto', // Make the header scrollable
        padding: '10px 20px', // Adjust padding for better appearance
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
            <Link to="/attraction/create" style={{ textDecoration: 'none', color: 'orangered' }}>Create Attraction</Link>
            <Link to="/itineraries/user" style={{ textDecoration: 'none', color: 'orangered' }}>Your Itineraries</Link>
          </>
        )}
    </header>
  );
};

export default Header;
