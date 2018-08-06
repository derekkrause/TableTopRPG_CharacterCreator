import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Settings from "./Settings";
import currentUser from "./currentUser";

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  currentUser
});

export default reducers;
