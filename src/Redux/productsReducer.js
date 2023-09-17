import {
    GET_DEBOUNCING_SUCCESS,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_SUCCESS,
    SET_DEBOUNCING_RESET,
  } from "./actionTypes";
  
  const initState = {
    AllProducts: [],
    totalPages: 1,
    isLoading: false,
    isError: false,
    currProduct: {},
    debouncingArr : []
  };
  
  const productsReducer = (state = initState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PRODUCT_REQUEST:
        return { ...state, isLoading: true, isError: false };
  
      case GET_PRODUCT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          debouncingArr: [],
          AllProducts: payload.data,
          totalPages: payload.totalPages,
        };
  
      case GET_PRODUCT_FAILURE:
        return { ...state, isLoading: false, isError: true };
  
      case GET_SINGLE_PRODUCT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          debouncingArr: [],
          currProduct: payload,
        };
  
      case GET_DEBOUNCING_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          debouncingArr: payload,
        };
      
      case SET_DEBOUNCING_RESET :
        return {
          ...state,
          isLoading: false,
          isError: false,
          debouncingArr: []
        }
  
      default:
        return state;
    }
  };
  
  export { productsReducer };
  