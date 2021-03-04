import React, { createContext } from 'react';
import axios from 'axios';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: "https://tradedepotapp.herokuapp.com"
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
