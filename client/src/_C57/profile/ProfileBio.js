import React from "react";
import { Input } from "reactstrap";
import "./ProfileCard.css";

class ProfileBio extends React.Component {
  state = {
    editMode: false
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
  };

  render() {
    return (
      <div className="ml-2">
        <h1 className="mt-2">Bio</h1>
        <p className="profileCardTextArea">
          {this.state.editMode === false ? (
            <a onClick={this.editField}>{this.props.bio}</a>
          ) : (
            <Input
              className="w-100 h-100 profileCardTextArea"
              type="textarea"
              name="bio"
              placeholder="Your bio goes here."
              rows="10"
              autoFocus
              value={this.props.bio}
              onChange={this.props.handleChange}
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
