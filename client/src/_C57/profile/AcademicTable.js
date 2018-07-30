import React from "react";
import { Table, Input } from "reactstrap";
import "./profileCard.css";

class AcademicTable extends React.Component {
  state = {
    editMode: false
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
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
                <td>{this.props.gpa}</td>
              ) : (
                <td>
                  <Input type="text" name="gpa" value={this.props.gpa} onChange={this.props.handleChange} autoFocus />
                </td>
              )}
              {this.state.editMode === false ? (
                <td>{this.props.sat}</td>
              ) : (
                <td>
                  <Input type="text" name="sat" value={this.props.sat} onChange={this.props.handleChange} />
                </td>
              )}
              {this.state.editMode === false ? (
                <td>{this.props.act}</td>
              ) : (
                <td>
                  <Input type="text" name="act" value={this.props.act} onChange={this.props.handleChange} />
                </td>
              )}
              {this.state.editMode === false ? (
                <td>{this.props.desiredMajor}</td>
              ) : (
                <td>
                  <Input
                    type="text"
                    name="desiredMajor"
                    value={this.props.desiredMajor}
                    onChange={this.props.handleChange}
                  />
                </td>
              )}
            </tr>
          </tbody>
        </Table>
        {this.state.editMode === false ? (
          <button className="float-right profileCardButtonOpacity" type="button" onClick={this.editField}>
            Edit
          </button>
        ) : (
          <button className="float-right" type="button" onClick={this.editField}>
            Save
          </button>
        )}
      </div>
    );
  }
}

export default AcademicTable;
