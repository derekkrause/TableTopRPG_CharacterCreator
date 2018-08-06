import React from "react";
import FeedCard from "./FeedCard";
import { getFeed, postFeed, putUpdateFeed, deleteFeed } from "../../services/feed.sevice";
import FeedForm from "./FeedForm";
import "./Feed.css";
import ConfirmModal from "./ConfirmModal";

class Feed extends React.Component {
  state = {
    feeds: [],
    name: "",
    description: "tbd",
    body: "",
    imageUrl: "",
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
    modal: false
  };

  componentDidMount() {
    getFeed()
      .then(response => {
        console.log("Get All", response);
        this.setState({
          feeds: response.data.item.pagedItems
        });
      })
      .catch(error => console.log(error));
  }

  handleSubmitFeed = payload => {
    let feedId = payload.id;
    if (feedId) {
      putUpdateFeed(payload, feedId)
        .then(response => {
          console.log("UPDATE/PUT", response);
          this.setState({
            title: "",
            content: "",
            imageUrl: "",
            videoUrl: ""
          });
          window.location.reload();
        })
        .catch(error => console.log(error));
    } else {
      postFeed(payload)
        .then(response => {
          console.log("CREATE/POST", response);
          this.setState({
            title: "",
            content: "",
            imageUrl: "",
            videoUrl: "",
            feedForm: false
          });
          window.location.reload();
        })
        .catch(error => console.log(error));
    }
  };

  handleUpdateFeed = feedId => {
    console.log("UPDATE", feedId);
  };

  handleDeleteFeed = () => {
    const feedId = this.state.feedId;
    deleteFeed(feedId).then(response => {
      console.log("DELETE", response);
      this.setState({
        modal: !this.state.modal,
        feedId: ""
      });
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
    this.setState({
      modal: !this.state.modal,
      feedId
    });
  };

  render() {
    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration">
          <div className="row">
            <div className="animation slideInLeft">
              <div className="row cus-page-header-container">
                <div className="col-md-6 col-6 mt-4">
                  <h1> Feed </h1>
                </div>
                <div className="col-md-6 col-6 mt-4 text-right">
                  {this.state.feedForm ? (
                    <div />
                  ) : (
                    <button
                      type="button"
                      className="jr-btn btn-blue-grey btn btn-default"
                      onClick={this.handleOnClickFeedForm}
                    >
                      Add post
                    </button>
                  )}
                </div>
              </div>
              {this.state.feedForm ? (
                <FeedForm
                  closeFeedForm={this.handleOnClickFeedForm}
                  videoUrl={this.state.videoUrl}
                  handleOnclickVideoLink={this.handleOnclickVideoLink}
                  formFileBtn={this.state.formFileBtn}
                  handleSubmitFeed={this.handleSubmitFeed}
                  capitalize={this.capitalize}
                  formVideoLinkInput={this.state.formVideoLinkInput}
                />
              ) : (
                <div />
              )}
              <div className="cus-card-container">
                {this.state.feeds
                  .sort((a, b) => Date.parse(new Date(a.dateModified)) - Date.parse(new Date(b.dateModified)))
                  .reverse()
                  .map(feed => (
                    <FeedCard
                      key={feed.id}
                      feed={feed}
                      editFeed={this.handleOnClickEditFeed}
                      handleUpdateFeed={() => this.handleUpdateFeed(feed.id)}
                      handleModalToggle={() => this.handleModalToggle(feed.id)}
                      handleSubmitFeed={this.handleSubmitFeed}
                      imageUrl={this.state.imageUrl}
                      handleOnClickUploader={this.handleOnClickUploader}
                    />
                  ))}
              </div>
              <div>
                <ConfirmModal
                  handleModalToggle={this.handleModalToggle}
                  modal={this.state.modal}
                  handleDeleteFeed={this.handleDeleteFeed}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
