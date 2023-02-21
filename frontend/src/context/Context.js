import React, { createContext, useReducer } from "react";
import { userReducer, articleReducer } from "./Reducers";

export const wowContext = createContext();

const Context = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {
    user: [],
  });

  const [articleState, articleDispatch] = useReducer(articleReducer, {
    articles: [],
  });


  return (
    <wowContext.Provider
      value={{
        userState,
        userDispatch,
        articleState,
        articleDispatch,
       
      }}
    >
      {children}
    </wowContext.Provider>
  );
};

export default Context;
