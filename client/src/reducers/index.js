import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Settings from "./Settings";
import SearchCriteria from "./SearchCriteria";
import currentUser from "./currentUser";

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  searchCriteria: SearchCriteria,
  currentUser
});

export default reducers;
