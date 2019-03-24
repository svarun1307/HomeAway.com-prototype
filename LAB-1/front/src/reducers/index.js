import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import BooksReducer from "./reducer_books";

const rootReducer = combineReducers({
  check_login: BooksReducer,
  form: formReducer
});

export default rootReducer;
