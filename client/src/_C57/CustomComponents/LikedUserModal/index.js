import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LikedUserModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader> Modal Title </ModalHeader>
        </Modal>
      </div>
    );
  }
}

export default LikedUserModal;
