import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);

  useEffect(() => {
    const usertoken = cookies.usertoken;
    setLoggedIn(usertoken !== undefined && usertoken !== '');
  }, [cookies]);

  const handleLogout = () => {
    removeCookie('usertoken');
    setLoggedIn(false);
  };

  return (
    <header className="bg-white mb-3 bg-cover p-2 border-4 border-red-600 bg-no-repeat px-5 py-4 rounded-3xl border-5  flex items-center justify-start gap-10 overflow-x-auto hide-scrollbar font-fantasy text-[ButtonHighlight] text-[17px] mt-5">
      <div>
        <Link to="/search" className="text-[orangered] no-underline font-semibold">
          <img
            src="../icon.png"
            alt="Icon"
            className="w-12 h-12 rounded-full"
          />
        </Link>
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
          <Link to="/itinerary/create" className="text-[orangered] no-underline font-semibold">
            Create Itinerary
          </Link>
          <Link to="/itineraries/saved" className="text-[orangered] no-underline font-semibold">
            Saved Itineraries
          </Link>
          <Link to="/itineraries/user" className="text-[orangered] no-underline font-semibold">
            Your Itineraries
          </Link>
          <a
            href="http://localhost:5000"
            className="text-[orangered] no-underline font-semibold"
          >
            Social Media
          </a>
          <a
            href="http://localhost:5600"
            className="text-[orangered] no-underline font-semibold"
          >
            Attraction Map
          </a>
          <a
            href="http://localhost:5700"
            className="text-[orangered] no-underline font-semibold"
          >
            Weather
          </a>
          <a
            href="http://localhost:5800"
            className="text-[orangered] no-underline font-semibold"
          >
            Note
          </a>
          <a
            href="http://localhost:5174"
            className="text-[orangered] no-underline font-semibold"
          >
            Food
          </a>
        </>
      )}
    </header>
  );
};

export default Header;