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
    <header className="bg-[rgba(0,255,255,0.2)] bg-cover bg-no-repeat px-5 py-4 rounded-3xl border-5 border-white flex items-center justify-start gap-10 overflow-x-auto font-fantasy text-[ButtonHighlight] text-[17px] mt-5">
      <div>
        <img
          src="../icon.png"
          alt="Icon"
          className="w-12 h-12 rounded-full"
        />
      </div>
      {!loggedIn ? (
        <Link to="/login" className="text-[orangered] font-semibold no-underline">
          Login
        </Link>
      ) : (
        <>
          <button onClick={handleLogout} className="text-[orangered] font-semibold">
            Logout
          </button>
          <Link to="/account" className="text-[orangered] no-underline font-semibold">
            Profile
          </Link>
          <Link to="/search" className="text-[orangered] no-underline font-semibold">
            Home
          </Link>
          <Link to="/itinerary/create" className="text-[orangered] no-underline font-semibold">
            Create Itinerary
          </Link>
          <Link to="/events/create" className="text-[orangered] no-underline font-semibold">
            Create Event
          </Link>
          <Link to="/itineraries/saved" className="text-[orangered] no-underline font-semibold">
            Saved Itineraries
          </Link>
          <Link to="/itineraries/user" className="text-[orangered] no-underline font-semibold">
            Your Itineraries
          </Link>
          {[
            { text: 'Social Media', url: 'http://localhost:5000' },
            { text: 'Attraction Map', url: 'http://localhost:5600' },
            { text: 'Weather', url: 'http://localhost:5700' },
            { text: 'Note', url: 'http://localhost:5800' },
            { text: 'Food', url: 'http://localhost:5174' },
          ].map((link, index) => (
            <div
              key={index}
              className="cursor-pointer bg-transparent text-[orangered] font-semibold"
              onClick={() => handleClick(index)}
            >
              {link.text}
              <a
                href={link.url}
                ref={(el) => (hiddenLinkRefs.current[index] = el)}
                className="hidden"
              >
                Hidden Link
              </a>
            </div>
          ))}
        </>
      )}
    </header>
  );
};

export default Header;