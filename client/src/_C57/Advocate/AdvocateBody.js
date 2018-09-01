import React from "react";
import "./AdvocateStyle.css";
import { Button, Input } from "reactstrap";
import { getAdvoAthletesById } from "./AdvocateServer";
import AdvoAthlete from "./AdvoAthlete";

class AdvocateBody extends React.Component {
  state = {
    viewTable: false,
    advoAthleteArr: []
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
              <Button color="btn btn-primary float-right AdvocateStyle" onClick={() => this.tableToggle()}>
                Advocated Athletes...
              </Button>
            </div>
          ) : (
            <div>
              <p className="aboutInfo AdvocateStyle">{this.props.advocateUser.shortBio}</p>
              <Button color="btn btn-primary tableBtn float-right AdvocateStyle" onClick={() => this.tableToggle()}>
                Advocated Athletes...
              </Button>
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
