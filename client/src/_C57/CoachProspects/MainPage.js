import React from "react";
//import { SortableElement, SortableHandle } from "react-sortable-hoc";
import Card from "./Card";
const update = require("immutability-helper");
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Tags from "./Tags";
import ActivitiesModal from "./ActivitiesModal";

import SweetAlert from "react-bootstrap-sweetalert";
import { handleChange } from "../FaqPage/utilities";
import {
  getCoachAthleteById,
  getCoachTagsById,
  postCoachTags,
  deleteCoachTags,
  postCoachAthleteTag,
  updateAthleteSchool,
  deleteCoachAthlete,
  getCoachLogById,
  postCoachLog,
  deleteCoachLog,
  updateCoachLog,
  postCoachAthlete,
  updateCoachAthlete
} from "./server";
import { connect } from "react-redux";
import { compose } from "recompose";
import AddNewAthleteModal from "./AddNewAthleteModal";
import { CreateButton, CancelButton } from "../CustomComponents/Button/index";

class MainPage extends React.Component {
  state = {
    athleteSearch: "",
    athletes: [],
    tags: [],
    modal: false,
    alert: null,
    message: "",
    listEditMode: false,
    deleteAlert: null,
    deleteAthleteId: 0,
    activityName: "",
    details: "",
    responsible: 0,
    date: "",
    activitiesArray: [],
    showActivitiesError: false,
    currentIdForActivityLog: 0,
    createMode: false,
    buttonName: "Add New",
    currentSchoolLogoForActivityLog: "",
    logEditMode: false,
    currentIdForUpdate: 0,
    newAthleteModal: false,
    newAthleteId: null,
    newAthleteName: "",
    newAthleteNotes: "",
    newAthleteRank: 1,
    currentAthleteId: 0
  };

  handleDelete = this.handleDelete.bind(this);
  handleAddition = this.handleAddition.bind(this);

  handleChange = handleChange.bind(this);
  athlete;
  handleDeleteActivity = id => {
    deleteCoachLog(id).then(() => {
      getCoachLogById(this.props.currentUser.id, this.state.currentAthleteId).then(
        res =>
          res.data.item
            ? this.setState({ activitiesArray: res.data.item.activities }, () => {
                console.log(this.state.activitiesArray, "coachLog");
              })
            : null
      );
    });
  };

  handleNewAthleteId = id => {
    this.setState({ newAthleteId: id });
  };

  handleNewAthleteAddition = () => {
    const { newAthleteId, newAthleteRank, newAthleteNotes } = this.state;
    const payload = {
      UserId: this.props.currentUser.id,
      AthleteId: newAthleteId,
      Rank: 1,
      Notes: newAthleteNotes,
      Name: "Name Should Be From Search",
      Inactive: false
    };
    postCoachAthlete(payload)
      .then(res => {
        payload.Id = res.data.Id;

        this.state.athletes.push(payload);
      })
      .then(this.loadAthleteById())
      .then(this.toggleNewAthleteModal())
      .catch(err => {
        console.log(err);
      });
  };
  handleModalChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleActivityEditList = () => {
    this.setState(prevState => ({
      logEditMode: !prevState.logEditMode
    }));
  };

  resetActivityEditButton = () => {
    this.setState({
      editButton: "Edit"
    });
  };

  handleCreateMode = () => {
    this.setState(prevState => ({
      createMode: !prevState.createMode,
      buttonName: "Create"
    }));
  };

  resetCreateButton = () => {
    this.setState({
      buttonName: "Add New"
    });
  };

  submitNewActivity = () => {
    var payload = {
      UserId: this.props.currentUser.id,
      DateContacted: this.state.date,
      Notes: this.state.details,
      AthleteId: this.state.currentAthleteId,
      InitiatorId: this.state.responsible
    };
    postCoachLog(payload).then(res => {
      this.setState({
        buttonName: "Add New",
        createMode: false
      }),
        getCoachLogById(this.props.currentUser.id, this.state.currentAthleteId).then(
          res =>
            res.data.item
              ? this.setState({ activitiesArray: res.data.item.activities }, () => {
                  console.log(this.state.activitiesArray, "coachLog");
                })
              : null
        );
    });
  };

