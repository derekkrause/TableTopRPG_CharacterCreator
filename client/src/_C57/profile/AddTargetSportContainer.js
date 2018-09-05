import React from "react";
import AddTargetSportModal from "./AddTargetSportModal";
import { postAthleteTargetSport } from "../../services/athleteTargetSport.service";

class AddTargetSportContainer extends React.Component {
  state = {
    sportId: "",
    sportPositionId: []
  };

  onHandleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  onSportPositionIdChange = sportPositionIds => {
    this.setState({ sportPositionId: sportPositionIds });
  };

  resetInitialState = () => {
    this.setState({
      sportId: "",
      sportPositionId: []
    });
  };

  onSaveClick = () => {
    if (this.state.sportPositionId && this.state.sportId) {
      let sportPositionArray = this.state.sportPositionId.map(position => {
        return position.id;
      });
      const sportInfo = {
        userId: this.props.currentUser.id,
        sportId: parseInt(this.state.sportId),
        sportPositionIdJson: JSON.stringify(sportPositionArray),
        preferenceOrder: 1
      };
      postAthleteTargetSport(sportInfo)
        .then(res => {
          console.log(res, "create success");
          this.props.createTargetSportNotification();
          this.props.onAddNewToggle();
          this.props.getTargetSportInfo();
          this.resetInitialState();
        })
        .catch(res => {
          console.log(res, "create error");
          this.props.createTargetSportNotificationError();
        });
    } else {
      this.props.createTargetSportNotificationError();
    }
  };

  render() {
    return (
      <div className="target-sport-container text-center">
        <div className="row">
          <div className="col-12">
            <form className="form-container">
              <AddTargetSportModal
                modal={this.props.modal}
                dropdownOptions={this.props.dropdownOptions}
                onAddNewToggle={this.props.onAddNewToggle}
                onHandleChange={this.onHandleChange}
                onSportPositionIdChange={this.onSportPositionIdChange}
                onSaveClick={this.onSaveClick}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTargetSportContainer;
