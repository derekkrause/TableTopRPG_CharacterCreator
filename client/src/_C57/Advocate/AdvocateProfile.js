import React from "react";
import "./AdvocateStyle.css";
import AdvocateHeader from "./AdvocateHeader";
import AdvocateBody from "./AdvocateBody";
import AdvocateTab from "./AdvocateTab";
import { getAdvocateByUserId, updateAdvocate } from "./AdvocateServer";

class AdvocateProfile extends React.Component {
  state = {
    editState: false,
    advocateUser: {},
    school: {}
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
    const s = this.state.school;
    payload.highSchoolId = s.Id;
    payload.name = s.Name;
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

  selectedSchool = s => {
    this.setState({
      school: s
    });
  };

  render() {
    const id = this.props.match.params.id;
    const aU = this.state.advocateUser;
    const eS = this.state.editState;
    const eM = this.editMode;
    const eI = this.editInput;

    return (
      <div>
        <div className="container AdvocateStyle">
          <AdvocateHeader
            advocateUser={aU}
            editMode={eM}
            editState={eS}
            editInput={eI}
            selectedSchool={options => this.selectedSchool(options)}
          />
          <AdvocateBody advocateUser={aU} editMode={eM} editState={eS} editInput={eI} advocateUserId={id} />
        </div>
        <div className="container AdvocateStyle">
          <AdvocateTab advocateUserId={id} />
        </div>
      </div>
    );
  }
}

export default AdvocateProfile;
