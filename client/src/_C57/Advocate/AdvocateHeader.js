import React from "react";
import "./AdvocateStyle.css";
import "../profile/ProfileBanner.css";
import SchoolAutoSearch from "./SchoolAutoSearch";
import { updateAdvocate } from "./AdvocateServer";
import { getProfilePic } from "./ProfileImage/ProfileServer";
import ProfilePicture from "./ProfileImage/ProfilePicture";
import { Input, Button } from "reactstrap";
import { AdProfileButton, CancelButton, MessageButton, FollowButton, FollowOnButton } from "../CustomComponents/Button";
import { getContacts } from "../../services/message.service";
import { Link, NavLink, withRouter } from "react-router-dom";
import { NotificationManager, NotificationContainer } from "react-notifications";
import AdvocateProfilePopover from "../CustomComponents/Popover/AdvocateProfilePopver";

class AdvocateHeader extends React.Component {
  state = {
    editPic: false,
    showMessageButton: false,
    profilePic: ""
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

  updateProfilePic = id => {
    getProfilePic(id).then(res => {
      console.log(res);
      let newPic = res.data.resultSets[0][0].AvatarUrl;
      this.setState({
        profilePic: newPic
      });
    });
  };

  render() {
    const { advocateUser, currentProfile, editState } = this.props;
    const { showMessageButton } = this.state;
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
                updateProfilePic={this.updateProfilePic}
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
                {this.props.currentUser.id == currentProfile && !editState ? (
                  <AdvocateProfilePopover handleUpdate={this.props.editField} popover="profileInfoEdit" />
                ) : (
                  <div />
                )}
              </div>

              {editState && (
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
                      <h3>Affiliation:</h3>
                      <SchoolAutoSearch
                        initialValue={this.props.advocateUser.name}
                        selectedSchool={options => this.props.selectedSchool(options)}
                      />
                    </div>
                    <div className="col-12 text-right mt-4">
                      <CancelButton onClick={this.props.onEditCancelClick} />
                      <AdProfileButton onClick={() => this.props.editMode(this.props.advocateUser)} />
                    </div>
                  </div>
                </React.Fragment>
              )}
              {!editState && (
                <React.Fragment>
                  <div>
                    <h1 style={{ fontWeight: 800 }} className="mb-0">
                      {this.props.advocateUser.firstName} &nbsp;
                      {this.props.advocateUser.lastName}
                    </h1>
                  </div>
                  <div className="advoInfo AdvocateStyle" style={{ marginTop: "25px" }}>
                    <h3>{this.props.advocateUser.email}</h3>
                  </div>
                  <div className="advoInfo AdvocateStyle">
                    <h3 className="mt-2">{this.props.advocateUser.name}</h3>
                  </div>
                  <div className="advoInfo AdvocateStyle">
                    <NavLink to={{ pathname: "/app/messaging", state: { id: `${currentProfile}` } }}>
                      <Button className="btn btn-primary msgBtn AdvocateStyle">Request Advocacy | Message</Button>
                    </NavLink>
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
