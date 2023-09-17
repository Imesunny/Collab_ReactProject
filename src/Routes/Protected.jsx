import React from "react";
import { useSelector } from "react-redux";
import {Navigate} from "react-router-dom"

const Protected = ({ children }) => {

  // Protected login
  const isLogin = useSelector((store) => {
    return store.accountReducer.isLogin;
  });

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
