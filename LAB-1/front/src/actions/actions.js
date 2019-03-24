import axios from "axios";
import { BASE_URL } from "../components/common/AppSettings/AppSettings";
//export const FETCH_BOOKS = "fetch_books";
//export const CREATE_BOOK = "create_book";
export const CHECK_LOGIN = "check_login";
//export const GET_USERNAME = "get_username";

const ROOT_URL = "http://localhost:3001";

/* //target action
export function fetchBooks() {
  //middleware call
  //receive response from backend
  const response = axios.get(`${ROOT_URL}/books`);
  //Action dispatched
  console.log("Response",response);
  return {
    type: FETCH_BOOKS,
    payload: response
  };
}

export function createBook(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/book`, values)
    .then(() => callback());

  return {
    type: FETCH_BOOKS,
    payload: request
  };
}
 */
export function checkLogin(values, callback) {
    let u = this;
    console.log(values);
    axios.defaults.withCredentials = true;
    const loginReturn = axios.post(BASE_URL+ '/login-validate',values)
    .then(response => {
        //console.log("Status Code : ",response.status);
        //console.log(response);
        //dispatch(push('/seller-login'));
        if(response.status === 200){
            return {
                type : CHECK_LOGIN,
                payload : response
            }
            
        }
        else 
        {
           
        }
    });
    //console.log(loginReturn);
    return {
        type : CHECK_LOGIN,
        payload : loginReturn
    }
    
  }
  

