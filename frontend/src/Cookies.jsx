import React, { createContext, useContext } from 'react';
import { Cookies } from 'react-cookie';
const CookiesContext = createContext();
export default function CookiesProvider({ children }) {
  const cookies = new Cookies();
  return (
    <CookiesContext.Provider value={cookies}>
      {children}
    </CookiesContext.Provider>
  );
}
export function useCookies() {
  return useContext(CookiesContext);
}
