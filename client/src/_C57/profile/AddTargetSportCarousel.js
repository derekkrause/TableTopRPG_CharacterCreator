import React, { Component } from "react";
import "./ProfileBanner.css";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import {
  putAthleteTargetSport,
  getAthleteTargetSportById,
  postAthleteTargetSport,
  deleteAthleteTargetSport
} from "../../services/athleteTargetSport.service";
import AddTargetSportContainer from "./AddTargetSportContainer";
import AddTargetSportCard from "./AddTargetSportCard";
import AthleteTargetSportPopover from "../CustomComponents/Popover/AthleteTargetSportPopover";

class AddTargetSportCarousel extends React.Component {
  state = { activeIndex: 0, items: [], editMode: false, modal: false, alert: null };

  componentDidMount() {
    this.getTargetSportInfo();
  }

  getTargetSportInfo = () => {
    getAthleteTargetSportById(this.props.currentPageId).then(res => {
      const itemArray = [];
      if (res.data.item.athleteTargetInfo) {
        res.data.item.athleteTargetInfo.map(ats => {
          let atsInfo = {
            key: ats.Id,
            sportId: ats.SportId,
            sportName: ats.SportName,
            sportPositions: ats.SportPositionInfo,
            id: ats.Id
          };
          itemArray.push(atsInfo);
        });
        this.setState({
          items: itemArray
        });
      } else {
        this.setState({
          items: ""
        });
      }
    });
  };

  deleteTargetSportNotification = () => {
    {
      NotificationManager.error("Target Sport Entry Deleted!", "Delete", 5000);
    }
  };

  createTargetSportNotification = () => {
    NotificationManager.success("Target Sport Entry Created!", "Great!", 5000);
  };

  createTargetSportNotificationError = () => {
    NotificationManager.error("Please check fields and try again.", "Unable to Create!", 5000);
  };

  updateTargetSportNotificationError = () => {
    NotificationManager.error("Please check fields and try again.", "Unable to Update!", 5000);
  };

  cancelAlert = () => {
    this.setState({
      alert: null
    });
  };

  popoverRef = React.createRef();

  onDeleteConfirm = () => {
    const teamNameId = this.state.items[this.state.activeIndex].id;
    deleteAthleteTargetSport(teamNameId)
      .then(res => {
        this.getTargetSportInfo();
        this.cancelAlert();
        this.setState({ activeIndex: 0 });
        this.deleteTargetSportNotification();
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

  onEditClick = () => {
    this.setState({ editMode: true });
    NotificationManager.info("Update info, or cancel", "Edit Sport History!", 3000);
  };

  onEditCancel = () => {
    this.setState({ editMode: false });
    /*  this.popoverRef.current.scrollIntoView({ block: "center", behavior: "instant" }); */
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
    const { currentPageId, dropdownOptions, currentUser } = this.props;
    return (
      <React.Fragment>
        <div className="col-md-12 text-right" ref={this.popoverRef}>
          {!this.state.editMode ? (
            currentUser.id == currentPageId ? (
              <AthleteTargetSportPopover
                items={this.state.items}
                onDelete={this.delete}
                onEditClick={this.onEditClick}
                onAddNewToggle={this.onAddNewToggle}
                popover={"TargetSport"}
                currentUser={currentUser}
              />
            ) : (
              <div />
            )
          ) : (
            <div />
          )}
        </div>
        <AddTargetSportContainer
          modal={this.state.modal}
          onAddNewToggle={this.onAddNewToggle}
          getTargetSportInfo={this.getTargetSportInfo}
          createTargetSportNotification={this.createTargetSportNotification}
          createTargetSportNotificationError={this.createTargetSportNotificationError}
          dropdownOptions={dropdownOptions}
          currentUser={currentUser}
          getTargetSportInfo={this.getTargetSportInfo}
        />
        <div className="carousel-inner">
          {this.state.items
            ? currentUser.id == currentPageId
              ? this.state.items.map((item, index) => {
                  return (
                    <div key={item.key} className={index === activeIndex ? "carousel-item active" : "carousel-item"}>
                      <AddTargetSportCard
                        key={JSON.stringify(item)}
                        targetSportInfo={item}
                        index={index}
                        dropdownOptions={dropdownOptions}
                        currentPageId={currentPageId}
                        editMode={this.state.editMode}
                        onEditCancel={this.onEditCancel}
                        activeIndex={this.state.activeIndex}
                        currentUser={currentUser}
                        getTargetSportInfo={this.getTargetSportInfo}
                        updateTargetSportNotificationError={this.updateTargetSportNotificationError}
                      />
                    </div>
                  );
                })
              : this.state.items
                  .filter(item => item.sportId == this.props.searchCriteria.sportFilter)
                  .map((item, index) => {
                    return (
                      <div key={item.key} className="mt-4">
                        <AddTargetSportCard
                          key={JSON.stringify(item)}
                          targetSportInfo={item}
                          index={index}
                          dropdownOptions={dropdownOptions}
                          currentPageId={currentPageId}
                          editMode={this.state.editMode}
                          onEditCancel={this.onEditCancel}
                          currentUser={currentUser}
                          getTargetSportInfo={this.getTargetSportInfo}
                          updateTargetSportNotificationError={this.updateTargetSportNotificationError}
                        />
                      </div>
                    );
                  })
            : null}
          {this.state.items.length < 1 ? (
            <div className="text-center">This athlete has no matching target sport information.</div>
          ) : null}
          {currentUser.id == currentPageId && !this.state.editMode && this.state.items.length > 1 ? (
            <div className="d-flex justify-content-between mt-3 px-3">
              <div>
                <button className="btn btn-primary" direction="prev" onClick={this.previous}>
                  Prev
                </button>
              </div>
              <div>
                <button className="btn btn-primary" direction="next" onClick={this.next}>
                  Next
                </button>
              </div>
            </div>
          ) : null}
          {this.state.alert}
          <NotificationContainer />
        </div>
      </React.Fragment>
    );
  };
}

function mapStateToProps({ dropdownOptions, currentUser, searchCriteria }) {
  return {
    dropdownOptions: dropdownOptions,
    currentUser: currentUser,
    searchCriteria: searchCriteria
  };
}
export default connect(mapStateToProps)(AddTargetSportCarousel);
