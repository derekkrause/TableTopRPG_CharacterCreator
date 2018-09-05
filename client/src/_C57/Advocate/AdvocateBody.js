import React from "react";
import "./AdvocateStyle.css";
import { Button, Input } from "reactstrap";
import { getAdvoAthletesById, updateAdvocate } from "./AdvocateServer";
import AdvoAthlete from "./AdvoAthlete";
import AdvocateProfilePopover from "../CustomComponents/Popover/AdvocateProfilePopver";
import { SaveProfileButton, CancelButton } from "../CustomComponents/Button";

class AdvocateBody extends React.Component {
  state = {
    viewTable: false,
    advoAthleteArr: [],
    editText: false
  };

  tableToggle = () => {
    if (this.state.viewTable) {
      this.setState({
        viewTable: false
      });
    } else {
      getAdvoAthletesById()
        .then(response => {
          console.log(response, "Get All advoAthletes");
          this.setState({
            advoAthleteArr: response.data.item.pagedItems
          });
        })
        .catch(error => {
          console.log(error, "Error");
        });
      this.setState({
        viewTable: true
      });
    }
  };

  editField = () => {
    this.setState({ editText: !this.state.editText });
  };

  editBody = payload => {
    if (this.state.editText) {
      updateAdvocate(payload)
        .then(response => {
          console.log(response, "Updated");
          this.setState({
            editText: false
          });
        })
        .catch(error => {
          console.log(error, "Error");
        });
    } else {
      this.setState({
        editText: true
      });
    }
  };

  onEditCancelClick = () => {
    this.setState({
      editText: !this.state.editText
    });
  };

  render() {
    const { currentProfile } = this.props;
    const { editText } = this.state;
    return (
      <div>
        <div className="bio">
          <div className="col-12 text-right p-0" id="profileBioEdit">
            {this.props.currentUser.id == currentProfile && editText === false ? (
              <AdvocateProfilePopover handleUpdate={this.editField} popover="profileBioEdit" />
            ) : (
              <div />
            )}
          </div>
          {editText ? (
            <div>
              <Input
                type="textarea"
                rows="4"
                cols="99"
                name="shortBio"
                style={{ fontSize: "15px" }}
                value={this.props.advocateUser.shortBio || ""}
                onChange={this.props.editInput}
              />
              <div className="col-12 text-right mt-4">
                <CancelButton onClick={this.onEditCancelClick} />
                <SaveProfileButton onClick={() => this.editBody(this.props.advocateUser)} />
              </div>
            </div>
          ) : (
            <div>
              <p className="aboutInfo">{this.props.advocateUser.shortBio}</p>
              <div className="col-12 text-right pr-0">
                <Button color="btn btn-primary tableBtn AdvocateStyle" onClick={() => this.tableToggle()}>
                  Advocated Athletes...
                </Button>
              </div>
            </div>
          )}
        </div>
        {this.state.viewTable && (
          <AdvoAthlete
            key={JSON.stringify(this.state.advoAthleteArr)}
            advoAthleteArr={this.state.advoAthleteArr}
            advocateUserId={this.props.advocateUserId}
          />
        )}
      </div>
    );
  }
}

export default AdvocateBody;
