import React from "react";
import { Table } from "reactstrap";
// import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardHeader, CardBody } from "reactstrap";
import { updateAdvoAthlete } from "./AdvocateServer";

class AdvoAthlete extends React.Component {
  state = {
    editNotes: false,
    addAthlete: false
    // athleteInfo: {}
  };

  updateNotes = payload => {
    if (this.state.editNotes) {
      updateAdvoAthlete(payload)
        .then(response => {
          console.log(response, "Update");
        })
        .catch(error => {
          console.log(error, "Error");
        });
      this.setState({
        editNotes: false
      });
    } else {
      this.setState({
        editNotes: true
      });
    }
  };

  // wip
  addAthlete = () => {
    if (this.state.addAthlete) {
      this.setState({
        addAthlete: false
      });
    } else {
      this.setState({
        addAthlete: true
      });
    }
    // insertAdvoAthletes()
    // .then(response => {
    //   console.log(response, "Added AdvoAthlete")
    // })
    // .catch(error => {
    //   console.log(error, "Error");
    // })
  };

  // getInputValue = () => {
  //   let key = e.target.key;
  //   let value = e.target.value;
  //   this.setState({
  //     athleteInfo: {
  //       [key] : value
  //     }
  //   })
  // }

  deleteAthlete = () => {
    console.log("clicked wip");
  };

  render() {
    return (
      <div style={{ padding: "5%" }}>
        <Table hover style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>
                <i class="zmdi zmdi-plus zmdi-hc-fw" style={{ fontSize: "20px" }} onClick={() => this.addAthlete()} />
              </th>
              <th>Name</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.props.advoAthleteArr.map(a => (
              <tr key={a.id}>
                <th scope="row" />
                <td>
                  {a.firstName} {a.lastName}
                </td>
                <td>
                  {this.state.editNotes ? (
                    <div>
                      <input
                        type="text"
                        name="notes"
                        onChange={e => this.props.editNotes(e, a.athleteUserId)}
                        value={a.notes || ""}
                        size="25"
                      />
                      <i className="zmdi zmdi-close zmdi-hc-fw float-right" onClick={() => this.deleteAthlete()} />
                      <i className="zmdi zmdi-edit zmdi-hc-fw float-right" onClick={() => this.updateNotes(a)} />
                    </div>
                  ) : (
                    <div>
                      {a.notes}{" "}
                      <i className="zmdi zmdi-close zmdi-hc-fw float-right" onClick={() => this.deleteAthlete()} />
                      <i className="zmdi zmdi-edit zmdi-hc-fw float-right" onClick={() => this.updateNotes(a)} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {this.state.addAthlete && (
              <tr>
                <th scope="row" />
                <td>
                  <input type="text" name="firstName" size="10" placeholder="First Name" /> &nbsp;
                  <input type="text" name="lastName" size="10" placeholder="Last Name" />
                </td>
                <td>
                  <input type="text" name="notes" size="25" placeholder="Notes" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AdvoAthlete;
