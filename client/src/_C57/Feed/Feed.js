import React from "react";
import FeedCard from "./FeedCard";
import { getFeed, postFeed, putUpdateFeed, deleteFeed } from "../../services/feed.sevice";
import FeedForm from "./FeedForm";
import "./Feed.css";
import ConfirmModal from "./ConfirmModal";
import { CreateButton } from "../CustomComponents/Button";

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
            imageUrl: [],
            videoUrl: []
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
      <div className="row">
        <div className="animation slideInLeft">
          <div className="mb-md-3">
            {this.state.feedForm ? (
              <div />
            ) : (
              <div className="jr-card" style={{ cursor: "pointer" }} onClick={this.handleOnClickFeedForm}>
                <div className="row">
                  <div className="col-md-8 col-12">
                    <h3 className="card-text">Share Photos, videos or Tips</h3>
                  </div>
                  <div className="col-md-4 col-12 text-right">
                    <CreateButton type="button" name="Post" onClick={this.handleOnClickFeedForm} />
                  </div>
                </div>
              </div>
            )}
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
            {this.state.feeds.map(feed => (
              <FeedCard
                borderColor="#009CE0"
                popover={feed.id}
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
    );
  }
}

export default Feed;
