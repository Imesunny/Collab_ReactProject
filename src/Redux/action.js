import axios from "axios";
import {
  ADD_TO_WISHLIST,
  DEC_CART_QUANTITY,
  DELETE_CART_PRODUCT,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CURRENT_USER,
  GET_DEBOUNCING_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_WISHLIST_FAILURE,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  INC_CART_QUANTITY,
  LOG_OUT_USER,
  POST_CART_PRODUCT,
  POST_NEW_ADDRESS,
  POST_NEW_CARD,
  // POST_NEW_USER,
  REMOVE_FROM_WISHLIST,
  SET_DEBOUNCING_RESET,
} from "./actionTypes";

// let mainUrl = process.env.REACT_APP_API_URL;
let mainUrl="https://specialized-server.onrender.com"
const token = JSON.parse(localStorage.getItem("token")) || "";

// Product page actionObj  ------------------------------------------------------
const getProductsRequestAction = () => {
  return {
    type: GET_PRODUCT_REQUEST,
  };
};
const getProductsSuccessAction = (data, newTotalPages) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: {
      data,
      totalPages: newTotalPages,
    },
  };
};
const getProductsFailureAction = (payload) => {
  return {
    type: GET_PRODUCT_FAILURE,
  };
};
const getSingleProductAction = (payload) => {
  return {
    type: GET_SINGLE_PRODUCT_SUCCESS,
    payload,
  };
};

// Products page dispatch functions
export const getProducts =
  (
    page,
    sorting,
    categoryQuery,
    priceQuery,
    colorQuery,
    discountQuery,
    totalPages
  ) =>
  (dispatch) => {
    dispatch(getProductsRequestAction());
    let url = `${mainUrl}/products?_page=${page}&_limit=9`;

    if (sorting) {
      url += `&_sort=price&_order=${sorting}`;
    }
    if (categoryQuery !== "") {
      url += `&${categoryQuery}`;
    }
    if (priceQuery) {
      url += `&${priceQuery}`;
    }
    if (colorQuery) {
      url += `&${colorQuery}`;
    }
    if (discountQuery) {
      url += `&${discountQuery}`;
    }
    // console.log(url)

    axios
      .get(url, { headers: { "Accept-Range": "items", "Range-Unit": "items" } })
      .then((res) => {
        // const totalCount = res.headers["x-total-count"];
        // const newTotalPages = Math.ceil(totalCount / 9); // Assuming 9 items per page
        const data = res.data.data;
        const newTotalPages = res.data.totalPages;
        if (newTotalPages < totalPages) {
          dispatch(
            getProducts(
              1,
              sorting,
              categoryQuery,
              priceQuery,
              colorQuery,
              discountQuery,
              newTotalPages
            )
          );
        }
        // console.log(res);
        dispatch(getProductsSuccessAction(data, newTotalPages));
      })
      .catch(() => dispatch(getProductsFailureAction()));
  };

export const getSingleProduct = (id) => (dispatch) => {
  dispatch(getProductsRequestAction());
  axios
    .get(`${mainUrl}/products/${id}`)
    .then((res) => dispatch(getSingleProductAction(res.data)))
    .catch(() => dispatch(getProductsFailureAction()));
};

// -------------------------------------------------------------------------------------- //

// Cart page actionObj  --------------------------------------------------------------------
const getCartDataRequestAction = () => {
  return {
    type: GET_CART_REQUEST,
  };
};
const getCartDataSuccessAction = (payload) => {
  const cartProducts = payload.map((product) => ({
    ...product,
    quantity: 1,
  }));

  return {
    type: GET_CART_SUCCESS,
    payload: cartProducts,
  };
};

const getCartDataFailureAction = () => {
  return {
    type: GET_CART_FAILURE,
  };
};
const postCartDataAction = (payload) => {
  return {
    type: POST_CART_PRODUCT,
    payload,
  };
};
const deleteCartDataAction = (payload) => {
  return {
    type: DELETE_CART_PRODUCT,
    payload,
  };
};
const incrementCartQuantityAction = (payload) => {
  return {
    type: INC_CART_QUANTITY,
    payload,
  };
};
const decrementCartQuantityAction = (payload) => {
  return {
    type: DEC_CART_QUANTITY,
    payload,
  };
};

// Cart page dispatch functions

export const getCartProducts = (dispatch) => {
  dispatch(getCartDataRequestAction());
  axios
    .get(`${mainUrl}/cart`
    // , {
    //   headers: {
    //     autherization: `Bearer ${token}`, // Set the Authorization header with the token
    //   },
    // }
    )
    .then((res) => dispatch(getCartDataSuccessAction(res.data)))
    .catch(() => dispatch(getCartDataFailureAction()));
};

export const postCartProduct = (newProduct) => (dispatch) => {
  console.log(newProduct);
  dispatch(getCartDataRequestAction());
  axios
    .post(`${mainUrl}/cart`, newProduct)
    .then((res) => dispatch(postCartDataAction(res.data)))
    .catch(() => dispatch(getCartDataFailureAction()));
};

