import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardHeader, CardBody } from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ProfileCalendar from "./ProfileCalendar";
import ProfileImages from "./ProfileImages";
import EventModal from "./EventModal";
import CalendarModal from "./CalendarModal";
import FileUploader from "../FileUploader/FileUploader";
import {
  getEventsByUserId,
  getAttendingByUserId,
  getBlogsByUserId,
  getMediaByUserId,
  getPostsByUserId,
  getEventById
} from "./ProfileServer";
import { getFeed, postFeed, putUpdateFeed, deleteFeed } from "../../services/feed.sevice";
import "./ProfileBanner.css";
import Feed from "../Feed/Feed";
import "react-image-crop/dist/ReactCrop.css";
import ImageModal from "./ImageModal";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3, backgroundColor: "#f1f1f1", textAlign: "left" }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = {
  root: {
    flexGrow: 1
  }
};

class ProfileTabs extends React.Component {
  state = {
    uploadMode: false,
    value: 0,
    imageUrl: "",
    videoUrl: "",
    events: [],
    images: [],
    videos: [],
    showModal: false,
    showImgModal: false,
    selectedImg: 0,
    selectedVideo: 0,
    showPhotos: true,
    fade: false,

    //-----Calendar States-----------
    name: "",
    shortName: "",
    eventTypeId: 0,
    startDate: "",
    endDate: "",
    description: "",
    websiteUrl: "",
    logo: "",
    isOngoing: false,
    organizer: "",
    street: "",
    suite: "",
    city: "",
    state: "",
    zip: "",
    lat: 0.0,
    long: 0.0,
    eventId: 0,
    eventItem: {},
    organizerUser: {},
    eventTypeItem: {},
    gameTeam: "",
    gameOpponent: "",
    gameTime: "",
    gameLocation: "",
    gameDescription: ""
  };

  handleGameChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({
      [key]: val
    });
  };

  submitGame = () => {
    let startTime = new Date(this.state.gameTime);
    let endTime = startTime.setHours(startTime.getHours() + 2);
    let newGame = {
      title: `${this.state.gameTeam} vs ${this.state.gameOpponent}`,
      start: new Date(this.state.gameTime),
      end: new Date(endTime),
      desc: this.state.gameDescription,
      id: 99999
    };
    console.log(newGame);
    let events = [...this.state.events, newGame];
    this.setState({
      events: events,
      gameTeam: "",
      gameOpponent: "",
      gameTime: "",
      gameLocation: "",
      gameDescription: ""
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

  toggleUploadMode = () => {
    if (!this.state.uploadMode) {
      this.setState({
        uploadMode: true,
        showImgModal: true
      });
    } else {
      this.setState({
        uploadMode: false,
        showImgModal: false
      });
    }
  };

  videoView = () => {
    this.setState({
      showPhotos: false
    });
  };
  photoView = () => {
    this.setState({
      showPhotos: true
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  toggleImgModal = index => {
    if (this.state.showImgModal) {
      this.setState({
        selectedImg: index,
        selectedVideo: index,
        showImgModal: !this.state.showImgModal,
        uploadMode: false
      });
    } else {
      this.setState({
        selectedImg: index,
        selectedVideo: index,
        showImgModal: !this.state.showImgModal
      });
    }
  };

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
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

  fadeOut = () => {
    this.setState({
      fade: false
    });
  };

  removeDeletedMedia = index => {
    if (this.state.showPhotos) {
      let imgArray = [...this.state.images];
      imgArray.splice(index, 1);
      this.setState({
        images: imgArray
      });
    } else {
      let videoArray = [...this.state.videos];
      videoArray.splice(index, 1);
      this.setState({
        videos: videoArray
      });
    }
  };

  replaceCroppedImg = imgPayload => {
    let imgArray = [...this.state.images];
    imgArray.splice(this.state.selectedImg, 1, imgPayload);
    this.setState({
      images: imgArray
    });
  };

  addNewMediaToState = payload => {
    if (payload.type === "image") {
      let imgArray = [...this.state.images];
      imgArray.push(payload);
      this.setState({
        images: imgArray
      });
    } else if (payload.type === "video") {
      let videoArray = [...this.state.videos];
      videoArray.push(payload);
      this.setState({
        videos: videoArray
      });
    }
  };

  handleDoubleClickEvent = event => {
    getEventById(event.id).then(response => {
      this.setState({
        eventId: response.data.item.id,
        name: response.data.item.name,
        shortName: response.data.item.shortName,
        eventTypeId: response.data.item.eventTypeId,
        startDate: response.data.item.startDate,
        endDate: response.data.item.endDate,
        description: response.data.item.description,
        websiteUrl: response.data.item.websiteUrl,
        logo: response.data.item.logo,
        isOngoing: response.data.item.isOngoing,
        organizer: response.data.item.organizer,
        street: response.data.item.street,
        suite: response.data.item.suite,
        city: response.data.item.city,
        state: response.data.item.state,
        zip: response.data.item.zip,
        lat: response.data.item.lat,
        long: response.data.item.long
      });
      this.toggle();
    });
  };

  componentDidMount() {
    getAttendingByUserId(parseInt(this.props.userProfile)).then(response => {
      //console.log("attending", response);
      if (response.data.resultSets) {
        let calEventArray = [];
        response.data.resultSets[0].map(event => {
          let calEvent = {
            title: event.name,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            desc: event.description,
            id: event.eventId
          };
          calEventArray.push(calEvent);
        });
        this.setState({
          events: calEventArray
        });
      }
    });
    // getEventsByUserId(parseInt(this.props.userProfile)).then(response => {
    //   //console.log("GET events", response);
    //   if (response.data.resultSets) {
    //     let calEventArray = [];
    //     response.data.resultSets[0].map(event => {
    //       let calEvent = {
    //         title: event.name,
    //         start: new Date(event.startDate),
    //         end: new Date(event.endDate),
    //         desc: event.description,
    //         id: event.eventId
    //       };
    //       calEventArray.push(calEvent);
    //     });
    //     this.setState({
    //       events: calEventArray
    //     });
    //   }
    // });

    getMediaByUserId(parseInt(this.props.userProfile)).then(response => {
      console.log("GET Media by user Id", response);
      let imageTileArray = [];
      let videoTileArray = [];
      if (response.data.resultSets) {
        response.data.resultSets[0].map(thumbnail => {
          if (thumbnail.Url.length > 3) {
            if (thumbnail.Type === "image") {
              let tile = {
                id: thumbnail.id,
                type: thumbnail.Type,
                alt: thumbnail.Id,
                src: thumbnail.Url,
                thumbnail: thumbnail.Url,
                thumbnailWidth: thumbnail.Width,
                thumbnailHeight: thumbnail.Height,
                title: thumbnail.Title,
                caption: thumbnail.Caption
              };
              imageTileArray.push(tile);
            } else if (thumbnail.Type === "video") {
              let tile = {
                id: thumbnail.id,
                type: thumbnail.Type,
                alt: thumbnail.Id,
                src: thumbnail.Url,
                thumbnail: thumbnail.Url,
                thumbnailWidth: thumbnail.Width,
                thumbnailHeight: thumbnail.Height,
                title: thumbnail.Title,
                caption: thumbnail.Caption
              };
              videoTileArray.push(tile);
            }
          }
        });
        this.setState({
          images: imageTileArray,
          videos: videoTileArray
        });
      }
    });
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="white" style={{ boxShadow: "none", paddingLeft: "0px", paddingRight: "0px" }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            fullWidth={true}
          >
            <Tab label="Feed" style={{ padding: "12px" }} />

            <Tab label="Schedule" style={{ padding: "12px" }} />

            <Tab label="Gallery" style={{ padding: "12px" }} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <TabContainer dir={theme.direction}>
                  <Feed />
          </TabContainer>
          <TabContainer dir={theme.direction}>
              {this.props.currentUser.id == this.props.userProfile && (
                <div className="row">
                  <div className="col-md-1">
                    <EventModal handleGameChange={this.handleGameChange} submitGame={this.submitGame} />
                  </div>
                </div>
              )}
              <div className="row mt-4">
                <div className="col-md-12">
                  <CalendarModal showModal={this.state.showModal} toggle={this.toggle} {...this.state} />
                  <div style={{ overflow: "auto" }}>
                    <ProfileCalendar handleDoubleClickEvent={this.handleDoubleClickEvent} events={this.state.events} />
                  </div>
                </div>
              </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>
              {this.props.currentUser.id == this.props.userProfile && (
                <div className="row">
                <div className="col-md-3 mb-2">
                    <button type="button" className="btn btn-primary" onClick={this.toggleUploadMode}>
                      + Add New Photo/Video
                    </button>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-12">
                  <ProfileImages
                    videos={this.state.videos}
                    images={this.state.images}
                    togglePopover={this.togglePopover}
                    showPopover={this.state.showPopover}
                    toggleImgModal={this.toggleImgModal}
                    photoView={this.photoView}
                    videoView={this.videoView}
                    showPhotos={this.state.showPhotos}
                  />
                  {this.state.showImgModal && (
                    <ImageModal
                      replaceCroppedImg={this.replaceCroppedImg}
                      userProfile={this.props.userProfile}
                      uploadMode={this.state.uploadMode}
                      showImgModal={this.state.showImgModal}
                      toggleImgModal={this.toggleImgModal}
                      className={this.props.className}
                      images={this.state.images}
                      videos={this.state.videos}
                      showPhotos={this.state.showPhotos}
                      selectedImg={this.state.selectedImg}
                      selectedVideo={this.state.selectedVideo}
                      nextImg={this.nextImg}
                      prevImg={this.prevImg}
                      removeDeletedMedia={this.removeDeletedMedia}
                      changeProfilePic={this.props.changeProfilePic}
                      addNewMediaToState={this.addNewMediaToState}
                      fade={this.state.fade}
                      fadeOut={this.fadeOut}
                    />
                  )}
                </div>
              </div>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ProfileTabs));
