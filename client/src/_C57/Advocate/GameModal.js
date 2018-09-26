import React, { Component } from "react";
import { Form, Input, Label, Button, FormFeedback, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SchoolAutoSearch from "./SchoolAutoSearch";
import Teams from "../Advocate/Teams";
import { insertTeam, insertAdvoTeam } from "./AdvocateServer";

class GameModal extends Component {
  state = {
    modal: false,
    teamModal: false,
    team: {},
    teamArr: this.props.teams,
    school: {}
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleTeam = () => {
    this.setState({
      teamModal: !this.state.teamModal
    });
  };

  formValues = e => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      team: {
        ...prevState.team,
        [key]: value
      }
    }));
  };

  selectedSchool = s => {
    this.setState({
      school: s
    });
  };

  postTeam = payload => {
    payload.SchoolId = this.state.school.Id;
    payload.schoolName = this.state.school.Name;

    insertTeam(payload)
      .then(response => {
        console.log(response, "Post Team");
        payload.id = response.data.item;
        const newArr = [...this.state.teamArr, payload];
        this.setState(
          {
            teamModal: !this.state.teamModal,
            teamArr: newArr,
            team: {}
          },
          () => {
            const advoTeam = {};
            advoTeam.teamId = payload.id;
            advoTeam.advocateUserId = this.props.advocateUserId;
            insertAdvoTeam(advoTeam)
              .then(response => {
                console.log(response, "Inserted advoTeam");
              })
              .catch(error => {
                console.log(error, "Error");
              });
          }
        );
      })
      .catch(error => {
        console.log(error, "Error");
      });
  };

  render() {
    const t = this.state.team;

    return (
      <div>
        <Button className="jr-btn btn-primary text-white ml-4" color="primary" onClick={this.toggleTeam}>
          + Add New Team
        </Button>
        &nbsp;
        {/* <Button className="jr-btn btn-primary text-white" color="primary" onClick={this.toggle}>
          + Add New Game
        </Button> */}
        <div>
          <div className="container">
            <Teams key={this.state.teamArr} teamArr={this.state.teamArr} className={this.props.className} />
          </div>
        </div>
        <Modal
          style={{ width: "400px" }}
          isOpen={this.state.teamModal}
          toggle={this.toggleTeam}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleTeam}>Add Team</ModalHeader>
          <ModalBody>
            <Form className=" center">
              <div className="form-group col-4 mt-2">
                <Label className="mb-2">Sport Id</Label>
                <Input
                  type="number"
                  name="sportId"
                  onChange={this.formValues}
                  value={t.sportId || ""}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group col-4 mt-2">
                <Label className="mb-2">Sport Level Id</Label>
                <Input
                  type="number"
                  name="sportLevelId"
                  onChange={this.formValues}
                  value={t.sportLevelId || ""}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group col-8 mt-2">
                <Label className="mb-2">School Name(optional)</Label>
                <SchoolAutoSearch selectedSchool={options => this.selectedSchool(options)} />
              </div>
              <div className="form-group col-8 mt-2">
                <Label className="mb-2">Team Name</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={this.formValues}
                  value={t.name || ""}
                  className="form-control"
                  // valid={t.name.length > 0 && t.name.length <= 50}
                  // invalid={t.name.length > 50 || undefined}
                  required
                />
                <FormFeedback>Maximum length is 50 characters</FormFeedback>
                <FormFeedback valid>Looks Good!</FormFeedback>
              </div>
              <div className="form-group col-8 mt-2">
                <Label className="mb-2">City</Label>
                <Input
                  type="text"
                  name="city"
                  onChange={this.formValues}
                  value={t.city || ""}
                  className="form-control"
                  // valid={t.city.length > 0 && t.city.length <= 50}
                  // invalid={t.city.length > 50}
                  required
                />
                <FormFeedback>Maximum length is 50 characters</FormFeedback>
                <FormFeedback valid>Looks Good!</FormFeedback>
              </div>
              <div className="form-group col-4 mt-2">
                <Label className="mb-2">State</Label>
                <Input
                  type="text"
                  name="state"
                  onChange={this.formValues}
                  value={t.state || ""}
                  className="form-control"
                  // valid={t.state.length > 0 && t.state.length <= 50}
                  // invalid={t.state.length > 50}
                  required
                />
                <FormFeedback>Maximum length is 50 characters</FormFeedback>
                <FormFeedback valid>Looks Good!</FormFeedback>
              </div>
              <div className="form-group col-6 mt-2">
                <Label className="mb-2">Zip</Label>
                <Input
                  type="number"
                  name="zip"
                  onChange={this.formValues}
                  value={t.zip || ""}
                  className="form-control"
                  required
                />
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={() => this.postTeam(t)}>
              Create
            </Button>
            <Button color="link" onClick={this.toggleTeam}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default GameModal;
