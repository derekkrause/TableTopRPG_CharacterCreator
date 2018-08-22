import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAthleteLinksById } from "../../services/athleteLink.service";
import ProfileLinks from "./ProfileLinks";

class ProfileLinksModal extends React.Component {
  state = {
    modal: false,
    profileLinks: [],
    linkIcon: 0,
    linkTitle: "",
    link: ""
  };

  componentDidMount() {
    getAthleteLinksById(this.props.currentProfile).then(response => {
      console.log(response);
      const info = response.data.item.athleteLinks;
      this.setState({
        profileLinks: info
      });
    });
  }

  onChangeIcons = e => {
    this.setState({
      linkIcon: e.target.value
    });
  };

  handleOnChange = e => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  };
  render() {
    return (
      <div>
        <Modal isOpen={this.props.statsModal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Athlete Links</ModalHeader>
          <ModalBody>
            <ProfileLinks
              onChangeIcons={this.onChangeIcons}
              handleOnChange={this.handleOnChange}
              link={this.state.link}
              linkTitle={this.state.linkTitle}
              linkIcon={this.state.linkIcon}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.props.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProfileLinksModal;
