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
    if (token!='') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]); // Watch for changes in cookie
  

  const handleLogout = () => {
    cookie.set('token','');
    setLoggedIn(false);

  };
  return (
    <header style={{ fontFamily:'fantasy',textDecorationColor:'ButtonHighlight',marginTop:'20px',fontSize:'17px',alignItems:'center', justifyContent:'space-between',backgroundColor:'rgba(0, 0, 0, 0.5)',backgroundImage: 'url("../header.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display:'flex' }} >
      <img 
        src="../icon.png" 
        alt="Icon" 
        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
      />
      {!loggedIn ? (
        <div style={{ marginRight: '15px' }}><Link to="/login" style={{ textDecoration: 'none' , color:'orangered'}}>Login</Link></div>
      ) : (
        <>
          <div style={{ marginRight: '15px' }}><button onClick={handleLogout}>Logout</button></div>
          <div style={{ marginRight: '15px' }}><Link to="/account" style={{ textDecoration: 'none', color:'orangered' }}>Profile</Link></div>
          <div style={{ marginRight: '15px' }}><Link to="/itineraries" style={{ textDecoration: 'none', color:'orangered'}}>Itineraries</Link></div>
          <div style={{ marginRight: '15px' }}><Link to="/itinerary/create" style={{ textDecoration: 'none' , color:'orangered'}}>Create Itinerary</Link></div>
          <div style={{ marginRight: '15px' }}><Link to="/events" style={{ textDecoration: 'none' , color:'orangered'}}>Events</Link></div>
          <div style={{ marginRight: '15px' }}><Link to="/events/create" style={{ textDecoration: 'none' , color:'orangered'}}>Create Event</Link></div>
          <div style={{ marginRight: '15px' }}><Link to="/attractions" style={{ textDecoration: 'none', color:'orangered' }}>Attractions</Link></div>
          <div style={{ marginRight: '15px' }}><Link to="/attraction/create" style={{ textDecoration: 'none', color:'orangered' }}>Create Attraction</Link></div>
        </>
      )}
    </header>
  );
};

export default Header;
