import {
    DELETE_ADDRESS,
    DELETE_CARD,
    POST_NEW_ADDRESS,
    POST_NEW_CARD,
    SELECT_CURR_ADDRESS,
    SELECT_CURR_CARD,
  } from "./actionTypes";
  
  const initState = {
    AddressData: [],
    CardsData: [],
    currAddress: {},
    currCard: {},
  };
  
  const paymentReducer = (state = initState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case POST_NEW_ADDRESS:
        return {
          ...state,
          AddressData: [...state.AddressData, payload],
        };
  
      case POST_NEW_CARD:
        return {
          ...state,
          CardsData: [...state.CardsData, payload],
        };
  
      case SELECT_CURR_ADDRESS:
        let currA = state.AddressData.find((ele) => ele._id === payload);
        return {
          ...state,
          currAddress: currA,
        };
  
      case SELECT_CURR_CARD:
        let currC = state.AddressData.find((ele) => ele._id === payload);
        return {
          ...state,
          currCard: currC,
        };
  
      case DELETE_ADDRESS:
        let newAddressData = state.AddressData.filter(
          (ele) => ele._id !== payload
        );
        return {
          ...state,
          AddressData: newAddressData,
        };
  
      case DELETE_CARD:
        let newCardData = state.CardsData.filter((ele) => ele._id !== payload);
        return {
          ...state,
          CardsData: newCardData,
        };
  
      default:
        return state;
    }
  };
  
  export { paymentReducer };
  