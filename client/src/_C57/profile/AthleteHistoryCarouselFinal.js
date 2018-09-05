import React, { Component } from "react";
import "./ProfileBanner.css";
import { connect } from "react-redux";
import { getAthleteInfoById, deleteSportHistory } from "./AddSportHistory/AddSportService";
import AthleteSportHistoryCard from "./AthleteSportHistoryCard";
import "./AthleteHistoryCarousel.css";
import AthleteTeamPopover from "../CustomComponents/Popover/AthleteTeamPopover";
import AddSportHistory from "./AddSportHistory/AddSportHistory";
import SweetAlert from "react-bootstrap-sweetalert";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

class AthleteHistoryCarouselFinal extends React.Component {
  state = { activeIndex: 0, athleteHistory: [], items: [], editMode: false, modal: false, alert: null };

  componentDidMount() {
    this.getAthleteSportInfo();
  }

  getAthleteSportInfo = () => {
    getAthleteInfoById(this.props.currentPageId).then(res => {
      const itemArray = [];
      res.data.items.map(ash => {
        let ashInfo = {
          key: ash.id,
          classYear: ash.classYear,
          classYearId: ash.classYearId,
          clubName: ash.clubName,
          comments: ash.comments,
          schoolName: ash.schoolName,
          schoolId: ash.schoolId,
          selectedOption: ash.selectedSchoolClubOrTeam,
          sportId: ash.sportId,
          sportLevel: ash.sportLevel,
          sportLevelId: ash.sportLevelId,
          sportName: ash.sportName,
          sportPositions: ash.sportPositionIds,
          teamName: ash.teamName,
          userId: ash.userId,
          id: ash.id
        };
        itemArray.push(ashInfo);
      });
      this.setState({
        items: itemArray
      });
    });
  };

  deleteAthleteTeamNotification = () => {
    NotificationManager.error("Sport History Entry Deleted!", "Delete", 5000);
  };

  createAthleteTeamNotification = () => {
    NotificationManager.success("Sport History Entry Created!", "Great!", 5000);
  };

  createAthleteTeamNotificationError = () => {
    NotificationManager.error("Please check fields and try again.", "Unable to Create!", 5000);
  };

  updateAthleteTeamNotificationError = () => {
    NotificationManager.error("Please check fields and try again.", "Unable to Update!", 5000);
  };

  onDeleteConfirm = () => {
    const teamNameId = this.state.items[this.state.activeIndex].id;

    deleteSportHistory(teamNameId)
      .then(res => {
        console.log(res, "deleted");
        this.getAthleteSportInfo();
        this.cancelAlert();
        this.setState({ activeIndex: 0 });
        this.deleteAthleteTeamNotification();
      })
      .catch(res => console.log(res, "not deleted"));
  };

  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to delete?`}
        onConfirm={this.onDeleteConfirm} //what function you want on confirm
        onCancel={this.cancelAlert} //what function you want on cancel
      />
    );
    this.setState({ alert: getAlert() });
  };

  cancelAlert = () => {
    this.setState({
      alert: null
    });
  };

  popoverRef = React.createRef();

  onEditClick = () => {
    this.setState({ editMode: true });
    //NotificationManager.info("Update info, or cancel", "Edit Sport History!", 3000);
  };

  onEditCancel = () => {
    this.setState({ editMode: false });
    this.popoverRef.current.scrollIntoView({ block: "center", behavior: "instant" });
  };

  next = () => {
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  onAddNewToggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  render = () => {
    const { activeIndex } = this.state;
    const { currentPageId } = this.props;
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="" ref={this.popoverRef}>
          {!this.state.editMode ? (
            <React.Fragment>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Athlete History</h3>

                {this.props.currentUser.id == currentPageId ? (
                  <AthleteTeamPopover
                    items={this.state.items}
                    onDelete={this.delete}
                    onEditClick={this.onEditClick}
                    onAddNewToggle={this.onAddNewToggle}
                    popover={"AthleteTeam"}
                  />
                ) : (
                  <div />
                )}
              </div>
            </React.Fragment>
          ) : (
            <div>
              <h2>Edit Sport History</h2>
            </div>
          )}
        </div>
        <AddSportHistory
          modal={this.state.modal}
          onAddNewToggle={this.onAddNewToggle}
          getAthleteSportInfo={this.getAthleteSportInfo}
          createAthleteTeamNotification={this.createAthleteTeamNotification}
          createAthleteTeamNotificationError={this.createAthleteTeamNotificationError}
        />
        <div className="carousel-inner rs-history-container">
          {this.state.items[0] ? (
            this.state.items.map((item, index) => (
              <div key={item.id} className={index === activeIndex ? "carousel-item active" : "carousel-item"}>
                <AthleteSportHistoryCard
                  athleteTeamInfo={item}
                  index={index}
                  onEditCancel={this.onEditCancel}
                  editMode={this.state.editMode}
                  activeIndex={this.state.activeIndex}
                  getAthleteSportInfo={this.getAthleteSportInfo}
                  updateAthleteTeamNotificationError={this.updateAthleteTeamNotificationError}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No Athlete History</div>
          )}
          {!this.state.editMode && this.state.items.length > 1 ? (
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-items-center">
                <button className="btn rs-btn-primary-light" direction="prev" onClick={this.previous}>
                  <i className="zmdi zmdi-chevron-left zmdi-hc-lg" /> &nbsp;Prev
                </button>
              </div>
              <div className="d-flex justify-items-center">
                <button className="btn rs-btn-primary-light" direction="next" onClick={this.next}>
                  Next &nbsp;
                  <i className="zmdi zmdi-chevron-right zmdi-hc-lg" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.alert}
      </React.Fragment>
    );
  };
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(AthleteHistoryCarouselFinal);
