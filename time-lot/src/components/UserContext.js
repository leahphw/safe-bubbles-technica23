import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userProfiles, setUserProfiles] = useState([]);
  
  const addUserProfile = (userProfile) => {
    setUserProfiles([...userProfiles, userProfile]);
  }

  return (
    <UserContext.Provider value={{ userProfiles, addUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}