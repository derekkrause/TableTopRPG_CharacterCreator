import React from "react";

class StatsRecord extends React.Component {
  state = {
    stats: "I'm an all-star",
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
        <p>
          {this.state.editMode === false && (
            <a className="" onClick={this.editField}>
              {this.state.stats}
            </a>
          )}
          {this.state.editMode === true && (
            <textarea
              rows="6"
              cols="52"
              type="text"
              name="stats"
              autoFocus
              value={this.state.stats}
              onChange={this.handleChange}
              onBlur={this.editField}
            />
          )}
        </p>
      </div>
    );
  }
}

export default StatsRecord;
