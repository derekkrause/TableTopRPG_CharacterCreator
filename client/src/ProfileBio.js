import React from "react";

class ProfileBio extends React.Component {
  state = {
    bio: "Enter your bio here. Click to edit!",
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
        <h2 className="mt-2">Bio</h2>
        <p className="statsRecordTextArea">
          {this.state.editMode === false ? (
            <a onClick={this.editField}>{this.state.bio}</a>
          ) : (
            <textarea
              className="w-100 h-100 profileCardTextArea"
              type="text"
              name="stats"
              placeholder="Your bio goes here."
              autoFocus
              value={this.state.bio}
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

export default ProfileBio;
