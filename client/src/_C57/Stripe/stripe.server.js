import axios from "axios";
import { currentUser } from "../../services/currentUser.service";

export const createNewCustomer = payload => {
  return axios.post("/node-api/server.js/stripe/newCustomer", payload);
};

export const createNewSubscription = (id, plan) => {
  return axios.post("/node-api/server.js/stripe/newSub/" + id + "/" + plan);
};

export const addStripeIdToUser = (id, payload) => {
  return axios.put("/node-api/server.js/user/" + id, payload);
};

export const addSubExpirationToUser = (id, payload) => {
  return axios.put("/node-api/server.js/user/expiration/" + id, payload);
};

export const cancelSubscription = id => {
  return axios.post("/node-api/server.js/stripe/cancelSub/" + id);
};

export const getCustomer = id => {
  return axios.get("/node-api/server.js/stripe/" + id);
};

export const getStripeStatus = () => {
  return axios.get("/node-api/server.js/api/stripe/status");
};

export const stripeStatus = props => {
  let timer = setTimeout(() => {
    if (timer) {
      clearTimeout(timer);
    }
    if (props.currentUser != null) {
      timer = null;
      if (props.currentUser.subNeeded === true) {
        if (props.currentUser.stripeUserId === null) {
          props.history.push("/app/stripe");
        }
        getStripeStatus().then(res => {
          console.log(res.data, "data");
          if (res.data === false) {
            props.history.push("/app/stripe");
          } else {
            currentUser();
          }
        });
      } else {
        console.log("Up to date");
      }
    }
  }, 2000);
};

export const addSubExpirationToAllUsers = payload => {
  return axios.put("/node-api/server.js/user/stripe/insert/expiration", payload);
};
