import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AddTargetSport from "./AddTargetSport";

class AddTargetSportModal extends React.Component {
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
          <ModalHeader>Add Target Sport</ModalHeader>
          <ModalBody>
            <AddTargetSport
              items={this.props.items}
              onHandleChange={this.props.onHandleChange}
              dropdownOptions={this.props.dropdownOptions}
              onSportPositionIdChange={this.props.onSportPositionIdChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.onAddNewToggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.props.onSaveClick}>
              Add Target Sport
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddTargetSportModal;
