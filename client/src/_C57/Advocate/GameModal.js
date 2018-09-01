import React, { Component } from "react";
import { Form, Input, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Teams from "../Advocate/Teams";
import { insertTeam, insertAdvoTeam } from "./AdvocateServer";

class GameModal extends Component {
  state = {
    modal: false,
    teamModal: false,
    team: {},
    teamArr: this.props.teams
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

  postTeam = payload => {
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
        <Button className="jr-btn btn-primary text-white" color="primary" onClick={this.toggleTeam}>
          + Add New Team
        </Button>
        &nbsp;
        <Button className="jr-btn btn-primary text-white" color="primary" onClick={this.toggle}>
          + Add New Game
        </Button>
        <div>
          <div className="float-right">
            <Teams key={this.state.teamArr} teamArr={this.state.teamArr} />
          </div>
        </div>
        <Modal isOpen={this.state.teamModal} toggle={this.toggleTeam} className={this.props.className}>
          <ModalHeader toggle={this.toggleTeam}>Add Team</ModalHeader>
          <ModalBody>
            <Form className=" center">
              <div className="form-group col-2 mt-2">
                <Label className="mb-2">Sport Id</Label>
                <Input
                  type="number"
                  name="sportId"
                  onChange={this.formValues}
                  value={t.sportId || ""}
                  className="form-control"
                />
              </div>
              <div className="form-group col-2 mt-2">
                <Label className="mb-2">Sport Level Id</Label>
                <Input
                  type="number"
                  name="sportLevelId"
                  onChange={this.formValues}
                  value={t.sportLevelId || ""}
                  className="form-control"
                />
              </div>
              <div className="form-group col-2 mt-2">
                <Label className="mb-2">School Id(optional)</Label>
                <Input
                  type="number"
                  name="schoolId"
                  onChange={this.formValues}
                  value={t.schoolId || ""}
                  className="form-control"
                />
              </div>
              <div className="form-group col-6 mt-2">
                <Label className="mb-2">Team Name</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={this.formValues}
                  value={t.name || ""}
                  className="form-control"
                />
              </div>
              <div className="form-group col-6 mt-2">
                <Label className="mb-2">City</Label>
                <Input
                  type="text"
                  name="city"
                  onChange={this.formValues}
                  value={t.city || ""}
                  className="form-control"
                />
              </div>
              <div className="form-group col-2 mt-2">
                <Label className="mb-2">State</Label>
                <Input
                  type="text"
                  name="state"
                  onChange={this.formValues}
                  value={t.state || ""}
                  className="form-control"
                />
              </div>
              <div className="form-group col-4 mt-2">
                <Label className="mb-2">Zip</Label>
                <Input
                  type="number"
                  name="zip"
                  onChange={this.formValues}
                  value={t.zip || ""}
                  className="form-control"
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create Game</ModalHeader>
          <ModalBody>
            <div className="form-group mt-2">
              <label className="mb-2">Game Name</label>
              <input type="text" className="form-control" placeholder="Game Name..." />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>
              Create
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default GameModal;
