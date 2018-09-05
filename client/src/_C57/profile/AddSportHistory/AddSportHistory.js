import React from "react";
import AddSportModal from "./AddSportModal";
import { connect } from "react-redux";
import { postAthleteSport, getAthleteInfoById } from "./AddSportService";
import AthleteSportHistoryCard from "../AthleteSportHistoryCard";

class AddSportHistory extends React.Component {
  state = {
    sportId: "",
    classYearId: "",
    sportPositionId: [],
    clubName: "",
    schoolId: "",
    teamName: "",
    comments: "",
    selectedOption: "",
    sportLevelId: ""
  };

  componentDidMount() {
    // getAthleteInfoById(0, 5, this.props.currentUser.id).then(res => {
    //   console.log(res);
    // });
  }

  onHandleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  onSportPositionIdChange = sportPositionIds => {
    this.setState({ sportPositionId: sportPositionIds });
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  onHandleSchoolSelect = id => {
    this.setState({ schoolId: id });
  };

  resetInitialState = () => {
    this.setState({
      sportId: "",
      classYearId: "",
      sportPositionId: [],
      clubName: "",
      schoolId: "",
      teamName: "",
      comments: "",
      selectedOption: "",
      sportLevelId: ""
    });
  };

  onSubmitSport = () => {
    console.log("CLICKED");
    console.log([...this.state.sportPositionId]);
    let sportPositionArray = [...this.state.sportPositionId].map(sport => {
      return sport.id;
    });
    const sportInfo = {
      userId: this.props.currentUser.id,
      sportId: this.state.sportId,
      classYearId: this.state.classYearId,
      sportPositionId: sportPositionArray,
      comments: this.state.comments,
      sportLevelId: this.state.sportLevelId,
      selectedSchoolClubOrTeam: this.state.selectedOption,
      schoolId: this.state.selectedOption == 1 ? this.state.schoolId : null,
      clubName: this.state.selectedOption == 2 ? this.state.clubName : null,
      teamName: this.state.selectedOption == 3 ? this.state.teamName : null
    };
    postAthleteSport(sportInfo)
      .then(res => {
        console.log(res, "create success");
        this.props.createAthleteTeamNotification();
        this.props.onAddNewToggle();
        this.props.getAthleteSportInfo();
        this.resetInitialState();
      })
      .catch(res => {
        console.log(res, "create error");
        this.props.createAthleteTeamNotificationError();
      });
  };

  render() {
    return (
      <div className="sport-history-container text-center">
        <div className="row">
          <div className="col-12">
            <form className="form-container">
              <AddSportModal
                sportId={this.state.sportId}
                classYearId={this.state.classYearId}
                sportPositionId={this.state.sportPositionId}
                clubName={this.state.clubName}
                schoolId={this.state.schoolId}
                teamName={this.state.teamName}
                comments={this.state.comments}
                selectedOption={this.state.selectedOption}
                sportLevelId={this.state.sportLevelId}
                handleOptionChange={this.handleOptionChange}
                onHandleChange={this.onHandleChange}
                onSportPositionIdChange={this.onSportPositionIdChange}
                onSubmitSport={this.onSubmitSport}
                onHandleSchoolSelect={this.onHandleSchoolSelect}
                modal={this.props.modal}
                onAddNewToggle={this.props.onAddNewToggle}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(AddSportHistory);
