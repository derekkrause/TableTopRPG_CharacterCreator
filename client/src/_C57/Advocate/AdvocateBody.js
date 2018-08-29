import React from "react";
import "./AdvocateStyle.css";
import { Button, Input } from "reactstrap";

class AdvocateBody extends React.Component {
  render() {
    return (
      <div>
        <div className="bio AdvocateStyle">
          <h3 className="about AdvocateStyle">About Me </h3>
          {this.props.editState ? (
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
              <Button color="btn btn-primary float-right AdvocateStyle" onClick={() => this.props.tableToggle()}>
                Advocated Athletes...
              </Button>
            </div>
          ) : (
            <div>
              <p className="aboutInfo AdvocateStyle">{this.props.advocateUser.shortBio}</p>
              <Button
                color="btn btn-primary tableBtn float-right AdvocateStyle"
                onClick={() => this.props.tableToggle()}
              >
                Advocated Athletes...
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AdvocateBody;
