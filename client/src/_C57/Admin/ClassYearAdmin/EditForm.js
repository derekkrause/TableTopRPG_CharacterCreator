import React from "react";
import "./Css/ClassYearForm.css";
import { Form, Input, Label, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { updateClassYear, deleteClassYear } from "./ClassYearServer";

class EditForm extends React.Component {
  deleteBtn = editId => {
    deleteClassYear(editId)
      .then(response => {
        console.log(response, "Successful Delete");
        this.props.removeRow(editId);
      })
      .catch(error => {
        console.log(error, "Delete Error");
      });
  };

  updateBtn = payload => {
    updateClassYear(payload)
      .then(response => {
        console.log(response, "Successful Update");
        this.props.editingState(false);
      })
      .catch(error => {
        console.log(error, "Error");
      });
  };

  render() {
    return (
      <Modal isOpen={this.props.modal} style={{ width: "350px" }}>
        <ModalHeader>Edit Class Year</ModalHeader>
        <ModalBody>
          <Form>
            <div className=" form-group">
              <Label>Code:</Label>
              <Input
                className="form-control col-2"
                name="code"
                onChange={this.props.setFormValue}
                value={this.props.editingInfo.code}
                type="text"
                valid={this.props.editingInfo.code.length > 0 && this.props.editingInfo.code.length <= 20}
                invalid={this.props.editingInfo.code.length > 20}
                required
              />
              <FormFeedback>Maximum length is 20 characters</FormFeedback>
              <FormFeedback valid>Looks Good!</FormFeedback>
            </div>
            <div className="form-group">
              <Label>Class Year:</Label>
              <Input
                className="form-control col-6"
                name="name"
                onChange={this.props.setFormValue}
                value={this.props.editingInfo.name}
                placeholder="Enter Class Year Name..."
                type="text"
                valid={this.props.editingInfo.name.length > 0 && this.props.editingInfo.name.length <= 100}
                invalid={this.props.editingInfo.name.length > 100}
                required
              />
              <FormFeedback>Maximum length is 100 characters</FormFeedback>
              <FormFeedback valid>Looks Good!</FormFeedback>
            </div>
            <div className="form-group">
              <Label>Display Order:</Label>
              <Input
                className="form-control col-2"
                name="displayOrder"
                onChange={this.props.setFormValue}
                value={this.props.editingInfo.displayOrder}
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
                  onChange={this.props.setFormValue}
                  checked={this.props.editingInfo.inactive}
                />
                <Label id="inactive">Inactive</Label>
              </div>
            </div>
            <ModalFooter>
              <div className="form-group">
                <Button
                  type="button"
                  className="btn btn-primary ClassYearForm"
                  onClick={() => this.updateBtn(this.props.editingInfo)}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger ClassYearForm"
                  onClick={() => this.deleteBtn(this.props.editingInfo.id)}
                >
                  Delete
                </Button>
                <Button type="button" className="btn btn-default ClassYearForm" onClick={this.props.editingState}>
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

export default EditForm;
