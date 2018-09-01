import React from "react";
import "./AdvocateStyle.css";
import { Form, Input, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SchoolAutoSearch from "./SchoolAutoSearch";
import { updateAdvocate } from "./AdvocateServer";

class AdvocateHeader extends React.Component {
  state = {
    editPic: false
  };

  editPicture = payload => {
    if (this.state.editPic) {
      updateAdvocate(payload)
        .then(response => {
          console.log(response, "Updated");
        })
        .catch(error => {
          console.log(error, "Error");
        });
      this.setState({
        editPic: false
      });
    } else {
      this.setState({
        editPic: true
      });
    }
  };

  cancelPicture = () => {
    if (this.state.editPic) {
      this.setState({
        editPic: false
      });
    }
  };

  render() {
    return (
      <div>
        <div className="header AdvocateStyle">
          <div className="background AdvocateStyle">
            <img
              className="backgroundImg AdvocateStyle"
              alt="background"
              src="http://goodswing.hoelterresearch.com/images/PHSLin1.jpg"
            />
          </div>
          <div className="headerInfo Advocatestyle" style={{ borderLeft: "8px solid brown" }}>
            <i
              className="zmdi zmdi-more zmdi-hc-3x moreDots AdvocateStyle float-right"
              onClick={() => this.props.editMode(this.props.advocateUser)}
            />
            {this.state.editPic ? (
              <Modal isOpen={this.state.editPic} style={{ width: "350px" }}>
                <ModalHeader>Change Profile Picture</ModalHeader>
                <ModalBody>
                  <Form>
                    <div className=" form-group">
                      <Label>New Image Url</Label>
                      <Input
                        className="form-control"
                        name="avatarUrl"
                        onChange={this.props.editInput}
                        value={this.props.advocateUser.avatarUrl || ""}
                        type="text"
                      />
                    </div>
                    <ModalFooter>
                      <div className="form-group">
                        <Button
                          type="button"
                          className="btn btn-primary AdvocateStyle"
                          onClick={() => this.editPicture(this.props.advocateUser)}
                        >
                          Upload
                        </Button>
                        <Button type="button" className="btn btn-secondary AdvocateStyle" onClick={this.cancelPicture}>
                          Cancel
                        </Button>
                      </div>
                    </ModalFooter>
                  </Form>
                </ModalBody>
              </Modal>
            ) : (
              <div className="imgContainer AdvocateStyle">
                <img className="avatarImg AdvocateStyle" alt="avatarUrl" src={this.props.advocateUser.avatarUrl} />
                {!this.props.editState && <div className="title AdvocateStyle">{this.props.advocateUser.title}</div>}
                {this.props.editState && (
                  <Input
                    type="text"
                    name="title"
                    value={this.props.advocateUser.title || ""}
                    onChange={this.props.editInput}
                    size="20"
                  />
                )}
                <div className="middle AdvocateStyle">
                  <i
                    className="zmdi zmdi-local-see zmdi-hc-fw AdvocateStyle"
                    onClick={() => this.editPicture(this.props.advocateUser.userId)}
                  />
                </div>
              </div>
            )}
            <div className="info AdvocateStyle">
              <h1 className="name AdvocateStyle">
                {this.props.editState ? (
                  <div>
                    <Input
                      type="text"
                      name="firstName"
                      className="col-5 fname AdvocateStyle"
                      value={this.props.advocateUser.firstName || ""}
                      onChange={this.props.editInput}
                      size="10"
                    />
                    <Input
                      type="text"
                      name="lastName"
                      className="col-5"
                      value={this.props.advocateUser.lastName || ""}
                      onChange={this.props.editInput}
                      size="10"
                      style={{ display: "inline" }}
                    />
                  </div>
                ) : (
                  <div>
                    <strong>
                      {this.props.advocateUser.firstName} &nbsp;
                      {this.props.advocateUser.lastName}
                    </strong>
                  </div>
                )}
              </h1>
              <h2 style={{ fontSize: "14px" }}>
                {this.props.editState ? (
                  <div>
                    <strong>Email</strong>
                    <Input
                      type="text"
                      name="email"
                      value={this.props.advocateUser.email || ""}
                      onChange={this.props.editInput}
                      size="20"
                    />
                    <br />
                    <strong>Affiliation</strong>
                    <SchoolAutoSearch
                      initialValue={this.props.advocateUser.name}
                      selectedSchool={options => this.props.selectedSchool(options)}
                    />
                  </div>
                ) : (
                  <div className="advoInfo AdvocateStyle">
                    &nbsp;
                    {this.props.advocateUser.email}
                    <br /> <strong>{this.props.advocateUser.name}</strong>
                  </div>
                )}
              </h2>
              <div role="group" className="btn-group">
                <button className="jr-btn jr-btn-default btn-default AdvocateStyle profileInfoBtn">Follow</button>
                <button className="jr-btn jr-btn-default btn-default AdvocateStyle profileInfoBtn">Highlight</button>
              </div>
            </div>
            <Button className="btn btn-primary msgBtn float-right AdvocateStyle">Request Advocacy | Message</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdvocateHeader;
