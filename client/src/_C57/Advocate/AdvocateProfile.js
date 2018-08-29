import React from "react";
import "./AdvocateStyle.css";
import AdvocateHeader from "./AdvocateHeader";
import AdvocateBody from "./AdvocateBody";
import AdvoAthlete from "./AdvoAthlete";
import AdvocateTab from "./AdvocateTab";
import { getAdvocateByUserId, updateAdvocate, getAdvoAthletesById } from "./AdvocateServer";

class AdvocateProfile extends React.Component {
  state = {
    editState: false,
    editPic: false,
    viewTable: false,
    advocateUser: {},
    advoAthleteArr: []
  };

  componentDidMount() {
    getAdvocateByUserId()
      .then(response => {
        console.log(response, "Get By AdvUser Id");
        this.setState({
          advocateUser: response.data.item
        });
      })
      .catch(error => {
        console.log(error, "Error");
      });
  }

  editMode = payload => {
    if (this.state.editState) {
      updateAdvocate(payload)
        .then(response => {
          console.log(response, "Updated");
        })
        .catch(error => {
          console.log(error, "Error");
        });
      this.setState({
        editState: false
      });
    } else {
      this.setState({
        editState: true
      });
    }
  };

  editPicture = payload => {
    if (this.state.editPic) {
      updateAdvocate(payload)
        .then(response => {
          console.log(response, "Updated");
        })
        .catch(error => {
          console.log(error, "Error");
        });
      this.setState({
        editPic: false
      });
    } else {
      this.setState({
        editPic: true
      });
    }
  };

  cancelPicture = () => {
    if (this.state.editPic) {
      this.setState({
        editPic: false
      });
    }
  };

  editInput = e => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      advocateUser: {
        ...prevState.advocateUser,
        [key]: value
      }
    }));
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

  editNotes = (e, athleteUserId) => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      advoAthleteArr: prevState.advoAthleteArr.map(a => {
        if (a.athleteUserId == athleteUserId) {
          return {
            ...a,
            [key]: value
          };
        } else {
          return a;
        }
      })
    }));
  };

  render() {
    const advocateUser = this.state.advocateUser;
    const editState = this.state.editState;
    const advoAthleteArr = this.state.advoAthleteArr;

    return (
      <div>
        <div className="container AdvocateStyle">
          <AdvocateHeader
            advocateUser={advocateUser}
            editMode={this.editMode}
            editState={editState}
            editInput={this.editInput}
            editPic={this.state.editPic}
            editPicture={this.editPicture}
            cancelPicture={this.cancelPicture}
          />
        </div>
        <div className="container AdvocateStyle">
          <AdvocateBody
            advocateUser={advocateUser}
            editMode={this.editMode}
            editState={editState}
            editInput={this.editInput}
            tableToggle={this.tableToggle}
          />
          {this.state.viewTable && <AdvoAthlete advoAthleteArr={advoAthleteArr} editNotes={this.editNotes} />}
        </div>
        <div className="container AdvocateStyle">
          <AdvocateTab advocateUserId={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}

export default AdvocateProfile;
