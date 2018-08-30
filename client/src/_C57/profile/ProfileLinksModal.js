import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAthleteLinksById, postAthleteLink, deleteAthleteLink } from "../../services/athleteLink.service";
import ProfileLinks from "./ProfileLinks";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

class ProfileLinksModal extends React.Component {
  state = {
    modal: false,
    profileLinks: [],
    linkIcon: 0,
    linkTitle: "",
    link: "",
    alert: null
  };

  componentDidMount() {
    if (this.props.currentUser) {
      this.getAthleteLinksFunc();
    }
  }

  getAthleteLinksFunc = () => {
    getAthleteLinksById(this.props.currentProfile)
      .then(response => {
        const info = response.data.item.athleteLinks;
        this.setState({
          profileLinks: info
        });
      })
      .catch(err => console.log(err));
  };

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

  postLinks = icon => {
    const payload = {
      userId: this.props.currentUser.id,
      linkTitle: this.state.linkTitle,
      link: this.state.link,
      iconId: parseInt(icon)
    };
    postAthleteLink(payload)
      .then(
        this.setState(
          {
            linkTitle: "",
            link: ""
          },
          () => this.getAthleteLinksFunc()
        )
      )
      .catch(err => console.log(err));
  };

  delete = id => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to delete?`}
        onConfirm={() => this.deleteLink(id)} //what function you want on confirm
        onCancel={this.cancelAlert} //what function you want on cancel
      />
    );
    this.setState({ alert: getAlert() });
  };

  cancelAlert = () => {
    this.setState({
      alert: null
    });
  };

  deleteLink = id => {
    deleteAthleteLink(id)
      .then(() => {
        this.getAthleteLinksFunc();
        this.cancelAlert();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { currentPageId } = this.props;
    return (
      <div>
        <Modal isOpen={this.props.statsModal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Athlete Links</ModalHeader>
          <ModalBody>
            {this.props.currentUser.id == currentPageId ? (
              <ProfileLinks
                onChangeIcons={this.onChangeIcons}
                handleOnChange={this.handleOnChange}
                link={this.state.link}
                linkTitle={this.state.linkTitle}
                linkIcon={this.state.linkIcon}
                postLinks={this.postLinks}
                currentPageId={this.props.currentPageId}
              />
            ) : (
              <div />
            )}
            {this.state.profileLinks && <hr />}
            <div>
              {this.state.profileLinks ? (
                <React.Fragment>
                  {this.state.profileLinks.map(link => (
                    <div key={link.Id} className="row">
                      <a href={link.Link} target="_blank">
                        <h3 className="pl-4">
                          {link.Icon ? (
                            <React.Fragment>
                              <i className={link.Icon} />
                            </React.Fragment>
                          ) : null}
                          {link.LinkTitle ? (
                            <React.Fragment> {link.LinkTitle}</React.Fragment>
                          ) : (
                            <React.Fragment>{link.Link}</React.Fragment>
                          )}
                        </h3>
                      </a>
                      {/* <button className="btn btn-secondary" type="button" onClick={() => this.deleteLink(link.Id)}> */}
                      <p className="px-1"> </p>
                      <p
                        style={{ fontSize: "x-small", color: "red", cursor: "pointer" }}
                        onClick={() => this.delete(link.Id)}
                      >
                        X
                      </p>
                      {/* </button> */}
                    </div>
                  ))}
                </React.Fragment>
              ) : (
                <div>User has not added any links to their profile yet.</div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.props.toggle}>
              Close
            </Button>
          </ModalFooter>
          {this.state.alert}
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(ProfileLinksModal);
