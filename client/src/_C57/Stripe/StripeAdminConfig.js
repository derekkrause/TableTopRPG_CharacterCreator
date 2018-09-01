import React from "react";
import { addSubExpirationToAllUsers } from "./stripe.server";
import { getConfigById, updateConfig } from "../../services/config.service";
import { SubmitButton } from "../CustomComponents/Button/index";

class StripeAdminConfig extends React.Component {
  state = {
    numberOfDays: "0"
  };

  componentDidMount() {
    getConfigById(54).then(res => {
      this.setState({ numberOfDays: res.data.item.Value });
    });
  }
  changeFreeTrialConfig = () => {
    const payload = {
      id: 54,
      key: "Free Trial Period",
      value: this.state.numberOfDays
    };
    updateConfig(payload).then(res => {
      console.log(res, "Trial time updated");
    });
  };

  handleOnClick = () => {
    this.changeFreeTrialConfig();
    this.setFreeTrail();
  };
  setFreeTrail = () => {
    const freeTrialPeriod = parseInt(this.state.numberOfDays);
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const setTrialPeriod = freeTrialPeriod * oneDayInMilliseconds;
    const date = new Date();
    const midnight = date.setHours(24, 0, 0, 0);
    //  console.log(midnight, "midnight");
    const trialEnds = midnight + setTrialPeriod;
    // console.log(trialEnds);
    const newDate = new Date(trialEnds)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const payload = {
      subExpiration: newDate
    };

    addSubExpirationToAllUsers(payload);
  };

  render() {
    return (
      <div className="row card jr-card">
        <div>
          <p>
            Give users a{" "}
            <input
              type="number"
              style={{ width: "5%" }}
              value={this.state.numberOfDays}
              onChange={e => this.setState({ numberOfDays: e.target.value })}
            />{" "}
            day free trial from today
          </p>
          <p>
            Pressing the submit button will give all users a subscription end date of {this.state.numberOfDays} day(s)
            from now
          </p>
          <p>A value of 'true' must be entered into the configuration table to activate stripe</p>
          <div className="float-right">
            <SubmitButton onClick={this.handleOnClick} name={"Submit"} />
          </div>
        </div>
      </div>
    );
  }
}

export default StripeAdminConfig;