  handleActivityUpdateList = (details, date, responsible, id) => {
    this.setState({
      details: details,
      date: date.substring(0, 10),
      responsible: responsible,
      createMode: true,
      buttonName: "Save",
      currentIdForUpdate: id
    });
  };
  handleChange;

  updateActivity = id => {
    console.log(id, "Updateid");
    var payload = {
      UserId: this.props.currentUser.id,
      DateContacted: this.state.date,
      Notes: this.state.details,
      AthleteId: this.state.currentAthleteId,
      InitiatorId: this.state.responsible,
      Id: id
    };
    updateCoachLog(payload, this.props.currentUser.id).then(() => {
      this.setState({
        buttonName: "Add New",
        createMode: false,
        logEditMode: false
      });
      getCoachLogById(this.props.currentUser.id, this.state.currentAthleteId).then(
        res =>
          res.data.item
            ? this.setState({ activitiesArray: res.data.item.activities }, () => {
                console.log(this.state.activitiesArray, "coachLog");
              })
            : null
      );
    });
  };

  resetActivityForm = () => {
    this.setState({
      details: "",
      responsible: "",
      date: ""
    });
  };

  sendRankOrder = () => {
    const { athletes } = this.state;

    for (let i = 0; i < athletes.length; i++) {
      var payload = {
        Rank: i + 1,
        Notes: athletes[i].Notes,
        AthleteId: athletes[i].AthleteId
      };
      updateCoachAthlete(payload, this.props.currentUser.id).then(() => {});
    }
  };

  hideDeleteAlert = () => {
    this.setState({
      deleteAlert: null
    });
  };

  toggleNewAthleteModal = () => {
    this.setState({
      newAthleteModal: !this.state.newAthleteModal,
      newAthleteNotes: "",
      athleteSearch: ""
    });
  };

