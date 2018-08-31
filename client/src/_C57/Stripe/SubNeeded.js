import React from "react";
import { getCustomer } from "./stripe.server";
import { Redirect, Route } from "react-router-dom";

const SubNeeded = props => {
  console.log(props, "props");
  if (props.currentStripeId != null) {
    getCustomer(props.currentStripeId).then(res => {
      // console.log(res.data.subscriptions.data[0].current_period_end, "res");
      const date = new Date();
      const time = date.getTime();
      const userDate = new Date(props.expirationDate);
      const userTime = userDate.getTime();
      const subscriptionDiff = userTime - time;
      console.log(subscriptionDiff);
      {
        subscriptionDiff < 0 ? props.noCurrentSubscription(true) : props.noCurrentSubscription(false);
      }
    });
  }
  return null;
};

export default SubNeeded;
