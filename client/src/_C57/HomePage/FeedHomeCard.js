import React from "react";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import Popover from "../CustomComponents/Popover";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";
import { LikeButton, LikedButton, ViewCommentsButton, ViewLikesButton } from "../CustomComponents/Button";
import CommentsContainer from "../Comments/CommentsContainer";
import { NavLink } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { postMedia } from "../profile/ProfileServer";
import FeedModal from "../Feed/FeedModal";

class FeedHomeCard extends React.Component {
  state = {
    title: this.props.data.itemData.title,
    content: this.props.data.itemData.content,
    imageUrl: this.props.data.itemData.imageUrl,
    videoUrl: this.props.data.itemData.videoUrl,
    editMode: false,
    filePreview: "",
    imageDiv: true,
    videoHeight: "130px",
    videoWidth: "130px",
    mixedArray: [],
    selectedImg: 0,
    selectedVideo: 0,
    showImgModal: false,
    popoverOpen: false,
    videoPost: true,
    //Likes
    liked: false,
    likeCount: 0,
    likedModal: false,
    likeUserId: 0,
    //popoverMenu
    popover: true,
    //SweetAlert
    alert: null,
    fade: false
  };

  componentDidMount() {
    if (this.props.currentUser) {
      this.setState({
        liked: this.props.data.liked,
        likeCount: this.props.data.itemData.likeCount
      });
      // console.log("data!", this.props.data);
      const imageArray = this.props.data.itemData.imageUrl;

      const mappedImageArray = imageArray.map(image => ({
        src: image,
        type: "imageSmall"
      }));
      const videoArray = this.props.data.itemData.videoUrl;
      // console.log("VIDEO ARRAY", videoArray);
      const mappedVideoArray = videoArray.map(video => ({
        src: video,
        type: "videoSmall",
        col: null
      }));
      if (mappedImageArray.length == 1 && mappedVideoArray.length == 0) {
        mappedImageArray[0].type = "image";
      }
      if (mappedImageArray.length == 0 && mappedVideoArray.length == 1) {
        mappedVideoArray[0].type = "video";
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
          mixedArray[0].col = 6;
          mixedArray[1].col = 6;
          break;
        case 1:
          mixedArray[0].col = 12;
          break;
      }

      this.setState({ mixedArray });
    }
  }

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

  toggleImgModal = index => {
    this.setState({
      selectedImg: index,
      selectedVideo: index,
      showImgModal: !this.state.showImgModal
    });
  };

  fadeOut = () => {
    this.setState({
      fade: false
    });
  };

  nextImg = () => {
    this.setState(prevState => ({
      selectedImg: parseInt(prevState.selectedImg) + 1,
      selectedVideo: parseInt(prevState.selectedVideo) + 1,
      fade: !this.state.fade
    }));
  };

  prevImg = () => {
    this.setState(prevState => ({
      selectedImg: parseInt(prevState.selectedImg) - 1,
      selectedVideo: parseInt(prevState.selectedVideo) - 1,
      fade: !this.state.fade
    }));
  };

  onImgLoad = ({ target: img }) => {
    let year = new Date().getUTCFullYear();
    let month = new Date().getUTCMonth();
    let day = new Date().getUTCDate();
    let hours = new Date().getUTCHours();
    let minutes = new Date().getUTCMinutes();
    let seconds = new Date().getUTCSeconds();
    let milliseconds = new Date().getUTCMilliseconds();

    // let utcDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
    let nowElapsed = Date.UTC(year, month, day, hours, minutes, seconds, milliseconds);
    // let currentUTCDateTime = utcDate.toUTCString();
    // let timeNow = currentUTCDateTime.replace(/,/g, "") + "-0700 (Pacific Daylight Time)";
    let pTime = this.props.data.dateCreated;
    let pYear = pTime.substring(0, 4);
    let pMonth = pTime.substring(5, 7) - 1;

    let pDay = pTime.substring(8, 10);
    let pHours = pTime.substring(11, 13);

    let pMinutes = pTime.substring(14, 16);

    let pSeconds = pTime.substring(17, 19);

    let pMilliseconds = pTime.substring(20, 21) * 100;
    let postElapsed = Date.UTC(pYear, pMonth, pDay, pHours, pMinutes, pSeconds, pMilliseconds);
    let elapsedTime = (nowElapsed - postElapsed) / 1000;

    if (elapsedTime < 5 && this.props.data.itemData.authorId == this.props.currentUser.id) {
      let mediaObject = {
        userId: this.props.currentUser.id,
        type: "image",
        url: img.src,
        displayOrder: null,
        width: img.offsetWidth,
        height: img.offsetHeight,
        title: this.props.data.itemData.title,
        caption: this.props.data.itemData.content
      };
      postMedia(mediaObject).then(response => {
        //console.log("Post to Media Table", response);
      });
    }
  };

  likedUserModalToggle = () => {
    this.setState({
      likedModal: !this.state.likedModal
    });
  };
  handleOnClickViewLikedUsers = () => {
    this.props.handleViewLikedUsers(this.props.data.itemData.id);
    this.setState({
      likedModal: !this.state.likedModal
    });
  };

  handleOnClickLike = () => {
    this.setState({
      liked: true,
      likedCount: this.state.likeCount++
    });
    this.props.handleSubmitLike({
      userId: this.props.currentUser.id,
      postId: this.props.data.itemData.id,
      userNotified: false
    });
  };

  handleOnClickUnlike = () => {
    this.setState({
      liked: false,
      likeCount: this.state.likeCount - 1
    });
    this.props.handleDeleteLike(this.props.data.likedId);
  };

  handleOnClickEditToggle = () => {
    this.setState({
      editMode: !this.state.editMode,
      imageDiv: true,
      popover: !this.state.popover
    });
  };

