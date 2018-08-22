import React from "react";
import { Input } from "reactstrap";
import "./profileCard.css";
import { SaveButton, CancelButton } from "../CustomComponents/Button";
import Popover from "../CustomComponents/Popover";

class ProfileBio extends React.Component {
  state = {
    editBio: false
  };

  handleEditBio = () => {
    this.setState({
      editBio: !this.state.editBio
    });
  };

  handleBioSaveProfile = () => {
    this.setState({
      editBio: false
    });
    this.props.handleSaveProfile();
  };

  render() {
    return (
      <div className="ml-2">
        <div className="row home-center-text">
          <div className="pl-3 col-md-9">
            <h2 className="mb-0">Bio</h2>
          </div>
          <div className="col-md-3 text-right">
            <Popover popover={this.props.popover} handleUpdate={this.handleEditBio} />
          </div>
        </div>
        {this.state.editBio === false ? (
          <a onClick={this.handleEditBio}>{this.props.bio}</a>
        ) : (
          <React.Fragment>
            <Input
              className="w-100 h-100 profileCardTextArea"
              type="textarea"
              name="bio"
              placeholder="Your bio goes here."
              rows="10"
              autoFocus
              value={this.props.bio}
              onChange={this.props.handleChange}
            />
            <div className="row">
              <div className="col-md-12 text-right pt-3">
                <CancelButton type="button" className="text-right" onClick={this.props.handleEditAcademics} />
                <SaveButton type="button" className="text-right" onClick={this.handleBioSaveProfile} />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ProfileBio;
