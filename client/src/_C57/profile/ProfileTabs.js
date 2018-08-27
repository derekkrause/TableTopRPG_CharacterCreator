import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardHeader, CardBody } from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ProfileCalendar from "./ProfileCalendar";
import ProfileImages from "./ProfileImages";
import EventModal from "./EventModal";
import CalendarModal from "./CalendarModal";
import FileUploader from "../FileUploader/FileUploader";
import { getEventsByUserId, getBlogsByUserId, getMediaByUserId, getPostsByUserId, getEventById } from "./ProfileServer";
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

class ProfileTabs extends React.Component {
  state = {
    value: 0,

    events: [],
    images: [],
    showModal: false,
    showImgModal: false,
    selectedImg: null,

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
    eventTypeItem: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  toggleImgModal = imgIndex => {
    this.setState({
      selectedImg: imgIndex,
      showImgModal: !this.state.showImgModal
    });
  };

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
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

  handleDoubleClickEvent = event => {
    getEventById(event.id).then(response => {
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

    getFeed().then(response => {
      let imageTileArray = [];
      response.data.item.pagedItems.map(image => {
        if (image.imageUrl.length > 0) {
          let imageTile = {
            type: "image",
            img: image.imageUrl[0],
            title: image.title,
            content: image.content,
            author: image.firstName + " " + image.lastName,
            id: image.id
          };
          imageTileArray.push(imageTile);
        } else if (image.videoUrl.length > 0) {
          let imageTile = {
            type: "video",
            img: image.videoUrl[0],
            title: image.title,
            content: image.content,
            author: image.firstName + " " + image.lastName,
            id: image.id
          };
          imageTileArray.push(imageTile);
        }
      });

      this.setState({
        images: imageTileArray
      });
    });

    //   getMediaByUserId().then(response => {
    //     console.log("GET", response);
    //   });
    //   getPostsByUserId().then(response => {
    //     console.log("GET", response);
    //   });
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" style={{ boxShadow: "none" }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Feed" />

            <Tab label="Schedule" />

            <Tab label="Photos/Videos" />
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
                <div className="col-md-2" />
                <div className="col-md-8">
                  <Feed />
                </div>
                <div className="col-md-2" />
              </div>
            </CardBody>
          </TabContainer>
          {/* <TabContainer dir={theme.direction}>
              <CardBody>
                <StatsRecord handleChange={this.props.handleChange} stats={this.props.stats} />
              </CardBody>
          </TabContainer> */}
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
          {/* <TabContainer dir={theme.direction}>
              <CardBody>
                <AcademicTable
                  handleChange={this.props.handleChange}
                  gpa={this.props.gpa}
                  sat={this.props.sat}
                  act={this.props.act}
                  desiredMajor={this.props.desiredMajor}
                />
              </CardBody>
          </TabContainer> */}
          <TabContainer dir={theme.direction}>
            {" "}
            <CardBody>
              <div className="row">
                <div className="col-md-1">
                  <FileUploader />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ProfileImages
                    images={this.state.images}
                    togglePopover={this.togglePopover}
                    showPopover={this.state.showPopover}
                    toggleImgModal={this.toggleImgModal}
                  />
                  {this.state.showImgModal && (
                    <ImageModal
                      showImgModal={this.state.showImgModal}
                      toggleImgModal={this.toggleImgModal}
                      className={this.props.className}
                      images={this.state.images}
                      selectedImg={this.state.selectedImg}
                      nextImg={this.nextImg}
                      prevImg={this.prevImg}
                      changeProfilePic={this.props.changeProfilePic}
                    />
                  )}
                </div>
              </div>
            </CardBody>
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

// {/* <CardHeader className="bg-primary">
// <Nav className="nav-fill card-header-tabs" tabs>
//   <NavItem>
//     <NavLink
//       className={this.state.activeTab === "1" ? "active" : ""}
//       onClick={() => {
//         this.setState({ activeTab: "1" });
//       }}
//     >
//       Feed
//     </NavLink>
//   </NavItem>
//   <NavItem>
//     <NavLink
//       className={this.state.activeTab === "2" ? "active" : ""}
//       onClick={() => {
//         this.setState({ activeTab: "2" });
//       }}
//     >
//       Stats/Record
//     </NavLink>
//   </NavItem>
//   <NavItem>
//     <NavLink
//       className={this.state.activeTab === "3" ? "active" : ""}
//       onClick={() => {
//         this.setState({ activeTab: "3" });
//       }}
//     >
//       Schedule
//     </NavLink>
//   </NavItem>
//   <NavItem>
//     <NavLink
//       className={this.state.activeTab === "4" ? "active" : ""}
//       onClick={() => {
//         this.setState({ activeTab: "4" });
//       }}
//     >
//       Academics
//     </NavLink>
//   </NavItem>
//   <NavItem>
//     <NavLink
//       className={this.state.activeTab === "5" ? "active" : ""}
//       onClick={() => {
//         this.setState({ activeTab: "5" });
//       }}
//     >
//       Photos/Videos
//     </NavLink>
//   </NavItem>
// </Nav>
// </CardHeader>

// <TabContent activeTab={this.state.activeTab}>
// <TabPane tabId="1">
//   <CardBody>
//     <Feed />
//   </CardBody>
// </TabPane>

// <TabPane tabId="2">
//   <CardBody>
//     <StatsRecord handleChange={this.props.handleChange} stats={this.props.stats} />
//   </CardBody>
// </TabPane>

// <TabPane tabId="3">
//   <CardBody>
//     {/* <button
//       type="button"
//       className="btn btn-primary float-left"
//       id=""
//     >
//       + Add New Event
//     </button> */}
//     <div className="row">
//       <div className="col-md-1">
//         <EventModal />
//       </div>
//     </div>
//     <div className="row mt-4">
//       <div className="col-md-12">
//         <ProfileCalendar />
//       </div>
//     </div>
//   </CardBody>
// </TabPane>
// <TabPane tabId="4">
//   <CardBody>
//     <AcademicTable
//       handleChange={this.props.handleChange}
//       gpa={this.props.gpa}
//       sat={this.props.sat}
//       act={this.props.act}
//       desiredMajor={this.props.desiredMajor}
//     />
//   </CardBody>
// </TabPane>
// <TabPane tabId="5">
//   <CardBody>
//     <h3 className="card-title">This is where your media stuff goes</h3>
//     <div className="row">
//       <div className="col-md-12">
//         <ProfileImages />
//       </div>
//     </div>
//   </CardBody>
// </TabPane>
// </TabContent> */}
