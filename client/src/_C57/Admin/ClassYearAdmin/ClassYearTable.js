import React from "react";
import { Table } from "reactstrap";
import "./Css/ClassYearTable.css";

class ClassYearTable extends React.Component {
  state = {
    addedValues: this.props.classDatabase
  };

  render() {
    return (
      <div className="jr-card ClassYearTable">
        <button type="button" className="btn btn-link ClassYearTable" onClick={this.props.addFormToggle}>
          <i className="zmdi zmdi-account-add" /> Create New <br /> Class Year
        </button>
        <Table className="table-middle table ClassYearTable" hover>
          <thead className="row justify-content-md-center ClassYearTable">
            <tr>
              <th className="ClassYearTable">
                <h1>Class Year List</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.addedValues &&
              this.state.addedValues.map(data => (
                <tr key={data.id}>
                  <td className="ClassYearTable">
                    <button
                      type="button"
                      className="btn btn-link ClassYearTable"
                      onClick={() => this.props.editFormToggle(data.id)}
                    >
                      Edit
                    </button>
                    {data.name}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ClassYearTable;
