import React, { Component } from "react";
import asyncComponent from "util/asyncComponent";
import { Route } from "react-router-dom";
import { getUserById } from "../../services/registerLogin.service";

const ProfileAsyncComponent = asyncComponent(() => import("./ProfileContainer"));
const AdvocateAsyncComponent = asyncComponent(() => import("../Advocate/AdvocateProfile"));
const CoachAsyncComponent = asyncComponent(() => import("../Coach/CoachProfile"));
const FeedPageAsyncComponent = asyncComponent(() => import("../Feed/Feed"));

class ProfileSwitch extends Component {
  state = {
    profileType: null
  };

  componentDidMount = () => {
    this.checkProfileUserType();
  };

  checkProfileUserType = () => {
    const promise = getUserById(this.props.match.params.id);
    promise
      .then(results => {
        if (results.data.item.isAthlete) {
          this.setState({ profileType: "athlete" });
        } else if (results.data.item.isCoach) {
          this.setState({ profileType: "coach" });
        } else if (results.data.item.isAdvocate) {
          this.setState({ profileType: "advocate" });
        } else this.setState({ profileType: false });
      })
      .catch(error => console.log("checkProfileUserType error", error));
  };

  render() {
    switch (this.state.profileType) {
      case null:
        return null;
      case "athlete":
        return <ProfileAsyncComponent key={this.props.match.params.id} {...this.props} />;
      case "coach":
        return <CoachAsyncComponent {...this.props} />;
      case "advocate":
        return <AdvocateAsyncComponent {...this.props} />;
      default:
        return <Route path={`${this.props.history.push("/app/home")}`} component={FeedPageAsyncComponent} />;
    }
  }
}

export default ProfileSwitch;
