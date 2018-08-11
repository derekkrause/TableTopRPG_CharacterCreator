import React from "react";
import AddSportModal from "./AddSportModal";
import { connect } from "react-redux";
import { postAthleteSport } from "./AddSportService";

class AddSportHistory extends React.Component {
  state = {
    sportId: "",
    classYearId: "",
    sportPositionId: [],
    clubName: "",
    schoolNameId: "",
    teamName: "",
    comments: "",
    selectedOption: "",
    sportLevelId: ""
  };

  onHandleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };
  q;

  onSportPositionIdChange = sportPositionIds => {
    this.setState({ sportPositionId: sportPositionIds });
    console.log("WOAHHHH");
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  onHandleSchoolSelect = id => {
    this.setState({ schoolNameId: id });
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
      schoolNameId: this.state.selectedOption == 1 ? this.state.schoolNameId : null,
      clubName: this.state.selectedOption == 2 ? this.state.clubName : null,
      teamName: this.state.selectedOption == 3 ? this.state.teamName : null
    };
    console.log(sportInfo);
    postAthleteSport(sportInfo);
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
                schoolNameId={this.state.schoolNameId}
                teamName={this.state.teamName}
                comments={this.state.comments}
                selectedOption={this.state.selectedOption}
                sportLevelId={this.state.sportLevelId}
                handleOptionChange={this.handleOptionChange}
                onHandleChange={this.onHandleChange}
                onSportPositionIdChange={this.onSportPositionIdChange}
                onSubmitSport={this.onSubmitSport}
                onHandleSchoolSelect={this.onHandleSchoolSelect}
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
