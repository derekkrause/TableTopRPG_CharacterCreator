import React from "react";
import "./AdvocateStyle.css";
import AdvocateHeader from "./AdvocateHeader";
import AdvocateBody from "./AdvocateBody";
import AdvocateTab from "./AdvocateTab";
import "../profile/ProfileBanner.css";
import "../profile/Profile.css";
import { getAdvocateByUserId, updateAdvocate } from "./AdvocateServer";
import { connect } from "react-redux";

class AdvocateProfile extends React.Component {
  state = {
    editState: false,
    advocateUser: {},
    school: {},
    following: false
  };

  componentDidMount() {
    getAdvocateByUserId(this.props.match.params.id)
      .then(response => {
        console.log(response, "Get By AdvUser Id");
        this.setState({
          advocateUser: response.data.item
        });
      })
      .catch(error => {
        console.log(error, "Error");
      });
  }

  editMode = payload => {
    const s = this.state.school;
    payload.highSchoolId = s.Id;
    payload.name = s.Name;
    if (this.state.editState) {
      updateAdvocate(payload)
        .then(response => {
          console.log(response, "Updated");
          this.setState({
            editState: false
          });
        })
        .catch(error => {
          console.log(error, "Error");
        });
    } else {
      this.setState({
        editState: true
      });
    }
  };

  editInput = e => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      advocateUser: {
        ...prevState.advocateUser,
        [key]: value
      }
    }));
  };

  editField = () => {
    this.setState({ editState: true });
  };

  onEditCancelClick = () => {
    this.setState({
      editState: false
    });
  };

  selectedSchool = s => {
    this.setState({
      school: s
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

  followUser = () => {
    const payload = {
      followerId: this.props.currentUser.id,
      userId: parseInt(this.props.match.params.id),
      userNotified: false
    };
    if (!this.state.following) {
      followUser(payload).then(res => {
        this.setState({ following: true });
      });
    } else {
      unfollowUser(this.props.currentUser.id, this.props.match.params.id).then(res => {
        this.setState({ following: false });
      });
    }
  };

  render() {
    const id = this.props.match.params.id;
    const aU = this.state.advocateUser;
    const eS = this.state.editState;
    const eM = this.editMode;
    const eI = this.editInput;

    return (
      <div className="app-wrapper">
        <div className="row justify-content-center">
          <div className="col-11 col-md-10 col-lg-9 col-xl-7 p-0">
            <div className="card">
              <img
                src="http://res.cloudinary.com/dv4p9sgci/image/upload/c_scale,h_240,w_950/v1533612434/new.jpg"
                className="profile-banner-img img-fluid"
              />
              <div className="px-2 py-3 col-12 rs-athlete-tag">
                <AdvocateHeader
                  advocateUser={aU}
                  editMode={eM}
                  editState={eS}
                  editInput={eI}
                  selectedSchool={options => this.selectedSchool(options)}
                  editField={this.editField}
                  onEditCancelClick={this.onEditCancelClick}
                  currentUser={this.props.currentUser}
                  currentProfile={id}
                  profilePic={aU.avatarUrl}
                  following={this.state.following}
                  followUser={this.followUser}
                />
              </div>
            </div>
            <div>
              <div className="jr-card rs-athlete-tag pt-3" id="bio">
                <AdvocateBody
                  advocateUser={aU}
                  editMode={eM}
                  editInput={eI}
                  advocateUserId={id}
                  currentUser={this.props.currentUser}
                  currentProfile={id}
                />
              </div>
            </div>
            <div className="card">
              <AdvocateTab advocateUserId={id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(AdvocateProfile);
