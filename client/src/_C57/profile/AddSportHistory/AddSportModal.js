import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AddSport from "./AddSport";

class AddSportModal extends React.Component {
  state = {
    modal: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.modal !== state.modal) {
      return { modal: props.modal };
    }
    return null;
  }

  render() {
    return (
      <div className="text-center" style={{ width: "400px" }}>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Add Sport</ModalHeader>
          <ModalBody>
            <AddSport
              sportId={this.props.sportId}
              classYearId={this.props.classYearId}
              sportPositionId={this.props.sportPositionId}
              clubName={this.props.clubName}
              schoolId={this.props.schoolId}
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
            <Button color="secondary" onClick={this.props.onAddNewToggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.props.onSubmitSport}>
              Add Sport Record
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddSportModal;
