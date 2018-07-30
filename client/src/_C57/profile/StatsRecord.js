import React from "react";
import { Input } from "reactstrap";

import "./profileCard.css";

class StatsRecord extends React.Component {
  state = {
    editMode: false
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
  };

  render() {
    return (
      <div>
        <p className="profileCardTextArea">
          {this.state.editMode === false ? (
            <a onClick={this.editField}>{this.props.stats}</a>
          ) : (
            <Input
              className="w-100 h-100 profileCardTextArea"
              type="textarea"
              name="stats"
              placeholder="This area is for you to display information pertinent to your stats and records."
              autoFocus
              value={this.props.stats}
              onChange={this.props.handleChange}
              onBlur={this.editField}
            />
          )}
        </p>
        {this.state.editMode === false ? (
          <button className="float-right profileCardButtonOpacity" type="button" onClick={this.editField}>
            Edit
          </button>
        ) : (
          <button className="float-right" type="button" onClick={this.editField}>
            Save
          </button>
        )}
      </div>
    );
  }
}

export default StatsRecord;
