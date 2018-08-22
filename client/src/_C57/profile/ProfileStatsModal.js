import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ProfileStatsModal extends React.Component {
  state = {
    modal: false
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.toggleStatsModal !== state.toggleStatsModal) {
      return {
        toggleStatsModal: props.toggleStatsModal
      };
    }
    return null;
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.props.toggleStatsModal} className={this.props.className}>
          <ModalHeader toggle={this.props.toggleStatsModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggleStatsModal}>
              Do Something
            </Button>
            <Button color="secondary" onClick={this.props.toggleStatsModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProfileStatsModal;
