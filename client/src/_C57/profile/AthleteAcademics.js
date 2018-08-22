import React from "react";
import { SaveButton, CancelButton } from "../CustomComponents/Button";
import Popover from "../CustomComponents/Popover";

class AthleteAcademics extends React.Component {
  state = {
    editAcademics: false
  };

  handleEditAcademics = () => {
    this.setState({
      editAcademics: !this.state.editAcademics
    });
  };

  handleAcademicSaveProfile = () => {
    this.setState({
      editAcademics: false
    });
    this.props.handleSaveProfile();
  };

  render() {
    return (
      <div>
        <div className="row home-center-text mb-3">
          <div className="col-12">
            <div className="">
              <div className="mb-0">Academic</div>
            </div>
            <div className="float-right">
              <Popover popover={this.props.popover} handleUpdate={this.handleEditAcademics} />
            </div>
          </div>
        </div>
        {this.state.editAcademics === false ? (
          <React.Fragment>
            <div className="row justify-content-center" style={{}}>
              <div className="col-3 pl-0 pr-0">
                <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                  GPA
                </h3>
                <h2 style={{ textAlign: "center", marginBottom: "0px" }}>{this.props.gpa}</h2>
              </div>
              {/* <span style={{ fontSize: "30px", color: "#b1afaf" }}>|</span> */}
              <div className="col-4 pl-0 pr-0 border-left border-right">
                <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                  SAT
                </h3>
                <div>
                  <h2 style={{ textAlign: "center", marginBottom: "0px" }}>{this.props.sat}</h2>
                </div>
              </div>
              {/* <span style={{ fontSize: "30px", color: "#b1afaf" }}>|</span> */}
              <div className="col-3 pl-0 pr-0">
                <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                  ACT
                </h3>
                <div>
                  <h2 style={{ textAlign: "center", marginBottom: "0px" }}>{this.props.act}</h2>
                </div>
              </div>
            </div>
            <div className="sub-heading mt-3">{this.props.academicNotes}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="form">
              <div className="row">
                <div className="col-3">
                  <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                    GPA
                  </h3>
                  <input
                    className="form-control"
                    value={this.props.gpa}
                    type="number"
                    name="gpa"
                    onChange={this.props.handleChange}
                    style={{ textAlign: "center" }}
                  />
                </div>
                <span style={{ fontSize: "2.5em" }}>|</span>
                <div className="col-4">
                  <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                    SAT
                  </h3>
                  <div>
                    <input
                      className="form-control"
                      value={this.props.sat}
                      type="number"
                      name="sat"
                      onChange={this.props.handleChange}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                </div>
                <span style={{ fontSize: "2.5em" }}>|</span>
                <div className="col-3 ">
                  <h3 className="font-weight-bold" style={{ textAlign: "center" }}>
                    ACT
                  </h3>
                  <div>
                    <input
                      className="form-control"
                      value={this.props.act}
                      type="number"
                      name="act"
                      onChange={this.props.handleChange}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                </div>
              </div>
              <div className="sub-heading mt-3 mb-3">{this.props.academicNotes}</div>
            </div>
            <div className="row">
              <div className="col-md-12 text-right">
                <CancelButton type="button" onClick={this.handleEditAcademics} />
                <SaveButton type="button" onClick={this.handleAcademicSaveProfile} />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default AthleteAcademics;
