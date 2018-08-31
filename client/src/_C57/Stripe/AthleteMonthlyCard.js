import React from "react";
import StripeCheckout from "react-stripe-checkout";
import "./stripe.css";
import { createNewCustomer, createNewSubscription, addStripeIdToUser, addSubExpirationToUser } from "./stripe.server";
const monthlyPlan = "plan_DVfh9192D2HlZD";
import { currentUser } from "../../services/currentUser.service";
const stripeKey = "pk_test_daPCB26oRZslYkX2F1o28T5p";

const AthleteMonthlyCard = ({ styleName, headerStyle, email, fullName, currentUserId, showLoader }) => {
  const onToken = token => {
    showLoader(true);
    // console.log(token, "token");
    const newCustomerInfo = { name: fullName, email: email, source: token.id };
    createNewCustomer(newCustomerInfo).then(NewCustomerResponse => {
      //  console.log(NewCustomerResponse, "stripe Response");

      createNewSubscription(NewCustomerResponse.data.id, monthlyPlan).then(response => {
        // console.log(response, NewCustomerResponse, "subResponse");
        console.log(response, "response");
        const date = new Date();
        const time = date.getTime();
        const subEnds = time + response.data.current_period_end;
        const subEndsDate = new Date(subEnds);
        const newDateMidnight = subEndsDate.setHours(24, 0, 0, 0);
        const newDate = new Date(newDateMidnight)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        console.log(newDate, "subResponse");
        const payload = {
          subExpiration: newDate
        };
        addSubExpirationToUser(currentUserId, payload)
          .then(res => {
            // console.log(res, "expiration added");
          })
          .then(() => {
            const obj = { cusId: NewCustomerResponse.data.id, subId: response.data.id };
            //  console.log(obj, "object");
            addStripeIdToUser(currentUserId, obj).then(() => {
              setTimeout(
                currentUser().then(() => {
                  showLoader(false);
                }),
                5000
              );
            });
          });
      });
    });
  };
  return (
    <div className={`${styleName}`}>
      <div className={`${headerStyle}`}>
        <div className="justify-content-start">
          <h4 className="letter-spacing-base text-uppercase mb-0 pl-2" style={{ fontWeight: "bold", fontSize: "26px" }}>
            $5
          </h4>
          <h4 className="pt-1 letter-spacing-base text-uppercase mb-0 pl-2">Monthly</h4>
          <div className="mt-4">
            <StripeCheckout
              token={onToken}
              stripeKey={stripeKey}
              name="Recruit Hub Sports" // the pop-in header title
              description="Monthly Subscription" // the pop-in header subtitle
              ComponentClass="div"
              panelLabel="Pay Monthly" // prepended to the amount in the bottom pay button
              amount={500} // cents
              currency="USD"
              locale="en"
              email={`${email}`}
            >
              <button className="btn" style={{ color: "#194d33", backgroundColor: "#c8e6c9" }}>
                Check out{" "}
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteMonthlyCard;
