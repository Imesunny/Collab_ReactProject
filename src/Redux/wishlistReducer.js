import { ADD_TO_WISHLIST, GET_WISHLIST_FAILURE, GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST } from "./actionTypes";

const initState = {
    WishProducts: [],
    isLoading: false,
    isError: false,
  };

const wishReducer = ( state = initState, action)=>{
   const { type, payload } = action

   switch(type){
    case GET_WISHLIST_REQUEST :
        return {
            ...state,
            isLoading : true,
            isError : false,
        }
    case GET_WISHLIST_SUCCESS :
        return {
            ...state,
            isLoading : false,
            isError : false,
            WishProducts : payload
        }    
    case GET_WISHLIST_FAILURE :
        return {
            ...state,
            isLoading : false,
            isError : true
        }
    case ADD_TO_WISHLIST : 
        return {
            ...state,
            WishProducts : [...state.WishProducts, payload]
        }
    case REMOVE_FROM_WISHLIST :
        return {
            ...state,
            WishProducts : state.WishProducts.filter((product) => product._id !== payload)
        }
    default:
        return state;
   }
} 

export { wishReducer }