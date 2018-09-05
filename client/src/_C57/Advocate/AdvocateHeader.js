import React from "react";
import "./AdvocateStyle.css";
import "../profile/ProfileBanner.css";
import SchoolAutoSearch from "./SchoolAutoSearch";
import { updateAdvocate } from "./AdvocateServer";
import ProfilePicture from "./ProfileImage/ProfilePicture";
import { Input } from "reactstrap";
import {
  SaveProfileButton,
  CancelButton,
  MessageButton,
  FollowButton,
  FollowOnButton
} from "../CustomComponents/Button";
import { getContacts } from "../../services/message.service";
import { Link, NavLink, withRouter } from "react-router-dom";
import { NotificationManager, NotificationContainer } from "react-notifications";
import AdvocateProfilePopover from "../CustomComponents/Popover/AdvocateProfilePopver";

class AdvocateHeader extends React.Component {
  state = {
    editPic: false,
    editState: false,
    showMessageButton: false,
    schoolName: this.props.advocateUser.name,
    schoolNameEdit: ""
  };

  componentDidMount = () => {
    this.handleGetContacts();
  };
  handleGetContacts = () => {
    const id = this.props.currentUser.id;
    getContacts(id)
      .then(response => {
        const user = response.data.items.contacts;
        if (user) {
          for (let i = 0; i < user.length; i++) {
            if (user[i]["UserId"] == this.props.currentProfile) {
              this.setState({ showMessageButton: true });
            }
          }
        }
      })
      .catch(() => {
        console.log("There was an error getting your contacts");
      });
  };

  editField = () => {
    this.props.editMode(this.props.advocateUser);
    this.setState({ editState: !this.state.editMode });
  };
  onEditCancelClick = () => {
    this.setState({
      editState: !this.state.editState
    });
  };

  render() {
    const { advocateUser, currentProfile } = this.props;
    const { showMessageButton, editState } = this.state;
    return (
      <div>
        <NotificationContainer />
        <div className="container profileInfoContainer parent">
          <div className="row profileInfo">
            <div className="col-md-3 px-0">
              <ProfilePicture
                profilePic={this.props.profilePic}
                currentUser={this.props.currentUser}
                currentProfile={this.props.currentProfile}
                updateProfilePic={this.props.updateProfilePic}
              />
              <div className="col-12 mt-3">
                {!editState && <h3 className="font-weight-semibold text-center mt-3">{advocateUser.title}</h3>}
                {editState && (
                  <React.Fragment>
                    <h3>Title:</h3>
                    <Input
                      type="text"
                      name="title"
                      value={this.props.advocateUser.title || ""}
                      onChange={this.props.editInput}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="col-md-9 profileInfo-info pl-2 mt-4 pt-3">
              <div className="col-1 text-right p-0 float-right" id="profileInfoEdit">
                {this.props.currentUser.id == currentProfile && editState === false ? (
                  <AdvocateProfilePopover handleUpdate={this.editField} popover="profileInfoEdit" />
                ) : (
                  <div />
                )}
              </div>

              {editState ? (
                <React.Fragment>
                  <div className="row col-md-12 pr-0 mr-0">
                    <div className="col-md-6">
                      <h3>First Name:</h3>
                      <input
                        type="text"
                        className="nameInputs form-control"
                        name="firstName"
                        value={this.props.advocateUser.firstName || ""}
                        onChange={this.props.editInput}
                      />
                    </div>
                    <div className="col-md-6">
                      <h3>Last Name:</h3>
                      <input
                        type="text"
                        className="nameInputs form-control"
                        name="lastName"
                        value={this.props.advocateUser.lastName || ""}
                        onChange={this.props.editInput}
                      />
                    </div>
                    <div className="col-md-12 mt-4">
                      {/* <strong>Email</strong>
                  <Input
                    type="text"
                    name="email"
                    value={this.props.advocateUser.email || ""}
                    onChange={this.props.editInput}
                    size="20"
                  />
                  <br /> */}
                      <h3>Affiliation:</h3>
                      <SchoolAutoSearch
                        initialValue={this.props.advocateUser.name}
                        selectedSchool={options => this.props.selectedSchool(options)}
                      />
                    </div>
                    <div className="col-12 text-right mt-4">
                      <CancelButton onClick={this.onEditCancelClick} />
                      <SaveProfileButton />
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div>
                    <h1 style={{ fontWeight: 800 }} className="mb-0">
                      {this.props.advocateUser.firstName} &nbsp;
                      {this.props.advocateUser.lastName}
                    </h1>
                  </div>
                  <div className="advoInfo AdvocateStyle">
                    {/* &nbsp;
                  {this.props.advocateUser.email}
                  <br />  */}
                    <h3 className="mt-2">{this.props.advocateUser.name}</h3>
                  </div>
                </React.Fragment>
              )}

              <div className="row justify-content-center justify-content-md-between pl-1 pl-md-0">
                <div role="group" className="btn-group mt-3 mt-sm-3 mt-md-3 mt-lg-0">
                  {this.props.currentUser.id != this.props.currentProfile ? (
                    <React.Fragment>
                      {!this.props.following ? (
                        <FollowButton
                          margin="mb-0"
                          style="rs-btn-border-primary"
                          onClick={() => {
                            this.props.followUser();
                            this.handleGetContacts();
                          }}
                        />
                      ) : (
                        <FollowOnButton
                          margin="mb-0"
                          style="rs-btn-border-primary-on"
                          onClick={() => {
                            this.props.followUser();
                            this.setState({ showMessageButton: false });
                          }}
                        />
                      )}
                    </React.Fragment>
                  ) : (
                    <div />
                  )}
                </div>

                <div className="d-flex justify-content-end mt-3 mt-sm-3 mt-md-3 mt-lg-0 ">
                  {showMessageButton && (
                    <NavLink to={{ pathname: "/app/messaging", state: { id: `${currentProfile}` } }}>
                      <MessageButton margin="mb-0 mr-0" style="rs-btn-primary-light" />
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdvocateHeader;
