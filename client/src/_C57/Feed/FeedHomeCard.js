import React from "react";
import CardLayout from "components/CardLayout";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import FileUploader from "../CustomComponents/FileUploader/FileUploader";
import { utc } from "../../../node_modules/moment";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";
import { DeleteButton } from "../CustomComponents/Button";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Popover from "../CustomComponents/Popover";
import CommentsContainer from "../Comments/CommentsContainer";

class FeedHomeCard extends React.Component {
  state = {
    title: this.props.data.title,
    content: this.props.data.content,
    imageUrl: [],
    videoUrl: [],
    editMode: false,
    filePreview: "",
    imageDiv: true,
    videoHeight: "130px",
    videoWidth: "130px",
    mixedArray: [],
    popoverOpen: false
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

  componentDidMount() {
    console.log("data!", this.props.data);
    const imageArray = this.props.data.itemData.imageUrl;
    // if (imageArray && imageArray.length) {
    //   return imageArray;
    // } else {
    //   return [];
    // }
    const mappedImageArray = imageArray.map(image => ({
      url: image,
      type: "imageSmall"
    }));
    const videoArray = this.props.data.itemData.videoUrl;
    console.log("VIDEO ARRAY", videoArray);
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
    // this.shuffle(mixedArray);

    this.setState({ mixedArray });
  }

  render() {
    const data = this.props.data.itemData;
    return (
      <div className="card">
        <div className="cus-card-header" style={{ borderLeft: `8px solid lightblue` }}>
          <div className="user-profile d-flex flex-row align-items-center">
            <img alt="..." src={data.avatarUrl} className="user-avatar rounded-circle" />
            <div className="user-detail cus-user-detail">
              <h4 className="user-name">{data.firstName}</h4>
              <p className="user-description">school and sport type</p>
            </div>
            <div className="text-right" />
          </div>
        </div>
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

          <div className="card-body">
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
          </div>
          <div className="card-footer pl-2 pr-0">
            <CommentsContainer postId={data.id} />
          </div>
        </React.Fragment>

        {this.state.alert}
      </div>
    );
  }
}

export default FeedHomeCard;
