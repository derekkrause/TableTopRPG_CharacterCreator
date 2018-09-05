import React from "react";
import { Form, Input, FormGroup, Label, Button, FormFeedback } from "reactstrap";
import { CancelButton, SaveButton, DeleteButton } from "../../CustomComponents/Button";
import { NotificationManager } from "react-notifications";
import SweetAlert from "react-bootstrap-sweetalert";
import { CreateConfig, updateConfig, getConfigById, deleteConfig } from "../../../services/config.service";

class ConfigForm extends React.Component {
  state = {
    Id: "",
    Key: "",
    Value: "",
    configData: [],
    duplicateKey: false,
    keyValueValid: false,
    saveBtnClicked: false,
    alert: null
  };

  handleChange = e => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState({ ...this.state.configData, [key]: value });
  };

  handleKeyDown = e => {
    if (e.key == "Enter") {
      console.log("Config Page: Enter Key Pressed");
      this.handleSubmit();
    }
  };

  componentDidMount() {
    const configIdToEdit = this.props.match.params.id;
    if (configIdToEdit) {
      getConfigById(configIdToEdit).then(response => {
        console.log(response.data.item);
        this.setState(response.data.item);
      });
    }
  }

  // ----- REACT NOTIFICATIONS -----
  createNotification = type => {
    console.log("Notification Type: " + type);

    switch (type) {
      case "update":
        NotificationManager.success("has been updated", "config: " + `${this.state.Key}`, 5000);
        break;
      case "added":
        NotificationManager.success("has been added", "Config: " + `${this.state.Key}`, 5000);
        break;
      case "info":
        NotificationManager.info("INFO message");
        break;
      case "warning":
        NotificationManager.warning("Oh No!", "WARNING!");
        break;
      case "error":
        NotificationManager.error("ERROR!", "Error Title");
        break;
    }
  };
  // ---------------------------------

  handleSubmit = () => {
    console.log("Enter Key pressed");
    this.setState({ saveBtnClicked: true });
    const data = {
      key: this.state.Key,
      value: this.state.Value,
      id: this.state.Id
    };

    const handleSaveConfigError = err => {
      if (err.response.data.errors == "Duplicate item") {
        this.setState({ duplicateKey: true });
      }
      this.setState({ error: err });
    };

    if (!this.state.Id) {
      CreateConfig(data)
        .then(response => {
          this.createNotification("added");
          clearStateAfterSuccess();
          this.props.history.push("/app/admin/config");
        })
        .catch(err => {
          handleSaveConfigError(err);
        });
    } else {
      updateConfig(data)
        .then(response => {
          this.createNotification("update");
          clearStateAfterSuccess();
          console.log("Edit ID: " + data.id + ": " + data.key);
          const updateConfig = this.state.configData.map(config => {
            if (id === data.id) {
              return data;
            } else {
              return config;
            }
          });
          this.setState({ configData: updateConfig });
          console.log(data.Key);
          this.props.history.push("/app/admin/config");
        })
        .catch(err => {
          handleSaveConfigError(err);
        });
    }
    const clearStateAfterSuccess = () => {
      this.setState({ Key: "", Value: "" });
    };
  };

  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure you want to delete?"
        onConfirm={this.handleDelete}
        onCancel={this.cancelAlert}
      />
    );
    this.setState({ alert: getAlert() });
  };

  cancelAlert = () => {
    this.setState({ alert: null });
  };

  handleDelete = () => {
    console.log("deleting");
    deleteConfig(this.state.Id).then(console.log("deleted!"));
    this.props.getAllConfig();
    this.setState({ alert: null }, () => this.props.history.push("/app/admin/config"));
  };

  render() {
    return (
      <div>
        <Form className="jr-card col-12">
          <header>
            <h1>Configuration Form</h1>
          </header>
          <FormGroup>
            <Label>Key Name:</Label>
            <Input
              type="text"
              name="Key"
              value={this.state.Key}
              valid={
                !this.state.duplicateKey &&
                !this.state.saveBtnClicked &&
                (this.state.Key.length > 0 && this.state.Key.length >= 2)
              }
              invalid={
                this.state.duplicateKey ||
                this.state.saveBtnClicked ||
                (this.state.Key.length > 0 && this.state.Key.length < 2)
              }
              onChange={this.handleChange}
            />
            <FormFeedback>
              {this.state.duplicateKey ? "This Key Name is already stored." : "Please enter at least 2 letter"}
            </FormFeedback>
            <Label>Key:</Label>
            <Input
              type="text"
              name="Value"
              value={this.state.Value}
              valid={!this.state.keyValueValid && this.state.Value.length > 0 && this.state.Value >= 2}
              invalid={this.state.keyValueValid || (this.state.Value.length > 0 && this.state.Value.length < 2)}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
            <FormFeedback>{this.state.keyValueValid ? "Please enter at least 2 letter" : ""}</FormFeedback>
            <div className=" form-group float-right mt-3">
              <SaveButton onClick={this.handleSubmit.bind(this)} />
              <CancelButton
                onClick={() => {
                  this.props.history.goBack();
                }}
              />
              <DeleteButton onClick={this.delete} />
            </div>
          </FormGroup>
        </Form>
        {this.state.alert}
      </div>
    );
  }
}

export default ConfigForm;
