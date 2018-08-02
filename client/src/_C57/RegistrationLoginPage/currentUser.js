import React from "react";
import { Server } from "tls";
import configureStore, { history } from "./store";

const store = configureStore();

export function getCurrentUser() {
  return Server.user._getCurrentUser.then(
    resp => {
      store.dispatch({
        type: CURRNET_USER,
        value: resp.data
      });
    },
    error => {
      store.dispatch({
        type: CURRNET_USER,
        value: false
      });
      return Promise.reject(error);
    }
  );
}
getCurrentUser();
