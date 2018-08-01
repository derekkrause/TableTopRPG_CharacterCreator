import React from "react";
import {
  postSportPosition,
  getAllSportPosition,
  putSportPostion,
  deleteSportPosition
} from "../../../../services/sportPosition.service";
// import SportPositionForm from "./sportPositionForm";
import SportPositionTable from "./SportPositionTable.js";

class SportPosition extends React.Component {
  state = {
    sportId: "",
    code: "",
    name: "",
    inactive: false,
    collapsed: true
  };

  handleChangeAdd = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheck = e => {
    this.setState({ inactive: e.target.checked });
  };

  handleSubmit = () => {};

  handleExpandPosition = sportPosition => {
    this.state;
  };

  handleUpdateClick = () => {};

  handleEditClick = sportPositionInfo => {
    this.setState({
      id: sportPositionInfo.id,
      sportId: sportPositionInfo.sportId,
      code: sportPositionInfo.code,
      name: sportPositionInfo.name,
      inactive: sportPositionInfo.inactive
    });
  };

  handleDeleteClick = sportPositionInfo => {
    deleteSportPosition(sportPositionInfo.Id);
  };

  handleAddPosition = () => {
    this.setState({
      showAddForm: true
    });
  };

  render() {
    return (
      <div>
        <SportPositionTable
          handleCollapseAll={this.props.handleCollapseAll}
          handleDeleteClick={this.handleDeleteClick}
          handleAddPosition={this.handleAddPosition}
          handleUpdateClick={this.handleUpdateClick}
          handleEditClick={this.handleEditClick}
          handleChangeAdd={this.handleChangeAdd}
          handleCheck={this.handleCheck}
          code={this.state.code}
          name={this.state.name}
          inactive={this.state.inactive}
          sportId={this.state.sportId}
          updateSportsDataPositions={this.props.updateSportsDataPositions}
          sportsData={this.props.sportsData}
        />
      </div>
    );
  }
}

export default SportPosition;