  showDeleteAlert = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, remove from my list!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={this.state.message}
        onConfirm={this.deleteAthlete}
        onCancel={this.hideDeleteAlert}
      />
    );
    this.setState({ deleteAlert: getAlert() });
  };

  showAlert = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        confirmBtnText="Okay, got it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={this.state.message}
        onConfirm={this.hideAlert}
      />
    );
    this.setState({ alert: getAlert() });
  };

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  handleNewChange = (index, name, value) => {
    const athletes = this.state.athletes.map((athlete, i) => {
      if (i === index) {
        return {
          ...athlete,
          [name]: value
        };
      } else {
        return athlete;
      }
    });
    this.setState({
      athletes
    });
  };

  handleTagsChange = (index, value, id) => {
    const tagArray = this.state.athletes[index].tags.filter(tag => tag.name == value);

    if (tagArray[0]) {
      this.setState(
        {
          message: "This tag is already on this athlete"
        },
        () => {
          this.showAlert();
        }
      );
    } else {
      const athletes = this.state.athletes.map((athlete, i) => {
        if (i === index) {
          return {
            ...athlete,
            tags: [
              ...athlete.tags,
              {
                UserId: this.props.currentUser.id,
                name: value
              }
            ]
          };
        } else {
          return athlete;
        }
      });
      this.setState({
        athletes
      });
      var payload = {
        UserId: this.props.currentUser.id,
        Tag: value,
        AthleteId: id
      };
      postCoachAthleteTag(payload);
    }
  };

  handleRemoveTag = (tagName, athlete) => {
    const athletes = this.state.athletes.map((athlete, i) => {
      if (athlete.UserId === this.props.currentUser.id && athlete.AthleteId == athlete) {
        return {
          ...athlete,
          tags: athlete.tags.filter(tag => tag.name != tagName)
        };
      } else {
        return athlete;
      }
    });
    this.setState({
      athletes
    });
  };

  moveCard = (dragIndex, hoverIndex) => {
    const { athletes } = this.state;
    const dragCard = athletes[dragIndex];

    this.setState(
      update(this.state, {
        athletes: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      }),
      () => {
        this.sendRankOrder();
      }
    );
  };

  handleDelete(i) {
    const { tags, athletes } = this.state;
    var tagName = tags[i].text;
    var canRemove = false;

    const loop = () => {
      for (let a = 0; a < athletes.length; a++) {
        for (let b = 0; b < athletes[a].tags.length; b++) {
          if (athletes[a].tags[b].name == tagName) {
            return this.setState(
              {
                message: "This tag is still being used in one of your athletes"
              },
              () => {
                this.showAlert();
              }
            );
          } else {
            canRemove = true;
          }
        }
      }
      canRemove = true;
    };
    if (canRemove == false) {
      loop();
    }

    if (canRemove == true) {
      this.setState({
        tags: tags.filter((tag, index) => index !== i)
      });
      var id = Number(tags[i].id);

      deleteCoachTags(id).then(() => {
        canRemove = false;
      });
    }
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
    var payload = {
      TagName: tag.text,
      UserId: this.props.currentUser.id
    };
    postCoachTags(payload).then(() => {});
    this.loadAthleteTagsByCoach();
  }

  handleA = id => {
    this.setState({
      message: "Remove athlete from list?",
      deleteAthleteId: id
    });
  };

  deleteAthlete = () => {
    const id = this.state.deleteAthleteId;
    deleteCoachAthlete(id).then(() => {
      this.loadAthleteById();
    });
    this.setState({
      deleteAlert: null
    });
  };

  toggleActivity = Id => {
    this.setState(
      {
        currentAthleteId: Id,
        modal: !this.state.modal
      },
      () => {
        console.log(this.state.currentAthleteId, "current athlete");
        getCoachLogById(this.props.currentUser.id, this.state.currentAthleteId).then(res => {
          {
            res.data.item
              ? this.setState({ activitiesArray: res.data.item.activities }, () => {
                  console.log(this.state.activitiesArray, "coachLog");
                })
              : this.setState({ activitiesArray: null });
          }
        });
      }
    );
  };
  school;
  athleteSearchOnChange = value => {
    this.setState({
      athleteSearch: value
    });
  };

  handleOptionChange = val => {
    console.log("option changed");
    this.setState({
      responsible: val
    });
  };

  handleActivityLogData = (name, logo) => {
    this.setState({
      activityName: name,
      activityLogo: logo
    });
  };

  loadAthleteTagsByCoach = () => {
    {
      const athleteUserId = this.props.currentUser.id;
      getCoachTagsById(athleteUserId).then(response => {
        response.data.item
          ? this.setState(
              {
                tags: response.data.item.tags
              },
              () => {
                //console.log(this.state.tags, "these are tags");
              }
            )
          : null;
      });
    }
  };

  loadAthleteById = () => {
    getCoachAthleteById(this.props.currentUser.id).then(response => {
      {
        response.data.item
          ? this.setState({
              athletes: response.data.item.athlete
            })
          : this.setState({ athletes: [] });
      }
    });
  };

  handleEditList = () => {
    this.setState(prevState => ({
      listEditMode: !prevState.listEditMode
    }));
  };

  handleDeleteAthleteId = id => {
    this.setState({ deleteAthleteId: id });
  };

  render() {
    return (
      <React.Fragment>
        <div className="app-header" />
        <div className="app-main-content">
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="col-12">
              <div className="jr-card">
                <div
                  className="jr-card-header-color d-flex  row"
                  style={{
                    marginRight: "-27px",
                    marginLeft: "-27px",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    backgroundColor: "rgb(11, 82, 119)"
                  }}
                >
                  <div className="col-9">
                    <h1 className="mb-0 text-white">
                      <span>Prospects</span>
                    </h1>
                  </div>
                  <div className="col-3 d-flex justify-content-end">
                    <CreateButton
                      className="jr-btn jr-flat-btn jr-btn-primary btn btn-default"
                      style={{
                        display: "inline-block",

                        color: "#ffffff"
                      }}
                      onClick={() => this.toggleNewAthleteModal()}
                      color="blue-grey"
                    >
                      <i className="zmdi zmdi-edit zmdi-hc-fw" />
                      <span>Add new</span>
                    </CreateButton>
                    {this.state.listEditMode ? (
                      <CancelButton
                        className="jr-btn jr-flat-btn jr-btn-primary btn btn-default"
                        style={{
                          color: "#ffffff"
                        }}
                        onClick={this.handleEditList}
                        color="blue-grey"
                      >
                        <span>Done</span>
                      </CancelButton>
                    ) : (
                      <button className="float-right btn btn-default" onClick={this.handleEditList}>
                        <i className="zmdi zmdi-delete zmdi-hc-lg mr-1" />
                        <span>Delete Players</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="jr-card-body row ">
                  <div className="table-responsive-material col-md-12">
                    <div className="contact-item-hk ripple no-gutters align-items-center py-2 px-3 py-sm-4 px-sm-6">
                      <div className="col-md-2 text-truncate px-1 d-none d-lg-flex">
                        <h3>Player</h3>
                      </div>

                      <div className="col-md-2 text-truncate px-1 d-none d-lg-flex">
                        <h3>Player info</h3>
                      </div>
                      <div className="col-md-2">
                        <h3>Notes</h3>
                      </div>
                      <div className="col-md-2">
                        <h3>Tags</h3>
                      </div>
                      <div className="col-md-2 text-truncate px-1 d-none d-lg-flex">
                        <h3>Activity Log</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col  ">
                    {this.state.athletes.map((athlete, i) => (
                      <Card
                        currentUser={this.props.currentUser.id}
                        key={athlete.Id}
                        schoolName={athlete.SchoolName}
                        index={i}
                        id={athlete.Id}
                        athleteId={athlete.AthleteId}
                        name={athlete.FirstName}
                        lastName={athlete.LastName}
                        rank={athlete.Rank}
                        city={athlete.City}
                        state={athlete.State}
                        gradYear={athlete.HighSchoolGraduationYear}
                        //division={athlete.division}
                        notes={athlete.Notes}
                        tags={this.state.tags}
                        athleteTags={athlete.tags}
                        //activityLog={athlete.activityLog}
                        moveCard={this.moveCard}
                        avatarUrl={athlete.AvatarUrl}
                        handleNewChange={this.handleNewChange}
                        handleTagsChange={this.handleTagsChange}
                        handleRemoveTag={this.handleRemoveTag}
                        toggleActivity={this.toggleActivity}
                        loadAthleteById={this.loadAthleteById}
                        listEditMode={this.state.listEditMode}
                        handleDeleteAthlete={this.handleDeleteAthleteId}
                        showDeleteAlert={this.showDeleteAlert}
                        handleActivityLogData={this.handleActivityLogData}
                        handleLogData={this.handleLogData}
                        loadAthleteById={this.loadAthleteById}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-1">
                  <div>
                    <Tags
                      tags={this.state.tags}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.alert}
          {this.state.deleteAlert}
        </div>

        {this.props.currentUser ? (
          <ActivitiesModal
            modal={this.state.modal}
            toggleActivity={this.toggleActivity}
            activityLogo={this.state.activityLogo}
            activityName={this.state.activityName}
            date={this.state.date}
            details={this.state.details}
            responsible={this.state.responsible}
            handleChange={this.handleChange}
            activitiesArray={this.state.activitiesArray}
            userProfilePic={this.props.currentUser.avatarUrl}
            showActivitiesError={this.state.showActivitiesError}
            resetActivityForm={this.resetActivityForm}
            createMode={this.state.createMode}
            handleCreateMode={this.handleCreateMode}
            buttonName={this.state.buttonName}
            submitNewActivity={this.submitNewActivity}
            handleActivityEditList={this.handleActivityEditList}
            logEditMode={this.state.logEditMode}
            handleDeleteActivity={this.handleDeleteActivity}
            handleActivityUpdateList={this.handleActivityUpdateList}
            updateActivity={this.updateActivity}
            resetCreateButton={this.resetCreateButton}
            handleOptionChange={this.handleOptionChange}
            currentUser={this.props.currentUser}
            currentAthleteId={this.state.currentAthleteId}
          />
        ) : null}
        <AddNewAthleteModal
          handleNewAthleteAddition={this.handleNewAthleteAddition}
          athleteSearch={this.athleteSearchOnChange}
          handleModalChange={this.handleModalChange}
          modal={this.state.newAthleteModal}
          toggleNewAthleteModal={this.toggleNewAthleteModal}
          athleteSearchTerm={this.state.athleteSearch}
          handleNewAthleteId={this.handleNewAthleteId}
        />
      </React.Fragment>
    );
  }

  componentDidMount() {
    {
      this.props.currentUser && this.loadAthleteById();
      this.loadAthleteTagsByCoach();
    }
  }
}
function mapStateToProps(state) {
  console.log(state, "state");
  return { currentUser: state.currentUser };
}

export default compose(
  connect(mapStateToProps),
  DragDropContext(HTML5Backend)
)(MainPage);
