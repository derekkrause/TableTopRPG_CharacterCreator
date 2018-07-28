import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class AlertModals extends React.Component {
  render() {
    return (
      <div className="text-center">
        <Modal
          isOpen={this.props.modal}
          handleModalToggle={this.props.handleModalToggle}
          className={this.props.className}
        >
          <ModalHeader>Delete Post</ModalHeader>
          <ModalBody>
            <h4>Are you sure you want to delete this post?</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.handleModalToggle}>
              No
            </Button>
            <Button color="primary" onClick={this.props.handleDeleteBlog}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AlertModals;
