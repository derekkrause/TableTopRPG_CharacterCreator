import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { getAllFollowsById } from "../../../services/follower.service";
import { followUser, selectFollowingById, unfollowUser } from "../../../services/follow.service";
import { NavLink } from "react-router-dom";
import "../../HomePage/HomePage.css";

class followerModal extends React.Component {
  state = {
    followerInfo: []
  };

  handleOnChange = e => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  componentDidMount() {
    this.getFollowingUsers();
  }

  getFollowingUsers = () => {
    getAllFollowsById(this.props.currentPageId).then(response => {
      const info = response.data.resultSets[0];
      console.log(info);
      this.setState(
        {
          followerInfo: info
        },
        () => this.props.grabFollowerLength(info.length)
      );
    });
  };

  handleFollow = userToFollow => {
    const payload = {
      followerId: this.props.currentUser.id,
      userId: parseInt(userToFollow),
      userNotified: false
    };

    followUser(payload).then(res => {
      this.getFollowingUsers();
    });
  };

  handleUnfollow = userToUnfollow => {
    unfollowUser(this.props.currentUser.id, userToUnfollow).then(res => {
      this.getFollowingUsers();
    });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.followerModal}
          toggle={this.props.toggleFollowerModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleFollowerModal}>Follow List</ModalHeader>
          <ModalBody>
            <div>
              {this.state.followerInfo && (
                <React.Fragment>
                  <table style={{ width: "100%" }}>
                    <tbody style={{ width: "100%" }}>
                      {this.state.followerInfo.map(info => (
                        <tr key={info.UserId} style={{ width: "100%" }} className="justify-content-between">
                          <td>
                            <NavLink to={`/app/profile/${info.UserId}`} className="link-text">
                              <div className="d-flex align-items-center pl-2 my-2">
                                <img src={info.AvatarUrl} className="user-avatar rounded-circle" />
                                <span className="px-2">
                                  {info.FirstName} {info.LastName}
                                </span>
                              </div>
                            </NavLink>
                          </td>
                          <td className="float-right">
                            {info.FollowingThem ? (
                              <button className="btn" type="button" onClick={() => this.handleUnfollow(info.UserId)}>
                                UNFOLLOW
                              </button>
                            ) : (
                              <button className="btn" type="button" onClick={() => this.handleFollow(info.UserId)}>
                                FOLLOW
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </React.Fragment>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.props.toggleFollowerModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(followerModal);
