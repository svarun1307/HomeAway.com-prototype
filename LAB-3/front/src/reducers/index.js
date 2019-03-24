/* import { combineReducers } from "redux";
import LoginReducer from "./login_reducer";

const rootReducer = combineReducers({
  loginDetails: LoginReducer
});

export default rootReducer;
 */

/***************NEW REDUCER UPDATE******************/

const initialStore = {
    /***********LOGIN DETAILS************/
    loginDetails : {
      email : '',
      trcker : '',
      firstname : '',
      lastname : '',
      'login-type' : '',
    },
    propertyList : {  
      passedData : {} , 
      dateData : {}  
    },
    filterData : {
      filterText: '',
      fromTo2FL: '',
      fromToFL: '',
      min: 0,
      max: 1000,
      currentmin: 0,
      currentmax: 1000,
      roomcounter: 0
    },
    bookings : [],
    dashBoardFilters : {
      filterText : '',
      fromTo2FLDF : '',
      fromToFLDF : '',
    }
}


const reducer =  (state = initialStore, action) => {
      console.log(action);
      switch (action.type) {

        case 'USER_LOGGED_IN':
          return {
            ...state,
            loginDetails : {
                ...action.payload
            }
          }
          
        case 'GET_LOGGED_IN_DETAILS':
          return state;
        case 'PROPERTY_LIST':
          return {
            ...state,
            propertyList : action.payload
          }
        case 'GET_PROPERTY_LIST':
          //alert("prop reducer");
          return state;
        case 'FILTER_DATA':
          //alert("prop reducer");
          return {
            ...state,
            filterData : action.payload
          }

        case 'SET_MY_BOOKINGS':
          return {
            ...state,
            bookings : action.payload
          }
        
        case 'SET_DASHBOARD_FILTERS':
          return {
            ...state,
            dashBoardFilters : action.payload
          }
        case 'persist/PERSIST':
          return state;

        default:
          return state;
      }
};


export default reducer;


/***************************************************/