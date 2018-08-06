// import { Server } from "tls";
import { store } from "../store";
import { getCurrentUser } from "../services/registerLogin.service";
import { CURRENT_USER } from "constants/ActionTypes";

export function currentUser() {
  return getCurrentUser().then(
    resp => {
      store.dispatch({
        type: CURRENT_USER,
        value: resp.data.item
      });
    },
    error => {
      store.dispatch({
        type: CURRENT_USER,
        value: false
      });
      return Promise.reject(error);
    }
  );
}
currentUser();
