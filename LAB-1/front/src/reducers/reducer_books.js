import _ from "lodash";
import {  CHECK_LOGIN} from "../actions/actions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case CHECK_LOGIN:
      console.log(action);
      console.log(state);
      console.log(action.payload.payload.data.error_type);
      var s =  _.mapKeys(action.payload.payload.data,(value,key)=>{
        console.log(value);
        console.log(key);
        return key;
      });
      console.log(s);
      return s;
    default:
      return state;
  }
}
