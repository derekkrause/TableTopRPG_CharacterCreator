import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardHeader, CardBody } from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ProfileCalendar from "../profile/ProfileCalendar";
// import ProfileImages from "./ProfileImages";
import EventModal from "../profile/EventModal";
import CalendarModal from "../profile/CalendarModal";
import FileUploader from "../FileUploader/FileUploader";
import {
  getEventsByUserId,
  getAttendingByUserId,
  getBlogsByUserId,
  getMediaByUserId,
  getPostsByUserId,
  getEventById
} from "../profile/ProfileServer";
// import { getFeed, postFeed, putUpdateFeed, deleteFeed } from "../../services/feed.sevice";
import "../profile/ProfileBanner.css";
// import Feed from "../Feed/Feed";
import "react-image-crop/dist/ReactCrop.css";
// import ImageModal from "./ImageModal";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";
import GameModal from "./GameModal";
import { getAllTeams } from "./AdvocateServer";

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

class AdvocateTab extends React.Component {
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
    gameDescription: "",
    teams: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleGameChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({
      [key]: val
    });
  };

  handleDoubleClickEvent = event => {
    getEventById(event.id).then(response => {
      console.log("GET", response);
      this.setState({
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
  }

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

  getTeams = () => {
    getAllTeams()
      .then(response => {
        console.log(response, "Get All Teams");
        if (!response.data.item.pagedItems) {
          this.setState({
            teams: []
          });
        } else {
          this.setState({
            teams: response.data.item.pagedItems
          });
        }
      })
      .catch(error => {
        console.log(error, "Error");
      });
  };

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
            <Tab label="Schedule" style={{ padding: "12px" }} />
            <Tab label="Teams" style={{ padding: "12px" }} onClick={this.getTeams} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <TabContainer dir={theme.direction}>
            {/* {this.props.currentUser.id == this.props.userProfile && ( */}
            <div className="row">
              <div className="col-md-1">
                <EventModal handleGameChange={this.handleGameChange} submitGame={this.submitGame} />
              </div>
            </div>
            {/* )} */}
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
            <div className="container">
              {/* <div className="col-md-1"> */}
              <GameModal key={this.state.teams} teams={this.state.teams} advocateUserId={this.props.advocateUserId} />
              {/* </div> */}
            </div>
            {/* <div className="mt-2">
              <div className="col-md-12 px-0">
                <CalendarModal showModal={this.state.showModal} toggle={this.toggle} {...this.state} />
                <div style={{ overflow: "auto" }}>
                  <ProfileCalendar handleDoubleClickEvent={this.handleDoubleClickEvent} events={this.state.events} />
                </div>
              </div>
            </div> */}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

AdvocateTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(AdvocateTab));
