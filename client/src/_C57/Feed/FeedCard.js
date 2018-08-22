import React from "react";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";
import Popover from "../CustomComponents/Popover";
import IfLoginStatus from "../CustomComponents/IfLoginStatus";
import CommentsContainer from "../Comments/CommentsContainer";
import "./FeedCard.css";
import ImageModal from "../profile/ImageModal";

class FeedCard extends React.Component {
  state = {
    title: this.props.feed.title,
    content: this.props.feed.content,
    imageUrl: [],
    videoUrl: [],
    editMode: false,
    filePreview: "",
    imageDiv: true,
    videoHeight: "130px",
    videoWidth: "130px",
    mixedArray: [],
    popoverOpen: false,
    //  img carousel
    showImgModal: false,
    images: [],
    selectedImg: null
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };
  handleOnClickEditToggle = () => {
    this.setState({
      editMode: !this.state.editMode,
      imageDiv: true
    });
  };

  handleOnClickUpdate = () => {
    this.props.handleSubmitFeed({
      id: this.props.feed.id,
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.imageUrl,
      slug: this.state.title,
      authorId: this.state.authorId,
      isPublished: this.state.isPublished,
      videoUrl: this.state.videoUrl
    });
    this.setState({
      editMode: false
    });
  };

  handleOnClickDeleteCurrent = () => {
    this.setState({
      imageDiv: false
    });
  };

  handleImageUrlChange = newImageUrl => {
    let newArr = [];
    for (let i = 0; i < newImageUrl.length; i++) {
      newArr.push(newImageUrl[i].url);
    }
    this.setState({
      imageUrl: newArr
    });
  };

  handleVideoUrlChange = newVideoUrl => {
    let newArr = [];
    // for (let i = 0; i < newVideoUrl.length; i++) {
    //   newArr.push(newVideoUrl[i].url);
    // }
    newVideoUrl.map(video => newArr.push(video.url));
    this.setState({
      videoUrl: newArr
    });
  };

  shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  componentWillMount() {
    const imageArray = this.props.feed.imageUrl;
    const mappedImageArray = imageArray.map(image => ({
      img: image,
      type: "image"
    }));
    const videoArray = this.props.feed.videoUrl;
    const mappedVideoArray = videoArray.map(video => ({
      img: video,
      type: "video",
      col: null
    }));
    if (mappedImageArray.length == 1 && mappedVideoArray.length == 0) {
      mappedImageArray[0].type = "imageLarge";
    }
    if (mappedImageArray.length == 0 && mappedVideoArray.length == 1) {
      mappedVideoArray[0].type = "videoLarge";
    }
    const mixedArray = mappedImageArray.concat(mappedVideoArray);
    switch (mixedArray.length) {
      case 8:
        mixedArray[7].col = 8;
        mixedArray[6].col = 4;
        mixedArray[5].col = 4;
        mixedArray[4].col = 8;
        mixedArray[3].col = 8;
        mixedArray[2].col = 4;
        mixedArray[1].col = 4;
        mixedArray[0].col = 8;
        break;
      case 7:
        mixedArray[6].col = 8;
        mixedArray[5].col = 4;
        mixedArray[4].col = 4;
        mixedArray[3].col = 8;
        mixedArray[2].col = 4;
        mixedArray[1].col = 4;
        mixedArray[0].col = 4;
        break;
      case 6:
        mixedArray[5].col = 8;
        mixedArray[4].col = 4;
        mixedArray[3].col = 4;
        mixedArray[2].col = 8;
        mixedArray[1].col = 8;
        mixedArray[0].col = 4;
        break;
      case 5:
        mixedArray[4].col = 8;
        mixedArray[3].col = 4;
        mixedArray[2].col = 4;
        mixedArray[1].col = 4;
        mixedArray[0].col = 4;
        break;
      case 4:
        mixedArray[3].col = 8;
        mixedArray[2].col = 4;
        mixedArray[1].col = 4;
        mixedArray[0].col = 8;
        break;
      case 3:
        mixedArray[2].col = 4;
        mixedArray[1].col = 4;
        mixedArray[0].col = 4;
        break;
      case 2:
        mixedArray[0].col = 8;
        mixedArray[1].col = 4;
        break;
      case 1:
        mixedArray[0].col = 12;
        break;
    }
    // this.shuffle(mixedArray);

    this.setState({ mixedArray });
  }

  toggleImgModal = imgIndex => {
    this.setState({
      selectedImg: imgIndex,
      showImgModal: !this.state.showImgModal
    });
  };

  nextImg = () => {
    this.setState(prevState => ({
      selectedImg: parseInt(prevState.selectedImg) + 1
    }));
  };

  prevImg = () => {
    this.setState(prevState => ({
      selectedImg: parseInt(prevState.selectedImg) - 1
    }));
  };

