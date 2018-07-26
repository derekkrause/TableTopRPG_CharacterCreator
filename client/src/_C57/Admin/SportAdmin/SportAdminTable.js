import React, { Component } from "react";
import { Table } from "reactstrap";
import SportAdminTableCells from "./SportAdminTableCells";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAllSports, deleteSport } from "./SportAdminService";

class SportAdminTable extends Component {
  state = {
    Code: "",
    Name: "",
    DisplayOrder: 1,
    Inactive: true,
    Gender: "",
    sports: []
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    getAllSports()
      .then(res => {
        console.log("Good Get All!", res.data);
        this.setState({
          sports: res.data
        });
      })
      .catch(() => {
        console.log("Get All Failed");
      });
  };

  handleDelete = id => {
    deleteSport(id).then(() => {
      console.log("deleted!");
      this.getAll();
    });
  };

  render() {
    //   name your table and map your data
    const { sports } = this.state;
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Sports</h3>
        <Table className="table-middle table float-left ">
          {/* <thead className="justify-content-md-center">Sports</thead> */}
          <tbody>
            <tr>
              <th />
              <th>Sport Name</th>
              <th>Sport Code</th>
              <th>Sport Gender</th>
              <th>Active Status</th>
              <th>Display Order</th>
            </tr>
            {sports.map(sport => {
              return (
                <SportAdminTableCells key={sport.id} data={sport} handleDelete={this.handleDelete} {...this.props} />
              );
            })}
            <tr>
              <td>
                <NavLink to={`${this.props.match.url}/create`}>
                  <button className="btn btn-link">+ Add New</button>
                </NavLink>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
export default withRouter(SportAdminTable);
