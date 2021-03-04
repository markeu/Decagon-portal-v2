import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const userInfo = localStorage.getItem('userInfo');

  const [authState, setAuthState] = useState({
    userInfo: userInfo ? JSON.parse(userInfo) : { data: { token: ''}}
  });

  const setAuthInfo = (userInfo) => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify(userInfo)
    );
    setAuthState({
      userInfo,
    });
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setAuthState({});
    history.push('/login');
  };
  const isAuthenticated = () => {
    if (!authState.userInfo.data.token ) {
      return false;
    }
    return true;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