  render() {
    return (
      <div className="card">
        <div className="cus-card-header" style={{ borderLeft: `7px solid ${this.props.borderColor}` }}>
          <div className="user-profile d-flex flex-row align-items-center">
            <img alt="..." src={this.props.feed.avatarUrl} className="user-avatar rounded-circle" />
            <div className="user-detail cus-user-detail">
              <h4 className="user-name">{this.props.feed.firstName}</h4>
              <p className="user-description">school and sport type</p>
            </div>
            <div className="text-right">
              <IfLoginStatus loggedIn={true} isAdmin={true}>
                <Popover
                  isOpen={this.state.popoverOpen}
                  popover={this.props.popover}
                  handleDelete={() => this.props.handleDelete(feed.id)}
                  handleUpdate={() => this.props.handleUpdateFeed(feed.id)}
                />
              </IfLoginStatus>
            </div>
          </div>
        </div>
        <br />
        {this.state.editMode ? (
          <React.Fragment>
            <MultiFileUploader
              onImageUrlChange={this.handleImageUrlChange}
              onVideoUrlChange={this.handleVideoUrlChange}
              incommingImageArray={this.props.feed.imageUrl}
              incommingVideoArray={this.props.feed.videoUrl}
            />
            <h4> Title </h4>
            <input
              className="form-control"
              type="text"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />

            <div className="mt-4">
              <h4> Content</h4>
              <textarea
                className="form-control"
                rows="8"
                placeholder="Share your thoughts, moments and tips "
                value={this.state.content}
                onChange={e => this.setState({ content: e.target.value })}
              />
              <br />
            </div>
            <div className="btn-container text-right">
              <button
                type="button"
                className="jr-btn jr-btn-default btn btn-default"
                onClick={this.handleOnClickEditToggle}
              >
                Cancel
              </button>
              <button type="button" className="jr-btn bg-success btn btn-success" onClick={this.handleOnClickUpdate}>
                <i className="zmdi zmdi-edit zmdi-hc-fw" />
                <span className="btn-name card-text">Update</span>
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="gl-image">
              <div className="gl row g-ul" style={{ maxHeight: "100%" }}>
                {this.state.mixedArray.map((tile, index) => (
                  <React.Fragment key={index}>
                    {tile.type == "image" && (
                      <div className={`col-${tile.col}`} style={{ height: 160, padding: 0 }}>
                        <div className="grid img-grid">
                          <img
                            className="img-grid-item"
                            src={tile.img}
                            alt={tile.title}
                            style={{ objectFit: "cover", width: "100%", padding: 0 }}
                          />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {tile.type == "imageLarge" && (
                      <div className={`col-12`} style={{ height: "auto", padding: 0 }}>
                        <div className="grid img-grid">
                          <img
                            className="img-grid-item"
                            src={tile.img}
                            alt={tile.title}
                            style={{ objectFit: "cover", width: "100%", padding: 0 }}
                          />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {tile.type == "videoLarge" && (
                      <div className={`col-12`} style={{ height: "auto", padding: 0 }}>
                        <div className="grid img-grid">
                          <VideoPlayerContainer videoUrl={tile.img} className="img-grid-item" />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {tile.type == "video" && (
                      <div className={`col-${tile.col}`} style={{ height: 160, objectFit: "cover", padding: 0 }}>
                        <div className="grid img-grid">
                          <VideoPlayerContainer videoUrl={tile.img} height="160px" className="img-grid-item" />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {this.state.showImgModal && (
                      <ImageModal
                        showImgModal={this.state.showImgModal}
                        toggleImgModal={this.toggleImgModal}
                        className={this.props.className}
                        images={this.state.mixedArray}
                        selectedImg={this.state.selectedImg}
                        nextImg={this.nextImg}
                        prevImg={this.prevImg}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <h3>{this.props.feed.title.charAt(0).toUpperCase() + this.props.feed.title.slice(1)}</h3>

                <div className="meta-wrapper">
                  {this.props.feed.dateModified == this.props.feed.dateCreated ? (
                    <React.Fragment>
                      <span className="meta-date">
                        <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
                        &nbsp;
                        {this.props.feed.dateModified.substring(0, 10)}
                      </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span className="meta-date">
                        <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
                        &nbsp;
                        {this.props.feed.dateCreated.substring(0, 10)} &nbsp; Updated
                      </span>
                    </React.Fragment>
                  )}
                </div>
                <p className="card-text text-muted">{this.props.feed.content}</p>
              </blockquote>
            </div>
            <div className="card-footer pl-2 pr-0">
              <CommentsContainer postId={this.props.feed.id} />
            </div>

            <div className="btn-container text-right">
              <button
                type="button"
                className="jr-btn jr-btn-default btn btn-default"
                onClick={this.handleOnClickEditToggle}
              >
                <i className="zmdi zmdi-edit zmdi-hc-fw" />
                <span className="btn-name card-text">Edit</span>
              </button>
            </div>
          </React.Fragment>
        )}
        {this.state.alert}
      </div>
    );
  }
}

export default FeedCard;
