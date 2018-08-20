import React from "react";
import { getSchoolsById } from "./SchoolAdminServer";
import { StatesOptions } from "../StateOption";
import SweetAlert from "react-bootstrap-sweetalert";
import FileUploader from "../../FileUploader/FileUploader";
import { deleteSchool, updateSchool, addSchool } from "./SchoolAdminServer";
import { SchoolType } from "./SchoolLevelDropdown";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

class SchoolForm extends React.Component {
  state = {
    typeAhead: "",
    schoolInfo: {
      Name: "",
      Street: "",
      Suite: "",
      City: "",
      State: "",
      Zip: null,
      Lat: null,
      Lon: null,
      Url: "",
      imageUrl: "",
      PhoneNumber: "",
      StudentSize: null,
      InStateTuition: null,
      OutOfStateTuition: null,
      SportLevel: null,
      SchoolTypeId: null
    },
    alert: null,
    type: "",
    imagePreview: "",

    loading: true
  };

  componentDidMount = () => {
    this.props.match.params.id
      ? getSchoolsById(this.props.match.params.id).then(res => {
          // console.log(res.data.resultSets[0][0]);
          this.setState({ schoolInfo: res.data.resultSets[0][0] });
        })
      : null; //console.log("post request")
  };

  handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });
  };

  createNotification = type => {
    console.log(type);

    switch (type) {
      case "update":
        NotificationManager.success("has been updated", `${this.state.schoolInfo.Name}`, 3000);
        break;
      case "added":
        NotificationManager.success("has been added", `${this.state.schoolInfo.Name}`, 3000);
        break;
    }
  };

  handleStateChange = value => {
    this.setState(prevState => ({
      schoolInfo: {
        ...prevState.schoolInfo,
        State: value
      }
    }));
  };

  handleSchoolTypeChange = value => {
    this.setState(prevState => ({
      schoolInfo: {
        ...prevState.schoolInfo,
        SchoolTypeId: value
      }
    }));
  };

  deleteSchool = () => {
    deleteSchool(this.props.match.params.id)
      .then(res => {
        this.props.history.goBack();
        console.log("School Deleted", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  cancelDelete = () => {
    this.setState({ alert: null });
  };

  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to delete ${this.state.schoolInfo.Name}?`}
        onConfirm={this.deleteSchool}
        onCancel={this.cancelDelete}
      />
    );
    this.setState({ alert: getAlert() });
  };

  sendNotification = type => {
    this.setState({ type: type });
  };

  submitForm = () => {
    this.props.match.params.id
      ? updateSchool(this.props.match.params.id, this.state.schoolInfo)
          .then(res => {
            console.log("School updated", res);
            this.createNotification("update");
          })
          .catch(err => {
            console.log(err);
          })
      : addSchool(this.state.schoolInfo)
          .then(res => {
            console.log("School Added", res);
            this.createNotification("added");
          })
          .catch(err => {
            console.log(err);
          });
  };

  render() {
    return (
      <div className="row">
        <form className="col-md-12">
          <header>
            <h1>Admin page</h1>
          </header>
          <div className=" form-group">
            <label>School name *</label>
            <input
              value={this.state.schoolInfo.Name || ""}
              className="form-control"
              type="text"
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, Name: e.target.value }
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Street</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.Street || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: {
                    ...this.state.schoolInfo,
                    Street: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Suite</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.Suite || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: {
                    ...this.state.schoolInfo,
                    Suite: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.City || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, City: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group  ">
            <label>State</label>
            <StatesOptions value={this.state.schoolInfo.State || ""} handleStateChange={this.handleStateChange} />
          </div>
          <div className="form-group">
            <label>Zip</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.Zip || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, Zip: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Lat</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.Lat || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, Lat: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Lon:</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.Lon || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, Lon: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.Url || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, Url: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Logo</label>
            <FileUploader onImageUrlChange={this.handleImageUrlChange} />
          </div>
          <div className="form-group">
            <label>School Level</label>
            <SchoolType
              className="school-dropdown"
              value={this.state.schoolInfo.SchoolTypeId || ""}
              handleSchoolTypeChange={this.handleSchoolTypeChange}
            />
          </div>
          <div className="form-group">
            <label>Phone number</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.PhoneNumber || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, PhoneNumber: e.target.value }
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Student size</label>
            <input
              className="form-control"
              type="text"
              value={this.state.schoolInfo.StudentSize || ""}
              onChange={e =>
                this.setState({
                  schoolInfo: { ...this.state.schoolInfo, StudentSize: e.target.value }
                })
              }
            />
          </div>
          {this.state.schoolInfo.SchoolTypeId == 1 && (
            <React.Fragment>
              <div className="form-group">
                <label>In State Tuition</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.schoolInfo.InStateTuition || ""}
                  onChange={e =>
                    this.setState({
                      schoolInfo: { ...this.state.schoolInfo, InStateTuition: e.target.value }
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Out Of State Tuition</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.schoolInfo.OutOfStateTuition || ""}
                  onChange={e =>
                    this.setState({
                      schoolInfo: { ...this.state.schoolInfo, OutOfStateTuition: e.target.value }
                    })
                  }
                />
              </div>
            </React.Fragment>
          )}
          {this.props.match.params.id && (
            <div className="form-group float-left">
              <button type="button" className="btn btn-danger" onClick={() => this.delete()}>
                Delete
              </button>
            </div>
          )}
          <div className=" form-group float-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.submitForm(this.state.lat, this.state.lon)}
            >
              Submit
            </button>

            <button type="button" className="btn btn-default" onClick={() => this.props.history.goBack()}>
              Cancel
            </button>
            <NotificationContainer />
          </div>
        </form>

        {this.state.alert}
      </div>
    );
  }
}

export default SchoolForm;
