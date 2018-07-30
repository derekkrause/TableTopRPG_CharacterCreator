import React, { Component } from "react";
import { Table } from "reactstrap";
import SchoolTableCells from "./SchoolTableCells";
import { withRouter } from "react-router-dom";

let counter = 0;

function createData(image, name, memberFrom, lastLogin, role, status) {
  counter += 1;
  return { id: counter, image, name, memberFrom, lastLogin, role, status };
}

class SchoolTable extends Component {
  state = {
    data: [
      createData(
        "http://via.placeholder.com/150x150",
        "Frozen yoghurt",
        "Member since 2008",
        "Last login yesterday",
        "Admin",
        "active"
      ),
      createData(
        "http://via.placeholder.com/150x150",
        "Ice cream sandwich",
        "Member since 2007",
        "Last login 2 min ago",
        "Operator",
        "active"
      ),
      createData(
        "http://via.placeholder.com/150x150",
        "Eclair",
        "Member since 2009",
        "Last login 5 days ago",
        "Customer",
        "active"
      ),
      createData(
        "http://via.placeholder.com/150x150",
        "Cupcake",
        "Member since 2012",
        "Last login 1 month ago",
        "Operator",
        "closed"
      ),
      createData(
        "http://via.placeholder.com/150x150",
        "Gingerbread",
        "Member since 2006",
        "Last login yesterday",
        "Customer",
        "active"
      )
    ]
  };

  render() {
    //   name your table and map your data
    const { data } = this.state;
    const tStatus = true;
    return (
      <div className="jr-card">
        <Table className="table-middle table  ">
          <thead className=" row justify-content-md-center">
            <tr>
              <td>Table Name Goes Here</td>
            </tr>
          </thead>
          <tbody>
            {data.map(user => {
              return <SchoolTableCells editForm={this.props.editForm} key={user.id} data={user} />;
            })}

            <tr>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    this.props.editForm(tStatus);
                  }}
                >
                  + Add New
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(SchoolTable);
