import React from "react";
import { Table } from "reactstrap";
import { updateTeam, deleteTeam, deleteAdvoTeam } from "./AdvocateServer";

class Teams extends React.Component {
  state = {
    editTeam: false,
    teamArr: this.props.teamArr
  };

  editToggle = payload => {
    if (this.state.editTeam) {
      updateTeam(payload)
        .then(response => {
          console.log(response, "Updated");
        })
        .catch(error => {
          console.log(error, "error");
        });
      this.setState({
        editTeam: false
      });
    } else {
      this.setState({
        editTeam: true
      });
    }
  };

  teamInput = (e, teamId) => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      teamArr: prevState.teamArr.map(t => {
        if (t.id == teamId)
          return {
            ...t,
            [key]: value
          };
        else {
          return t;
        }
      })
    }));
  };

  deleteTeam = teamId => {
    deleteAdvoTeam(teamId)
      .then(response => {
        console.log(response, "AdvoTeam Deleted");
        deleteTeam(teamId)
          .then(response => {
            console.log(response, "Team Deleted");
            this.setState(prevState => ({
              teamArr: prevState.teamArr.filter(t => t.id != teamId)
            }));
          })
          .catch(error => {
            console.log(error, "Error");
          });
      })
      .catch(error => {
        console.log(error, "Error");
      });
  };

  render() {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>SchoolId#</th>
            <th>Teams</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {this.state.teamArr.map(t => (
            <tr key={t.id}>
              <th scope="row">{t.schoolId}</th>
              <td>
                {this.state.editTeam ? (
                  <div>
                    <input type="text" name="name" onChange={e => this.teamInput(e, t.id)} value={t.name || ""} />
                  </div>
                ) : (
                  <div>{t.name}</div>
                )}
              </td>
              <td>
                {this.state.editTeam ? (
                  <div>
                    <input type="text" name="city" onChange={e => this.teamInput(e, t.id)} value={t.city || ""} />
                  </div>
                ) : (
                  <div>{t.city}</div>
                )}
              </td>
              <td>
                {this.state.editTeam ? (
                  <div>
                    <input type="text" name="state" onChange={e => this.teamInput(e, t.id)} value={t.state || ""} />
                  </div>
                ) : (
                  <div>{t.state}</div>
                )}
              </td>
              <td>
                {this.state.editTeam ? (
                  <div>
                    <input type="number" name="zip" onChange={e => this.teamInput(e, t.id)} value={t.zip || ""} />
                    <i className="zmdi zmdi-edit zmdi-hc-fw" onClick={() => this.editToggle(t)} />
                    <i className="zmdi zmdi-close zmdi-hc-fw float-right" onClick={() => this.deleteTeam(t.id)} />
                  </div>
                ) : (
                  <div>
                    {t.zip}
                    <i className="zmdi zmdi-close zmdi-hc-fw float-right" onClick={() => this.deleteTeam(t.id)} />
                    <i className="zmdi zmdi-edit zmdi-hc-fw" onClick={() => this.editToggle(t)} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Teams;
