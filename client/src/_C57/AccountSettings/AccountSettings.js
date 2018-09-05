import React from "react";
import {
  Button,
  Option,
  ListGroup,
  ListGroupItem,
  Table,
  Checkbox,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Collapse
} from "reactstrap";
import { EditButton, SaveButton, CloseButtonDark } from "../CustomComponents/Button";
import { connect } from "react-redux";
import "react-toggle-switch/dist/css/switch.min.css";
import Switch from "react-toggle-switch";
import { NotificationManager } from "react-notifications";
import { getCurrentUser } from "../../services/registerLogin.service";
import {
  changePassword,
  updateCurrentSportId,
  updateNotificationSetting,
  getCurrentNotificationById
} from "../../services/accountSettings.service";

class AccountSettings extends React.Component {
  state = {
    id: "",
    userId: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    currentSportId: "",
    currentSportName: "",
    newPasswordValid: false,
    confirmPasswordValid: false,
    emailCollapse: false,
    passwordCollapse: false,
    currentSportCollapse: false,
    notificationCollapse: false,
    messageSwitched: false,
    likedSwitched: false,
    followSwitched: false
  };

  toggleEmail = () => {
    this.setState({ emailCollapse: !this.state.emailCollapse });
  };

  togglePassword = () => {
    this.setState({ passwordCollapse: !this.state.passwordCollapse });
  };

  toggleCurrentSport = () => {
    this.setState({ currentSportCollapse: !this.state.currentSportCollapse });
  };

  toggleNotification = () => {
    this.setState({ notificationCollapse: !this.state.notificationCollapse });
  };

  // ----- REACT-TOGGLE-SWITCH -----
  toggleMessageSwitch = () => {
    this.setState(prevState => {
      return {
        messageSwitched: !prevState.messageSwitched
      };
    });
  };

  toggleLikedSwitch = () => {
    this.setState(prevState => {
      return {
        likedSwitched: !prevState.likedSwitched
      };
    });
  };

  toggleFollowerSwitch = () => {
    this.setState(prevState => {
      return {
        followSwitched: !prevState.followSwitched
      };
    });
  };

  // ----- REACT NOTIFICATIONS -----
  createNotification = type => {
    console.log("Notification Type: " + type);

    switch (type) {
      case "update_Password":
        NotificationManager.success("has been updated", "Password ", 5000);
        break;
      case "update_CurrentSport":
        NotificationManager.success("has been updated", "Current Sport ", 5000);
        break;
      case "update_Notification":
        NotificationManager.success("have been updated", "Notifications ", 5000);
        break;
      case "password_warning":
        NotificationManager.warning("doesn't match", "Current Password");
        break;
      case "error":
        NotificationManager.error("ERROR!", "Error Title");
        break;
    }
  };
  // ---------------------------------

  componentDidMount() {
    getCurrentUser()
      .then(response => {
        const user = response.data.item;
        this.setState({
          id: user.id,
          email: user.email,
          currentSportId: user.currentSportId,
          currentSportName: this.getCurrentSportName(user.currentSportId)
        });
        console.log("User ID:", response.data.item.id, "email:", response.data.item.email);

        return getCurrentNotificationById(user.id);
      })
      .then(response => {
        const user = response.data.item;
        this.setState({
          messageSwitched: user.MessageReceived,
          likedSwitched: user.PostLiked,
          followSwitched: user.Follow
        });
      })
      .catch(err => {
        console.log("Get Current User Ajax Error", err);
      });
  }

  onPasswordChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  validatePassword = () => {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.=\$%\^&\*])(?=.{8,})/;
    if (this.state.newPassword.match(validPassword)) {
      // console.log("good password");
      this.setState({ newPasswordValid: true });
    } else {
      // console.log("no good");
      this.setState({ newPasswordValid: false });
    }
    if (this.state.confirmPassword === this.state.newPassword) {
      this.setState({ confirmPasswordValid: true });
    } else {
      this.setState({ confirmPasswordValid: false });
    }
    if (this.state.newPasswordValid && this.state.confirmPasswordValid) {
      this.setState({ changePasswordBtn: true });
    }
  };

  // ----- CHANGE PASSWORD AJAX CALL -----
  handlePasswordSubmbit = () => {
    const data = {
      id: this.state.id,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };
    changePassword(data)
      .then(response => {
        if (data.oldPassword === this.state.oldPassword) {
          // console.log("oldPassword: ", this.state.oldPassword);
          this.setState({ newPassword: this.state.newPassword });
          this.createNotification("update_Password");
          this.setState({ passwordCollapse: false });
        }
      })
      .catch(err => {
        // console.log("wrong password!", err);
        this.createNotification("password_warning");
      });
  };

  // ----- CURRENT SPORT ID AJAX CALL -----
  handleCurrentSportSubmit = () => {
    const data = {
      id: this.state.id,
      currentSportId: this.state.currentSportId
    };
    updateCurrentSportId(data).then(response => {
      this.setState({ currentSportId: this.state.currenSportId });
      this.createNotification("update_CurrentSport");
    });
  };

  getCurrentSportName = currentSportId => {
    const sportArray = this.props.dropdownOptions.sport;

    for (let i = 0; i < sportArray.length; i++) {
      if (sportArray[i].id == currentSportId) {
        return sportArray[i].name;
      }
    }
  };

  handleCurrentSportChange = e => {
    if (e.target.name === "currentSportId") {
      const currentSportName = this.getCurrentSportName(e.target.value);
      this.setState({ [e.target.name]: e.target.value, currentSportName: currentSportName });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  // ----- NOTIFICATIONS AJAX CALL -----
  handleNotificationSubmbit = () => {
    const data = {
      UserId: this.state.id,
      MessageReceived: this.state.messageSwitched,
      PostLiked: this.state.likedSwitched,
      Follow: this.state.followSwitched
    };
    updateNotificationSetting(data)
      .then(response => {
        this.setState({
          userId: this.state.id,
          MessageReceived: this.state.messageSwitched,
          PostLiked: this.state.likedSwitched,
          Follow: this.state.followSwitched
        });
        this.createNotification("update_Notification");
      })
      .catch(err => {
        console.log("Update Notification Setting Ajax error ", err);
      });
  };

  render() {
    const {
      id,
      usesrId,
      email,
      oldPassword,
      newPassword,
      confirmPassword,
      currentSportId,
      currentSportName,
      newPasswordValid,
      confirmPasswordValid,
      emailCollapse,
      passwordCollapse,
      currentSportCollapse,
      notificationCollapse,
      messageSwitched,
      likedSwitched,
      followSwitched
    } = this.state;

    if (!this.props.dropdownOptions.sport) {
      return null;
    }

    return (
      <div className="app-wrapper">
        <div className="col-lg-7 col-md-12 col-12 mx-auto">
          <div className="jr-card">
            <h3 style={{ textAlign: "center" }}>Account Settings</h3>
            <ListGroup action>
              {/* --------------- EMAIL ADDRESS --------------- */}
              <ListGroupItem>
                Email address
                <span style={{ position: "absolute", right: "20px" }}>
                  <button
                    type="button"
                    style={{ border: "none", backgroundColor: "white", color: "gray" }}
                    onClick={this.toggleEmail}
                  >
                    {!emailCollapse ? "Change" : "Close"}
                  </button>
                </span>
                <Collapse isOpen={emailCollapse}>
                  <Form className="mt-4 ml-2 mr-2">
                    <div className="mb-2">
                      Your current email address is <span style={{ color: "blue" }}>{this.state.email}</span>
                    </div>
                    <FormGroup>
                      <Label>Type your new email address</Label>
                      <Input name="newEmail" type="email" />
                      <FormFeedback>This email is already used.</FormFeedback>
                    </FormGroup>
                    <div className="mb-4 float-right">
                      <SaveButton />
                      <CloseButtonDark onClick={this.toggleEmail} />
                    </div>
                  </Form>
                </Collapse>
              </ListGroupItem>
              {/* --------------- CHANGE PASSWORD --------------- */}
              <ListGroupItem>
                Password
                <span style={{ position: "absolute", right: "20px" }}>
                  <button
                    type="button"
                    style={{ border: "none", backgroundColor: "white", color: "gray" }}
                    onClick={this.togglePassword}
                  >
                    {!passwordCollapse ? "Change" : "Close"}
                  </button>
                </span>
                <Collapse isOpen={passwordCollapse}>
                  <Form className="mt-4 ml-2 mr-2">
                    <FormGroup>
                      <Label>Type your current password</Label>
                      <Input
                        name="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={this.onPasswordChange}
                        required
                      />
                      <FormFeedback />
                    </FormGroup>
                    <FormGroup>
                      <Label>Type your new password</Label>
                      <Input
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={this.onPasswordChange}
                        onKeyUp={this.validatePassword}
                        valid={newPasswordValid && newPassword.length > 0 && newPassword.length >= 8}
                        invalid={!newPasswordValid && (newPassword.length > 0 && newPassword.length < 8)}
                        required
                      />
                      <FormFeedback>
                        Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character.
                      </FormFeedback>
                      <FormFeedback valid>Good password</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label>Retype your new password</Label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={this.onPasswordChange}
                        onKeyUp={this.validatePassword}
                        valid={confirmPasswordValid && confirmPassword.length > 0}
                        invalid={!confirmPasswordValid && (confirmPassword.length > 0 && confirmPassword.length < 8)}
                        required
                      />
                      <FormFeedback>Please retype the same password</FormFeedback>
                      <FormFeedback valid>Password matched</FormFeedback>
                    </FormGroup>
                    <div className="mb-4 float-right">
                      <SaveButton type="button" onClick={this.handlePasswordSubmbit.bind(this)} />
                      <CloseButtonDark onClick={this.togglePassword} />
                    </div>
                  </Form>
                </Collapse>
              </ListGroupItem>
              {/* --------------- CURRENT SPORT --------------- */}
              <ListGroupItem>
                Current Sport
                <span style={{ position: "absolute", right: "20px" }}>
                  <button
                    type="button"
                    style={{ border: "none", backgroundColor: "white", color: "gray" }}
                    onClick={this.toggleCurrentSport}
                  >
                    {!this.state.currentSportCollapse ? "Change" : "Close"}
                  </button>
                </span>
                <Collapse isOpen={currentSportCollapse}>
                  <Form className="col-sm mt-4">
                    <div className="mb-2">
                      Your current sport is <span style={{ color: "blue" }}>{currentSportName}</span>
                    </div>
                    <FormGroup>
                      <Label for="currentSport" />
                      <Input
                        type="select"
                        name="currentSportId"
                        value={currentSportId}
                        onChange={this.handleCurrentSportChange}
                      >
                        {this.props.dropdownOptions.sport.map(sport => {
                          return (
                            <option key={sport.id} value={sport.id}>
                              {sport.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <div className="mb-4 float-right">
                      <SaveButton onClick={this.handleCurrentSportSubmit.bind(this)} />
                      <CloseButtonDark onClick={this.toggleCurrentSport} />
                    </div>
                  </Form>
                </Collapse>
              </ListGroupItem>
              {/* --------------- SUBSCRIPTION --------------- */}
              <ListGroupItem tag="button" action>
                Subscription
              </ListGroupItem>
              {/* --------------- NOTIFICATIONS --------------- */}
              <ListGroupItem>
                Notifications
                <span style={{ position: "absolute", right: "20px" }}>
                  <button
                    type="button"
                    style={{ border: "none", backgroundColor: "white", color: "gray" }}
                    onClick={this.toggleNotification}
                  >
                    {!notificationCollapse ? "Change" : "Close"}
                  </button>
                </span>
                <Collapse isOpen={notificationCollapse}>
                  <Form className="mt-4 ml-4">
                    <FormGroup>
                      <div className="col-11 mx-auto m-3">
                        New message
                        <span className="mt-1" style={{ position: "absolute", right: "80px" }}>
                          {messageSwitched ? "on" : "off"}
                        </span>
                        <span style={{ position: "absolute", right: "20px" }}>
                          <Switch
                            checked={this.messageSwitched}
                            onClick={this.toggleMessageSwitch}
                            on={messageSwitched}
                            onChange={this.handleNotificationChange}
                          />
                        </span>
                      </div>
                      <div className="col-11 mx-auto m-3">
                        New liked
                        <span className="mt-1" style={{ position: "absolute", right: "80px" }}>
                          {likedSwitched ? "on" : "off"}
                        </span>
                        <span style={{ position: "absolute", right: "20px" }}>
                          <Switch checked={this.likedSwitched} onClick={this.toggleLikedSwitch} on={likedSwitched} />
                        </span>
                      </div>
                      <div className="col-11 mx-auto">
                        New follow
                        <span className="mt-1" style={{ position: "absolute", right: "80px" }}>
                          {followSwitched ? "on" : "off"}
                        </span>
                        <span style={{ position: "absolute", right: "20px" }}>
                          <Switch
                            checked={this.followSwitched}
                            onClick={this.toggleFollowerSwitch}
                            on={followSwitched}
                          />
                        </span>
                      </div>
                    </FormGroup>
                    <div className="mr-2 mt-2 float-right">
                      <SaveButton onClick={this.handleNotificationSubmbit.bind(this)} />
                      <CloseButtonDark onClick={this.toggleNotification} />
                    </div>
                  </Form>
                </Collapse>
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ dropdownOptions }) {
  return {
    dropdownOptions: dropdownOptions
  };
}
export default connect(mapStateToProps)(AccountSettings);
