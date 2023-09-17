import {
    GET_CURRENT_USER,
    LOG_OUT_USER,
    // POST_NEW_USER,
  } from "./actionTypes";
  
  const initState = {
    // AllUsers: [],
    currUser: {},
    isLogin: false,
  };
  
  const accountReducer = (state = initState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      // case POST_NEW_USER:
      //   return { ...state, AllUsers: [...state.AllUsers, payload] };
  
      case GET_CURRENT_USER:
        return { ...state, isLogin: true, currUser: payload };
  
      case LOG_OUT_USER:
        return { ...state, isLogin: false, currUser: {} };
  
      default:
        return state;
    }
  };
  
  export { accountReducer };
  