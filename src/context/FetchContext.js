import React, { createContext } from 'react';
import axios from 'axios';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: "http://decadev-recruitment-portal.herokuapp.com/api/v1"
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
