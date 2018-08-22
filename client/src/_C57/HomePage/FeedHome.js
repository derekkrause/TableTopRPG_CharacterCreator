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

  renderFeed = () => {
    getFeedHome()
      .then(response => {
        // console.log("Get All", response);
        this.setState(
          {
            feeds: response.data.item.pagedItems
          } /*,
          () => {console.log("FEED HOME", this.state.feeds);
          }*/
        );
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.renderFeed();
  }

  handleSubmitFeed = payload => {
    let feedId = payload.id;
    if (feedId) {
      putUpdateFeed(payload, feedId)
        .then(response => {
          // console.log("UPDATE/PUT", response);
          this.setState({
            title: "",
            content: "",
            imageUrl: [],
            videoUrl: []
          });
        })
        .catch(error => console.log(error));
    } else {
      postFeed(payload)
        .then(response => {
          console.log("CREATE/POST", response);
          this.setState({ feedForm: false }, this.renderFeed());
        })
        .catch(error => console.log(error));
    }
  };

  handleUpdateFeed = feedId => {
    // console.log("UPDATE", feedId);
  };

  handleDeleteFeed = () => {
    const feedId = this.state.feedId;
    deleteFeed(feedId).then(response => {
      // console.log("DELETE", response);
      this.setState({ modal: !this.state.modal, feedId: "" });
      window.location.reload();
    });
  };

  handleOnClickFeedForm = () => {
    if (this.state.feedForm === false) {
      this.setState({ feedForm: true });
    } else {
      this.setState({ feedForm: false });
    }
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

  handleModalToggle = feedId => {
    this.setState({ modal: !this.state.modal, feedId });
  };

  handleDateFormat = date => {
    var newDate = new Date(date.substring(0, 10));
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
      newDate.getMonth()
    ];
    return month + " " + newDate.getDate() + ", " + newDate.getFullYear();
  };

  likedUserMatch = () => {}; //What does this do???

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
      <div className="row px-sm-0 px-3">
        <div className="animation slideInLeft">
          <div className="mb-md-3">
            {this.state.feedForm ? (
              <div />
            ) : (
              <div className="jr-card" style={{ cursor: "pointer" }} onClick={this.handleOnClickFeedForm}>
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
                  (feed, index) =>
                    feed.type === "event" ? (
                      <FeedEventCard data={feed} key={index} handleDateFormat={this.handleDateFormat} />
                    ) : feed.type === "blog" ? (
                      <FeedHomeCard
                        data={feed}
                        key={index}
                        popover={feed.itemData.id}
                        handleSubmitLike={this.handleSubmitLike}
                        currentUser={this.props.currentUser.id}
                        handleViewLikedUsers={this.handleViewLikedUsers}
                        handleDeleteLike={this.handleDeleteLike}
                        renderFeed={this.renderFeed}
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
