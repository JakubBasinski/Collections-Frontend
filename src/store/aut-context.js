import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: true,
  login: (token, user) => {},
  logout: () => {},
  userId: '',
});

const retriveStored = () => {
  const storedToken = localStorage.getItem('token');
  const storedId = localStorage.getItem('userId')
  return { token: storedToken, userId: storedId};
};


export const AuthContextProvider = (props) => {
  const storagedData = retriveStored();
  let initialToken;
  let initialUserId 
  if (storagedData) {
    initialToken = storagedData.token;
    initialUserId = storagedData.userId
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId)
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId)
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null)
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userId: userId
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
