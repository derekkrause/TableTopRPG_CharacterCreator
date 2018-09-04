import React from "react";
import AdvocateCell from "./AdvocateCell";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class VerifyListModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} size="sm">
        <ModalHeader toggle={this.props.toggle}> Advocates </ModalHeader>
        <ModalBody>
          {this.props.data.map(d => (
            <AdvocateCell data={d} key={d.advocateUserId} />
          ))}
        </ModalBody>
      </Modal>
    );
  }
}

export default VerifyListModal;
