import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const MainContext = React.createContext({});

const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(true);

  return (
    <MainContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, update, setUpdate }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
