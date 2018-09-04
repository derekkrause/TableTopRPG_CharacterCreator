import React from "react";
import { followUser, selectFollowingById, unfollowUser } from "../../services/follow.service";
import { highlightUser, unhighlightUser, selectHighlightById } from "../../services/highlight.service";
import { Button, ButtonGroup } from "reactstrap";

class FollowHighlightButtons extends React.Component {
  state = {
    following: false,
    highlighting: false
  };

  componentDidMount() {
    //THIS ONE DOESN'T WORK...
    selectFollowingById(this.props.userId).then(res => {
      //   console.log(res);
      if (res.data.resultSets) {
        for (let i = 0; i < res.data.resultSets[0].length; i++) {
          if (res.data.resultSets[0][i].UserId == this.props.profileId) {
            this.setState({ following: true });
          }
        }
      }
    });

    selectHighlightById(this.props.profileId).then(res => {
      //   console.log(res);
      if (res.data.resultSets) {
        for (let i = 0; i < res.data.resultSets[0].length; i++) {
          if (res.data.resultSets[0][i].HighlightId == this.props.userId) {
            this.setState({ highlighting: true });
          }
        }
      }
    });
  }

  followUser = () => {
    const payload = {
      followerId: this.props.userId,
      userId: parseInt(this.props.profileId),
      userNotified: false
    };
    if (!this.state.following) {
      followUser(payload).then(res => {
        this.setState({ following: true });
      });
    } else {
      unfollowUser(this.props.userId, this.props.profileId).then(res => {
        this.setState({ following: false });
      });
    }
  };

  highlightUser = () => {
    const payload = {
      highlightId: this.props.userId,
      userId: parseInt(this.props.profileId)
    };
    if (!this.state.highlighting) {
      highlightUser(payload).then(res => {
        this.setState({ highlighting: true });
      });
    } else {
      unhighlightUser(this.props.userId, this.props.profileId).then(res => {
        this.setState({ highlighting: false });
      });
    }
  };

  render() {
    const { following, highlighting } = this.state;
    const { profileId } = this.props;

    return (
      <React.Fragment>
        <div className="row mt-4 justify-content-md-start justify-content-center">
          {/* ---BUTTONS FOR MD SCREENS & LARGER--- */}
          <div className="btn-group mb-md-0 d-none d-md-block ml-3">
            <div
              className="jr-btn jr-btn-default btn btn-default"
              onClick={this.followUser}
              style={{ color: following && "#81c784" }}
            >
              <i className="zmdi zmdi-check-circle zmdi-hc-lg mr-2" hidden={!following} />
              {following ? "Following" : "Follow"}
            </div>
            <div
              className="jr-btn jr-btn-default btn btn-default rounded-right"
              onClick={this.highlightUser}
              style={{ color: highlighting && "#81c784" }}
            >
              <i className="zmdi zmdi-check-circle zmdi-hc-lg mr-2" hidden={!highlighting} />
              {highlighting ? "Highlighted" : "Highlight"}
            </div>
          </div>
          {/* ---BUTTONS FOR SMALL SCREENS--- */}
          <ButtonGroup className="btn-group mb-md-0 d-md-none">
            <div
              className="jr-btn jr-btn-sm jr-btn-default btn btn-default d-flex align-items-center justify-content-center"
              onClick={this.followUser}
              style={{ color: following && "#81c784" }}
            >
              <i className="zmdi zmdi-check-circle zmdi-hc-lg mr-2" hidden={!following} />
              {following ? "Following" : "Follow"}
            </div>
            <div
              className="jr-btn jr-btn-sm jr-btn-default btn btn-default d-flex align-items-center justify-content-center"
              onClick={this.highlightUser}
              style={{ color: highlighting && "#81c784" }}
            >
              <i className="zmdi zmdi-check-circle zmdi-hc-lg mr-2" hidden={!highlighting} />
              {highlighting ? "Highlighted" : "Highlight"}
            </div>
            {/* ---MESSAGE BUTTON ONLY VISIBLE ON SMALL SCREENS-- */}
            <Button
              className="jr-btn jr-btn-sm jr-btn-success btn btn-success d-md-none"
              onClick={this.props.toMessaging}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-lg" />
                &nbsp;&nbsp;
                <h4 className="mb-0"> Message</h4>
              </div>
            </Button>
          </ButtonGroup>
        </div>
      </React.Fragment>
    );
  }
}
export default FollowHighlightButtons;
