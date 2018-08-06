import React from "react";
import "./Css/ClassYearForm.css";
import { Form, Input, Label, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { postClassYear } from "./ClassYearServer";

class AddForm extends React.Component {
  state = {
    code: "",
    name: "",
    displayOrder: "",
    inactive: false
  };

  addFormData = e => {
    let key = e.target.name;
    let value = e.target.value;
    let checkBox = e.target.checked;
    this.setState({
      [key]: value,
      inactive: checkBox
    });
  };

  saveBtn = e => {
    e.preventDefault();
    const payload = {
      ...this.state
    };

    postClassYear(payload)
      .then(response => {
        console.log(response, "Success Post");
        payload.id = response.data.item;
        this.props.addTableRow(payload);
      })
      .catch(error => {
        console.log(error, "Error");
      });
  };

  render() {
    return (
      <Modal isOpen={this.props.modal} style={{ width: "350px" }}>
        <ModalHeader className="ClassYearForm">Create Class Year</ModalHeader>
        <ModalBody>
          <Form>
            <div className=" form-group">
              <Label>Code</Label>
              <Input
                className="form-control col-2"
                name="code"
                onChange={this.addFormData}
                value={this.state.code}
                type="text"
                valid={this.state.code.length > 0 && this.state.code.length <= 20}
                invalid={this.state.code.length > 20}
                required
              />
              <FormFeedback>Maximum length is 20 characters</FormFeedback>
              <FormFeedback valid>Looks Good!</FormFeedback>
            </div>
            <div className="form-group">
              <Label>Class Year</Label>
              <Input
                className="form-control col-6"
                name="name"
                onChange={this.addFormData}
                value={this.state.name}
                type="text"
                valid={this.state.name.length > 0 && this.state.name.length <= 100}
                invalid={this.state.name.length > 100}
                required
              />
              <FormFeedback>Maximum length is 100 characters</FormFeedback>
              <FormFeedback valid>Looks Good!</FormFeedback>
            </div>
            <div className="form-group">
              <Label>Display Order</Label>
              <Input
                className="form-control col-2"
                name="displayOrder"
                onChange={this.addFormData}
                value={this.state.displayOrder}
                type="number"
                min="1"
              />
            </div>
            <div className="form-group">
              <div className="checkbox ClassYearForm">
                <Input
                  type="checkbox"
                  htmlFor="inactive"
                  name="inactive"
                  onChange={this.addFormData}
                  value={this.state.inactive}
                />
                <Label id="inactive">Inactive</Label>
              </div>
            </div>
            <ModalFooter>
              <div className="form-group">
                <Button type="button" className="btn btn-primary ClassYearForm" onClick={this.saveBtn}>
                  Create
                </Button>
                <Button type="button" className="btn btn-default ClassYearForm" onClick={this.props.addFormToggle}>
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddForm;
