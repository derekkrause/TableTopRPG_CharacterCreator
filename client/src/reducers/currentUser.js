import { CURRENT_USER } from "../constants/ActionTypes";

export default function userReducer(state = null, action) {
  // console.log("ACTIONjashdk", state, action);

  if (action.type === CURRENT_USER) {
    return action.value;
  }

  // console.log("reducer state", state);
  return state;
}
