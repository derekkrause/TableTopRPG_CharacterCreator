import React from "react";
import { CardBody } from "reactstrap";
import ProfileCalendar from "../profile/ProfileCalendar";
import EventModal from "../profile/EventModal";
import GameModal from "./GameModal";
import CalendarModal from "../profile/CalendarModal";
import { getEventsByUserId, getEventById } from "../profile/ProfileServer";
import "../profile/ProfileBanner.css";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import { getAllTeams } from "./AdvocateServer";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
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
    value: 0,
    events: [],
    showModal: false,
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
    getEventsByUserId(45).then(response => {
      //------change to current user from Redux
      console.log("GET events", response);
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
    });
  }

  getTeams = () => {
    getAllTeams()
      .then(response => {
        console.log(response, "Get All Teams");
        this.setState({
          teams: response.data.item.pagedItems
        });
      })
      .catch(error => {
        console.log(error, "Error");
      });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="white" style={{ boxShadow: "none" }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Schedule" />
            <Tab label="Teams" onClick={this.getTeams} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {" "}
            <CardBody>
              <div className="row">
                <div className="col-md-1">
                  <EventModal />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <CalendarModal showModal={this.state.showModal} toggle={this.toggle} {...this.state} />
                  <div style={{ overflow: "auto" }}>
                    <ProfileCalendar handleDoubleClickEvent={this.handleDoubleClickEvent} events={this.state.events} />
                  </div>
                </div>
              </div>
            </CardBody>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {" "}
            <CardBody>
              <div className="row">
                {/* <div className="col-md-1"> */}
                  <GameModal
                    key={this.state.teams}
                    teams={this.state.teams}
                    advocateUserId={this.props.advocateUserId}
                  />
                {/* </div> */}
              </div>
              <div className="mt-2">
                <div className="col-md-8">
                  <CalendarModal showModal={this.state.showModal} toggle={this.toggle} {...this.state} />
                  <div style={{ overflow: "auto" }}>
                    <ProfileCalendar handleDoubleClickEvent={this.handleDoubleClickEvent} events={this.state.events} />
                  </div>
                </div>
              </div>
            </CardBody>
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