  handleOnClickUpdate = () => {
    this.props.handleSubmitFeed({
      id: this.props.data.itemData.id,
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.imageUrl,
      slug: this.state.title,
      authorId: this.state.authorId,
      isPublished: this.state.isPublished,
      videoUrl: this.state.videoUrl
    });
    // Should this call handleOnClickEditToggle? what about imageDiv to false?
    this.setState({
      editMode: false,
      popover: true
    });
  };

  handleDeleteFeed = () => {
    this.props.handleDeleteFeed(this.props.data.itemData.id);
    this.onClickCancel();
  };

  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to delete `}
        onConfirm={this.handleDeleteFeed} //what function you want on confirm
        onCancel={this.onClickCancel} //what function you want on cancel
        //focusConfirmBtn={false}
      />
    );

    this.setState({ alert: getAlert() });
  };

  onClickCancel = () => {
    this.setState({ alert: null });
  };

  render() {
    const data = this.props.data.itemData;
    const { liked } = this.props.data;
    return (
      <div className="card shadow">
        <div className="cus-card-header" style={{ borderLeft: `8px solid #245dbc` }}>
          <div className="user-profile d-flex flex-row justify-content-between align-items-center">
            <NavLink to={`profile/${data.authorId}`} className="link-text">
              <div className="d-flex">
                <img alt="..." src={data.avatarUrl} className="user-avatar rounded-circle" />
                <div className="user-detail cus-user-detail">
                  <h4 className="user-name">
                    {data.firstName} {data.lastName}
                  </h4>
                  <p className="user-description" />
                </div>
              </div>
            </NavLink>

            <div className="text-right" />
            {this.props.currentUser.id === data.authorId && this.state.popover ? (
              <Popover
                isOpen={this.state.popoverOpen}
                popover={this.props.popover}
                handleDelete={this.delete}
                handleUpdate={this.handleOnClickEditToggle}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
        {this.state.editMode ? (
          <React.Fragment>
            <div className="p-4">
              <MultiFileUploader
                onImageUrlChange={this.handleImageUrlChange}
                onVideoUrlChange={this.handleVideoUrlChange}
                incommingImageArray={data.imageUrl}
                incommingVideoArray={data.videoUrl}
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
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="gl-image">
              <div className="gl row g-ul" style={{ maxHeight: "100%" }}>
                {this.state.mixedArray.map((tile, index) => (
                  <React.Fragment key={index}>
                    {tile.type == "imageSmall" && (
                      <div className={`col-${tile.col}`} style={{ height: 160, padding: 0 }}>
                        <div className="grid img-grid">
                          <img
                            src={tile.src}
                            alt={tile.title}
                            style={{ objectFit: "cover", width: "100%", padding: 0 }}
                            onLoad={this.onImgLoad}
                            className="img-grid-item"
                          />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {tile.type == "image" && (
                      <div className={`col-12`} style={{ height: "auto", padding: 0 }}>
                        <div className="grid img-grid">
                          <img
                            src={tile.src}
                            alt={tile.title}
                            style={{ objectFit: "cover", width: "100%", padding: 0 }}
                            onLoad={this.onImgLoad}
                            className="img-grid-item"
                          />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {tile.type == "video" && (
                      <div className={`col-12`} style={{ height: "auto", padding: 0 }}>
                        <div className="grid img-grid">
                          <VideoPlayerContainer
                            videoUrl={tile.src}
                            videoPost={this.state.videoPost}
                            className="img-grid-item"
                          />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {tile.type == "videoSmall" && (
                      <div className={`col-${tile.col}`} style={{ height: 160, objectFit: "cover", padding: 0 }}>
                        <div className="grid img-grid">
                          <VideoPlayerContainer
                            videoUrl={tile.src}
                            height="160px"
                            videoPost={this.state.videoPost}
                            className="img-grid-item"
                          />
                          <button onClick={() => this.toggleImgModal(parseInt(index))}>view</button>
                        </div>
                      </div>
                    )}
                    {this.state.showImgModal && (
                      <FeedModal
                        showImgModal={this.state.showImgModal}
                        toggleImgModal={this.toggleImgModal}
                        className={this.props.className}
                        images={this.state.mixedArray}
                        videos={this.state.mixedArray}
                        selectedImg={this.state.selectedImg}
                        selectedVideo={this.state.selectedVideo}
                        nextImg={this.nextImg}
                        prevImg={this.prevImg}
                        title={this.state.title}
                        content={this.state.content}
                        fade={this.state.fade}
                        fadeOut={this.fadeOut}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="card-body pb-2">
              <blockquote className="blockquote mb-0">
                <h3 className="font-weight-bold">{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h3>

                <div className="meta-wrapper">
                  <React.Fragment>
                    <span className="meta-date">
                      <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
                      &nbsp;
                      {data.dateModified.substring(0, 10)}
                    </span>
                  </React.Fragment>
                </div>
                <p className="card-text text-muted">{data.content}</p>
              </blockquote>
              <div className="d-flex justify-content-between mt-3 pl-2">
                <ViewLikesButton count={this.state.likeCount} onClick={this.handleOnClickViewLikedUsers} />
                {this.state.liked === true ? (
                  <LikedButton onClick={this.handleOnClickUnlike} />
                ) : (
                  <LikeButton onClick={this.handleOnClickLike} />
                )}
              </div>
            </div>
            <div className="card-footer pl-2 pr-0">
              <CommentsContainer postId={data.id} data={this.props.data.commentData} />
            </div>
          </React.Fragment>
        )}
        {this.state.alert}

        {/* <Modal isOpen={this.state.modal} toggle={this.handleOnClickViewLikedUsers} className={this.props.className} /> */}
      </div>
    );
  }
}

export default FeedHomeCard;