export const deleteCartProduct = (id) => (dispatch) => {
  axios
    .delete(`${mainUrl}/cart/${id}`)
    .then((res) => dispatch(deleteCartDataAction(id)));
};

export const incCartQuantity = (id) => (dispatch) => {
  dispatch(incrementCartQuantityAction(id));
};

export const decCartQuantity = (id) => (dispatch) => {
  dispatch(decrementCartQuantityAction(id));
};

// --------------------------------------------------------------------------------------------

// Account page actionObj -----------------------------------------------------------------

// const postUserAction = (payload) => {
//   return {
//     type: POST_NEW_USER,
//     payload,
//   };
// };
const loginUserAction = (payload) => {
  return {
    type: GET_CURRENT_USER,
    payload,
  };
};
const logOutUserAction = () => {
  return {
    type: LOG_OUT_USER,
  };
};

// Account page dispatch functions
export const postNewUser = (newUser) => async (dispatch) => {
  try {
    const response = await axios.post(`${mainUrl}/signup`, newUser);

    if (response.data.message === "Signup successful") {
      // Handle successful signup
      // dispatch(postUserAction(newUser));
      return true;
    } else if (response.data.error === "UserAlreadyExists") {
      // Display a message indicating that the user already exists
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    // Display a generic error message
    return "failed";
  }
};

export const LoginUser = (currUser) => async (dispatch) => {
  try {
    const response = await axios.post(`${mainUrl}/login`, currUser);
    if (response.data.msg === "Login Successful") {
      const token = response.data.token;
      // Handle successful login, e.g., store the token in localStorage or a cookie
      getCurrentUser(currUser, dispatch);
      localStorage.setItem("token", JSON.stringify(token));
      return true;
    } else {
      // Handle login failure, e.g., display an error message to the user
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle login failure due to a network error or server issue
    return "failed";
  }
};

export const getCurrentUser = async (currUser, dispatch) => {
  console.log(dispatch);
  try {
    const response = await axios.post(`${mainUrl}/signup/getuser`, currUser);
    if (response.data.msg === "User Found") {
      const user = response.data.user;
      dispatch(loginUserAction(user));
      localStorage.setItem("userEmail", JSON.stringify(user.email));
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle login failure due to a network error or server issue
    return "failed";
  }
};

export const logOutUser = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  dispatch(logOutUserAction());
};

// --------------------------------------------------------------------------------------------

// Wishlist page actionObj --------------------------------------------------------------------

const getWishRequestAction = () => {
  return {
    type: GET_WISHLIST_REQUEST,
  };
};
const getWishSuccessAction = (payload) => {
  return {
    type: GET_WISHLIST_SUCCESS,
    payload,
  };
};
const getWishFailureAction = () => {
  return {
    type: GET_WISHLIST_FAILURE,
  };
};
const addWishAction = (payload) => {
  return {
    type: ADD_TO_WISHLIST,
    payload,
  };
};
const removeWishAction = (payload) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload,
  };
};

// wishlist page dispatch function
export const getWishList = (dispatch) => {
  dispatch(getWishRequestAction());
  axios
    .get(`${mainUrl}/wishList`
    // , {
    //   headers: {
    //     autherization: `Bearer ${token}`, // Set the Authorization header with the token
    //   },
    // }
    )
    .then((res) => dispatch(getWishSuccessAction(res.data)))
    .catch(() => dispatch(getWishFailureAction()));
};

export const removeWish = (id) => (dispatch) => {
  dispatch(getWishRequestAction());
  axios
    .delete(`${mainUrl}/wishList/${id}`)
    .then((res) => dispatch(removeWishAction(id)))
    .catch(() => dispatch(getWishFailureAction()));
};

export const addWish = (newWish) => (dispatch) => {
  dispatch(getWishRequestAction());
  axios
    .post(`${mainUrl}/wishList`, newWish)
    .then((res) => dispatch(addWishAction(res.data)));
};

// ----------------------------------------------------------------------------

// Debouncing action obj -------------------------------------------------

const debouncingAction = (payload) => {
  return {
    type: GET_DEBOUNCING_SUCCESS,
    payload,
  };
};

const resetDebouncingAction = () => {
  return {
    type: SET_DEBOUNCING_RESET,
  };
};

// Debouncing Function  ------------------------------------------------

export const debouncingFunction = (searchQuery) => (dispatch) => {
  dispatch(resetDebouncingAction());
  axios
    .get(`${mainUrl}/products?q=${searchQuery}&_page=1&_limit=10`)
    .then((res) => dispatch(debouncingAction(res.data)))
    .catch((error) => console.log(error));
};

export const resetDebouncing = (dispatch) => {
  dispatch(resetDebouncingAction());
};

// -----------------------------------------------------------------

// Paymentpage Action object

const postNewAddressAction = (payload) => {
  return {
    type: POST_NEW_ADDRESS,
    payload,
  };
};

const postNewCardAction = (payload) => {
  return {
    type: POST_NEW_CARD,
    payload,
  };
};

export const postNewAddress = (payload) => (dispatch) => {
  dispatch(postNewAddressAction(payload));
};

export const postnewCard = (paylaod) => (dispatch) => {
  dispatch(postNewCardAction(paylaod));
};
