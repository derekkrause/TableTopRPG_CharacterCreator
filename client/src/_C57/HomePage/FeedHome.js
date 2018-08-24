import React from "react";
import FeedHomeCard from "./FeedHomeCard";
import { getFeedHome, postFeed, putUpdateFeed, deleteFeed } from "../../services/feed.sevice";
import FeedForm from "../Feed/FeedForm";
import "../Feed/Feed.css";
import ConfirmModal from "../Feed/ConfirmModal";
import { CreateButton } from "../CustomComponents/Button";
import FeedEventCard from "./FeedEventCard";
import { postLike, getLikeByPostId, deleteLike } from "../../services/like.service";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class FeedHome extends React.Component {
  state = {
    feeds: [],
    name: "",
    description: "tbd",
    body: "",
    imageUrl: [],
    title: "",
    content: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    feedForm: false,
    formVideoLinkInput: false,
    formFileBtn: true,
    videoUrl: "",
    feedId: 0,
    updateBtn: false,
    modal: false,
    eventCardsList: [],
    likedUser: [],
    userLikeMatch: false
  };

  componentDidMount() {
    if (this.props.currentUser) {
      this.renderFeed();
    }
  }

  renderFeed = () => {
    getFeedHome()
      .then(response => {
        // console.log("Get All", response);
        this.setState(
          {
            feeds: response.data.item.pagedItems
          } /*,
          () => {
            console.log("FEED HOME", this.state.feeds);
          }*/
        );
      })
      .catch(error => console.log(error));
  };

  handleSubmitFeed = payload => {
    let feedId = payload.id;
    if (feedId) {
      putUpdateFeed(payload, feedId)
        .then(response => {
          // console.log("UPDATE/PUT", response);
          this.setState(
            {
              title: "",
              content: "",
              imageUrl: [],
              videoUrl: []
            },
            this.renderFeed()
          );
        })
        .catch(error => console.log(error));
    } else {
      postFeed(payload)
        .then(response => {
          //console.log("CREATE/POST", response);
          this.setState({ feedForm: false }, this.renderFeed());
        })
        .catch(error => console.log(error));
    }
  };

  handleDeleteFeed = feedId => {
    //const feedId = this.state.feedId;
    deleteFeed(feedId).then(response => {
      //console.log("DELETE", response);
      this.renderFeed();
    });
  };

  handleOnClickFeedForm = () => {
    if (!this.state.feedForm) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState({ feedForm: !this.state.feedForm });
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleOnClickFeedForm();
  };
  handleOnclickVideoLink = () => {
    if (this.state.formVideoLinkInput) {
      this.setState({
        formVideoLinkInput: false,
        imageUrl: "",
        formFileBtn: true
      });
    } else {
      this.setState({
        formVideoLinkInput: true,
        formFileBtn: false
      });
    }
  };

  handleDateFormat = date => {
    var newDate = new Date(date.substring(0, 10));
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
      newDate.getMonth()
    ];
    return month + " " + newDate.getDate() + ", " + newDate.getFullYear();
  };

  handleSubmitLike = payload => {
    postLike(payload).then(res => {
      // console.log("POST LIKE", res);
    }, this.renderFeed());
    // .then(this.renderFeed());
  };
  handleDeleteLike = id => {
    deleteLike(id)
      .then(res => {
        // console.log("UNLIKE", id, res);
      })
      .then(this.renderFeed());
  };
  handleViewLikedUsers = postId => {
    // console.log("POST ID TO VIEW LIKED USERS", postId);
    getLikeByPostId(postId).then(res => {
      this.setState({ likedUser: res.data.resultSets });
      // console.log("VIEW LIKED USERS", res);
    });
  };

  render() {
    return (
      <div
        className="row px-sm-0 px-3"
        ref={node => {
          this.node = node;
        }}
      >
        <div className="animation slideInLeft pt-0">
          <div>
            {this.state.feedForm ? (
              <div />
            ) : (
              <div className="jr-card shadow" style={{ cursor: "pointer" }}>
                <div className="row  home-center-text">
                  <div className="col-md-8 col-12">
                    <h3 className="card-text">Share Photos, videos or Tips</h3>
                  </div>
                  <div className="col-md-4 col-12 text-right">
                    <CreateButton type="button" name="Post" onClick={this.handleOnClickFeedForm} url={"events"} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {this.state.feedForm && (
            <FeedForm
              closeFeedForm={this.handleOnClickFeedForm}
              videoUrl={this.state.videoUrl}
              handleOnclickVideoLink={this.handleOnclickVideoLink}
              formFileBtn={this.state.formFileBtn}
              handleSubmitFeed={this.handleSubmitFeed}
              capitalize={this.capitalize}
              formVideoLinkInput={this.state.formVideoLinkInput}
            />
          )}
          <div className="cus-card-container">
            {this.state.feeds
              ? this.state.feeds.map(
                  feed =>
                    feed.type === "event" ? (
                      <FeedEventCard
                        data={feed}
                        key={feed.type + feed.itemData.id}
                        handleDateFormat={this.handleDateFormat}
                      />
                    ) : feed.type === "blog" ? (
                      <FeedHomeCard
                        data={feed}
                        key={feed.type + feed.itemData.id}
                        popover={feed.itemData.id}
                        handleSubmitLike={this.handleSubmitLike}
                        handleViewLikedUsers={this.handleViewLikedUsers}
                        handleDeleteLike={this.handleDeleteLike}
                        currentUser={this.props.currentUser}
                        handleSubmitFeed={this.handleSubmitFeed}
                        handleDeleteFeed={this.handleDeleteFeed}
                      />
                    ) : null
                )
              : null}
          </div>

          {/* <div>
            <ConfirmModal
              handleModalToggle={this.handleModalToggle}
              modal={this.state.modal}
              handleDeleteFeed={this.handleDeleteFeed}
            />
          </div> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps)(FeedHome));
