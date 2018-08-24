import React from "react";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import Popover from "../CustomComponents/Popover";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";
import { LikeButton, LikedButton, ViewCommentsButton, ViewLikesButton } from "../CustomComponents/Button";
import CommentsContainer from "../Comments/CommentsContainer";
import { NavLink } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

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
    popoverOpen: false,
    //Likes
    liked: false,
    likeCount: 0,
    likedModal: false,
    likeUserId: 0,
    //popoverMenu
    popover: true,
    //SweetAlert
    alert: null
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
        url: image,
        type: "imageSmall"
      }));
      const videoArray = this.props.data.itemData.videoUrl;
      // console.log("VIDEO ARRAY", videoArray);
      const mappedVideoArray = videoArray.map(video => ({
        url: video,
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
          mixedArray[0].col = 8;
          mixedArray[1].col = 4;
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
      postId: this.props.data.itemData.id
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
    this.setState({
      editMode: false
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
        <div className="cus-card-header" style={{ borderLeft: `8px solid lightblue` }}>
          <div className="user-profile d-flex flex-row justify-content-between align-items-center">
            <NavLink to={`profile/${data.authorId}`} className="link-text">
              <div className="d-flex">
                <img alt="..." src={data.avatarUrl} className="user-avatar rounded-circle" />
                <div className="user-detail cus-user-detail">
                  <h4 className="user-name">
                    {data.firstName} {data.lastName}
                  </h4>
                  <p className="user-description">school and sport type</p>
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
                        <div className="grid">
                          <img
                            src={tile.url}
                            alt={tile.title}
                            style={{ objectFit: "cover", width: "100%", padding: 0 }}
                          />
                        </div>
                      </div>
                    )}
                    {tile.type == "image" && (
                      <div className={`col-12`} style={{ height: "auto", padding: 0 }}>
                        <div className="grid">
                          <img
                            src={tile.url}
                            alt={tile.title}
                            style={{ objectFit: "cover", width: "100%", padding: 0 }}
                          />
                        </div>
                      </div>
                    )}
                    {tile.type == "video" && (
                      <div className={`col-12`} style={{ height: "auto", padding: 0 }}>
                        <div className="grid">
                          <VideoPlayerContainer videoUrl={tile.url} />
                        </div>
                      </div>
                    )}
                    {tile.type == "videoSmall" && (
                      <div className={`col-${tile.col}`} style={{ height: 160, objectFit: "cover", padding: 0 }}>
                        <div className="grid">
                          <VideoPlayerContainer videoUrl={tile.url} height="160px" />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="card-body pb-2">
              <blockquote className="blockquote mb-0">
                <h3>{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h3>

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
              <CommentsContainer postId={data.id} />
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
