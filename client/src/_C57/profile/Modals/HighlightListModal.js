import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { getAllHighlightListById } from "../../../services/highlightList.service";
import { highlightUser, unhighlightUser } from "../../../services/highlight.service";
import { NavLink } from "react-router-dom";
import "../../HomePage/HomePage.css";

class HighlightListModal extends React.Component {
  state = {
    highlightInfo: []
  };

  handleOnChange = e => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  componentDidMount() {
    this.getHighlightedUsers();
  }

  getHighlightedUsers = () => {
    getAllHighlightListById(this.props.currentPageId).then(response => {
      const info = response.data.resultSets[0];
      console.log(info);
      this.setState(
        {
          highlightInfo: info
        },
        () => this.props.grabHighlightLength(info.length)
      );
    });
  };

  handleHighlight = userToHighlight => {
    const payload = {
      highlightId: this.props.currentUser.id,
      userId: parseInt(userToHighlight)
    };

    highlightUser(payload).then(res => {
      this.getHighlightedUsers();
    });
  };

  handleUnhighlight = userToUnhighlight => {
    unhighlightUser(this.props.currentUser.id, userToUnhighlight).then(res => {
      this.getHighlightedUsers();
    });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.highlightModal}
          toggle={this.props.toggleHighlightModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleHighlightModal}>Highlight List</ModalHeader>
          <ModalBody>
            <div>
              {this.state.highlightInfo && (
                <React.Fragment>
                  <table>
                    <tbody>
                      {this.state.highlightInfo.map(info => (
                        <tr key={info.UserId}>
                          <td>
                            <NavLink to={`/app/profile/${info.UserId}`} className="link-text">
                              <div className="d-flex align-items-center pl-2 my-2">
                                <img src={info.AvatarUrl} className="user-avatar rounded-circle" />
                                <span className="px-2">
                                  {info.FirstName} {info.LastName}
                                </span>
                              </div>
                            </NavLink>
                          </td>
                          <td>
                            {info.HighlightingThem ? (
                              <button className="btn" type="button" onClick={() => this.handleUnhighlight(info.UserId)}>
                                UnHighlight
                              </button>
                            ) : (
                              <button className="btn" type="button" onClick={() => this.handleHighlight(info.UserId)}>
                                Highlight
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </React.Fragment>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.props.toggleHighlightModal}>
              Close
            </Button>
          </ModalFooter>
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

export default connect(mapStateToProps)(HighlightListModal);
