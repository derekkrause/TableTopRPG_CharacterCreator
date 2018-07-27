import React from "react";

class SchoolTableCells extends React.Component {
  render() {
    const tStatus = true;
    return (
      //   this will take your data along with admintable and map it out, place get all data here
      <tr key={this.props.data.id}>
        <td>
          <button
            className="btn btn-link"
            onClick={() => {
              this.props.editForm(tStatus);
            }}
          >
            Edit
          </button>
          <button className="btn btn-link">Delete</button>
        </td>

        <td>{this.props.data.name}</td>

        <td>{this.props.data.memberFrom}</td>

        <td>{this.props.data.lastLogin}</td>

        <td>{this.props.data.role}</td>

        <td>{this.props.data.role}</td>
      </tr>
    );
  }
}
export default SchoolTableCells;
