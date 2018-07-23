import React from "react";
import { Table } from "reactstrap";
import "./profileCard.css";

class AcademicTable extends React.Component {
  state = {
    editMode: false,
    gpa: "1",
    sat: "1",
    act: "1",
    desiredMajor: "sports medicine"
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  render() {
    return (
      <div className="table-responsive-material">
        <Table>
          <thead>
            <tr>
              <th className="border-top-0">GPA</th>
              <th className="border-top-0">SAT</th>
              <th className="border-top-0">ACT</th>
              <th className="border-top-0">Desired Major</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.state.editMode === false ? (
                <td>{this.state.gpa}</td>
              ) : (
                <td>
                  <input
                    type="text"
                    name="gpa"
                    value={this.state.gpa}
                    onChange={this.handleChange}
                    autoFocus
                  />
                </td>
              )}
              {this.state.editMode === false ? (
                <td>{this.state.sat}</td>
              ) : (
                <td>
                  <input
                    type="text"
                    name="sat"
                    value={this.state.sat}
                    onChange={this.handleChange}
                  />
                </td>
              )}
              {this.state.editMode === false ? (
                <td>{this.state.act}</td>
              ) : (
                <td>
                  <input
                    type="text"
                    name="act"
                    value={this.state.act}
                    onChange={this.handleChange}
                  />
                </td>
              )}
              {this.state.editMode === false ? (
                <td>{this.state.desiredMajor}</td>
              ) : (
                <td>
                  <input
                    type="text"
                    name="desiredMajor"
                    value={this.state.desiredMajor}
                    onChange={this.handleChange}
                  />
                </td>
              )}
            </tr>
          </tbody>
        </Table>
        {this.state.editMode === false ? (
          <button
            className="float-right profileCardButtonOpacity"
            type="button"
            onClick={this.editField}
          >
            Edit
          </button>
        ) : (
          <button
            className="float-right"
            type="button"
            onClick={this.editField}
          >
            Save
          </button>
        )}
      </div>
    );
  }
}

export default AcademicTable;
