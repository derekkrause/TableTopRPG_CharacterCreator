import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AddSport from "./AddSport";

class AddSportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="text-center" style={{ width: "400px" }}>
        <Button className="jr-btn btn-primary text-white" color="primary" onClick={this.toggle}>
          Add Sport
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Add Sport</ModalHeader>
          <ModalBody>
            <AddSport
              sportId={this.props.sportId}
              classYearId={this.props.classYearId}
              sportPositionId={this.props.sportPositionId}
              clubName={this.props.clubName}
              schoolNameId={this.props.schoolNameId}
              teamName={this.props.teamName}
              comments={this.props.comments}
              selectedOption={this.props.selectedOption}
              sportLevelId={this.props.sportLevelId}
              handleOptionChange={this.props.handleOptionChange}
              onHandleChange={this.props.onHandleChange}
              onSportPositionIdChange={this.props.onSportPositionIdChange}
              onHandleSchoolSelect={this.props.onHandleSchoolSelect}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.onSubmitSport}>
              Add Sport Record
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddSportModal;
