import React from "react";
import "./profileCard.css";

class StatsRecord extends React.Component {
  state = {
    stats: "",
    editMode: false
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  render() {
    return (
      <div>
        <p className="statsRecordTextArea">
          {this.state.editMode === false ? (
            <a onClick={this.editField}>{this.state.stats}</a>
          ) : (
            <textarea
              className="w-100 h-100 profileCardTextArea"
              type="text"
              name="stats"
              autoFocus
              value={this.state.stats}
              onChange={this.handleChange}
              onBlur={this.editField}
            />
          )}
        </p>
        {this.state.editMode === false ? (
          <button
            className="float-right profileCardButtonOpacity"
            type="button"
            onClick={this.editField}
          >
            Edit
          </button>
        ) : (
          <button
            className="float-right"
            type="button"
            onClick={this.editField}
          >
            Save
          </button>
        )}
      </div>
    );
  }
}

export default StatsRecord;
