import React from "react";
import { Table } from "reactstrap";
import { updateAdvoAthlete, deleteAdvoAthlete, insertAdvoAthletes } from "./AdvocateServer";
import AthleteAutoSearch from "./AthleteAutoSearch";

class AdvoAthlete extends React.Component {
  state = {
    editNotes: false,
    addAthlete: false,
    advoAthleteArr: this.props.advoAthleteArr,
    athleteInfo: {}
  };

  getInputValue = e => {
    let key = e.target.name;
    let value = e.target.value;
    let checked = e.target.checked;
    this.setState(prevState => ({
      athleteInfo: {
        ...prevState.athleteInfo,
        [key]: value,
        verify: checked
      }
    }));
  };

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
  };

  selectedAthlete = aI => {
    const athleteInfo = {};
    athleteInfo.firstName = aI.FirstName;
    athleteInfo.lastName = aI.LastName;
    athleteInfo.name = aI.Name;
    athleteInfo.athleteUserId = aI.UserId;
    this.setState({
      athleteInfo: athleteInfo
    });
  };

  insertAdvoAthletes = a => {
    a.advocateUserId = this.props.advocateUserId;
    insertAdvoAthletes(a)
      .then(response => {
        console.log(response, "Added AdvoAthlete");
        a.id = response.data.item;
        const advoAthletes = [...this.state.advoAthleteArr, a];
        this.setState({
          advoAthleteArr: advoAthletes,
          athleteInfo: {},
          addAthlete: false
        });
      })
      .catch(error => {
        console.log(error, "Error");
      });
  };

  deleteAthlete = athleteId => {
    deleteAdvoAthlete(athleteId)
      .then(response => {
        console.log(response, "Deleted Athlete");
        this.setState(prevState => ({
          advoAthleteArr: prevState.advoAthleteArr.filter(a => a.id != athleteId)
        }));
      })
      .catch(error => {
        console.log(error, "error");
      });
  };

  editNotes = (e, athleteUserId) => {
    let key = e.target.name;
    let value = e.target.value;
    let checked = e.target.checked;
    this.setState(prevState => ({
      advoAthleteArr: prevState.advoAthleteArr.map(a => {
        if (a.athleteUserId == athleteUserId) {
          return {
            ...a,
            [key]: value,
            verify: checked
          };
        } else {
          return a;
        }
      })
    }));
  };

  updateNotes = payload => {
    console.log(payload, "this is the payload");
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

  render() {
    return (
      <div style={{ padding: "5%" }}>
        <Table hover style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>
                <i
                  className="zmdi zmdi-account-add zmdi-hc-fw"
                  style={{ fontSize: "20px" }}
                  onClick={() => this.addAthlete()}
                />
              </th>
              <th>Name</th>
              <th>High School</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.state.advoAthleteArr.map(a => (
              <tr key={a.id}>
                {!this.state.editNotes &&
                  a.verify && (
                    <th scope="row">
                      Verified
                      <i className="zmdi zmdi-badge-check zmdi-hc-fw" style={{ color: "#388e3c" }} />
                    </th>
                  )}
                {!this.state.editNotes &&
                  !a.verify && (
                    <th scope="row">
                      UnVerified
                      <i className="zmdi zmdi-alert-triangle zmdi-hc-fw" style={{ color: "red" }} />
                    </th>
                  )}
                {this.state.editNotes &&
                  !a.verify && (
                    <th scope="row">
                      <input
                        type="checkbox"
                        name="verify"
                        value={a.verify}
                        onChange={e => this.editNotes(e, a.athleteUserId)}
                      />
                      <label htmlFor="verify">Verify Athlete</label>
                      <i className="zmdi zmdi-badge-check zmdi-hc-fw" />
                    </th>
                  )}
                {this.state.editNotes &&
                  a.verify && (
                    <th scope="row">
                      <input
                        type="checkbox"
                        name="verify"
                        value={a.verify}
                        onChange={e => this.editNotes(e, a.athleteUserId)}
                        checked
                      />
                      <label htmlFor="verify">Verify Athlete</label>
                      <i className="zmdi zmdi-badge-check zmdi-hc-fw" />
                    </th>
                  )}
                <td>
                  {a.firstName} {a.lastName}
                  {""}
                </td>
                <td>{a.name}</td>
                <td>
                  {this.state.editNotes ? (
                    <div>
                      <input
                        type="text"
                        name="notes"
                        onChange={e => this.editNotes(e, a.athleteUserId)}
                        value={a.notes || ""}
                        size="25"
                      />
                      <i className="zmdi zmdi-close zmdi-hc-fw float-right" onClick={() => this.deleteAthlete(a.id)} />
                      <i className="zmdi zmdi-edit zmdi-hc-fw float-right" onClick={() => this.updateNotes(a)} />
                    </div>
                  ) : (
                    <div>
                      {a.notes}{" "}
                      <i className="zmdi zmdi-close zmdi-hc-fw float-right" onClick={() => this.deleteAthlete(a.id)} />
                      <i className="zmdi zmdi-edit zmdi-hc-fw float-right" onClick={() => this.updateNotes(a)} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {this.state.addAthlete && (
              <tr>
                <th scope="row">
                  <input
                    type="checkbox"
                    name="verify"
                    value={this.state.athleteInfo.verify}
                    onChange={e => this.getInputValue(e)}
                  />
                  <label htmlFor="verify">Verify Athlete</label>
                  <i className="zmdi zmdi-badge-check zmdi-hc-fw" />
                </th>
                <td style={{ width: "180px" }}>
                  <AthleteAutoSearch selectedAthlete={aI => this.selectedAthlete(aI)} />
                </td>
                <td>{this.state.athleteInfo.name}</td>
                <td>
                  <input
                    type="text"
                    name="notes"
                    size="30"
                    placeholder="Notes..."
                    onChange={e => this.getInputValue(e)}
                    value={this.state.athleteInfo.notes || ""}
                  />
                  <i
                    className="zmdi zmdi-check zmdi-hc-fw float-right"
                    style={{ fontSize: "24px" }}
                    onClick={() => this.insertAdvoAthletes(this.state.athleteInfo)}
                  />
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
