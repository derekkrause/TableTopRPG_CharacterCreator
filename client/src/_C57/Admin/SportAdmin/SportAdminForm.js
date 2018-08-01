import React from "react";
import { getById, addSport, updateSport } from "./SportAdminService";
import SportPosition from "./SportPositionPage/SportPosition";

class SportAdminForm extends React.Component {
  state = {
    sportsData: {}
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      getById(this.props.match.params.id)
        .then(res => {
          this.setState({
            sportsData: res.data
          });
          console.log("Good Get by ID", res.data);
        })
        .catch(() => {
          console.log("Get Id failed");
        });
    }
  }

  handleCollapseAll = keepOpen => {
    if (keepOpen == position.id) {
      this.setState({
        collapse: false
      });
    } else {
      this.setState({
        collapse: true
      });
    }
  };

  handleChange = e => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;

    this.setState({
      sportsData: {
        ...this.state.sportsData,
        [key]: value
      }
    });
  };

  handleSubmit(sportsData) {
    if (!sportsData.id) {
      this.submit(sportsData);
    } else {
      this.update(sportsData);
    }
  }

  submit = sportInfo => {
    addSport(sportInfo)
      .then(res => {
        console.log("Posted!", res.data);
        this.setState({
          sportsData: res.data
        });
        this.props.history.goBack();
      })
      .catch(() => {
        console.log("Post Failed");
      });
  };

  update = sportInfo => {
    updateSport(sportInfo)
      .then(res => {
        console.log("Updated!", res.data);
        this.setState({
          sportsData: res.data
        });
        this.props.history.goBack();
      })
      .catch(() => {
        console.log("Update Failed");
      });
  };

  updateSportsDataPositions = positions => {
    this.setState(prevState => ({
      sportsData: {
        ...prevState.sportsData,
        positions
      }
    }));
  };

  render() {
    const sportsData = this.state.sportsData;
    return (
      // Create the form you will need to conduct a put request on your table, use the layout provided that
      // we stay uniform if you have any questions please let me know - Logan
      <div className="row">
        <form className="col-12">
          <header>
            <h1>Sport Admin page</h1>
          </header>
          <div className=" form-group">
            <label>Sport Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.sportsData.name || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Sport Code:</label>
            <input
              className="form-control"
              type="text"
              name="code"
              value={this.state.sportsData.code || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              value={this.state.sportsData.gender || ""}
              onChange={this.handleChange}
            >
              <option>Choose sport gender</option>
              <option value="M">Male</option>
              <option value="W">Female</option>
              <option value="O">Other/Decline</option>
            </select>
          </div>
          <div className="form-group  ">
            <label>Activity Status</label>
            <select
              className="form-control"
              name="inactive"
              value={this.state.sportsData.inactive}
              onChange={this.handleChange || ""}
            >
              <option>Choose active status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="form-group  ">
            <label>Display Order</label>
            <select
              className="form-control"
              name="displayOrder"
              value={this.state.sportsData.displayOrder || ""}
              onChange={this.handleChange}
            >
              <option>Choose sport display order</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-10 offset-1">
            <SportPosition
              // handleCollapseAll={this.handleCollapseAll}
              sportsData={sportsData.positions}
              updateSportsDataPositions={this.updateSportsDataPositions}
            />
          </div>
          <div className=" form-group float-right">
            <button
              type="button"
              className="jr-btn btn btn-primary"
              onClick={() => this.handleSubmit(this.state.sportsData)}
            >
              Save
            </button>
            <button
              type="button"
              className="jr-btn jr-btn-default btn btn-default"
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default SportAdminForm;
