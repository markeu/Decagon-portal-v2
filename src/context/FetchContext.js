import React, { createContext } from 'react';
import axios from 'axios';

const FetchContext = createContext();
const { Provider } = FetchContext;

const userInfo = localStorage.getItem('userInfo');
const data = JSON.parse(userInfo) || '';
const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: "http://decadev-recruitment-portal.herokuapp.com/api/v1",
    headers: { Authorization: `Bearer ${data.token}` },
  });

  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
