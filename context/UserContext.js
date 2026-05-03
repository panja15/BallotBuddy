// file: context/UserContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userState, setUserState] = useState({
    eligibilityChecked: false,
    formType: null, // FORM_6, FORM_7, FORM_8, FORM_8A
    registrationStatus: 'NOT_STARTED', // NOT_STARTED | IN_PROGRESS | SUBMITTED
    verificationStatus: 'NOT_STARTED', // NOT_STARTED | PENDING | COMPLETED
  });

  // Load state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('ballotBuddy_userState');
    if (savedState) {
      setUserState(JSON.parse(savedState));
    }
  }, []);

  // Persist state on change
  const updateState = (updates) => {
    setUserState(prev => {
      const newState = { ...prev, ...updates };
      localStorage.setItem('ballotBuddy_userState', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <UserContext.Provider value={{ userState, updateState }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
