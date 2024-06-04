import React, { createContext, useContext } from 'react';
import { Cookies } from 'react-cookie';

// Create a context for the cookies
const CookiesContext = createContext();

// Create a context provider to wrap your application
export default function CookiesProvider({ children }) {
  const cookies = new Cookies();
  return (
    <CookiesContext.Provider value={cookies}>
      {children}
    </CookiesContext.Provider>
  );
}

// Custom hook to access the cookies instance
export function useCookies() {
  return useContext(CookiesContext);
}
