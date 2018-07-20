import React from "react";
import axios from "axios";

class CoachForm extends React.Component {
  state = {
    title: "",
    schoolName: "",
    bio: ""
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const coachInfo = {
      userId: 99,
      title: this.state.title,
      schoolId: this.state.schoolName,
      shortBio: this.state.bio
    };

    axios.defaults.withCredentials = true;

    axios
      .post(`http://localhost:8080/node-api/server.js/api/coaches/`, coachInfo)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="jr-card">
              <h1 className="card-header text-center">Coach Info</h1>

              <form>
                <div className="row justify-content-center mt-2">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="schoolName"
                      value={this.state.schoolName}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="School Name"
                    />
                  </div>
                </div>
                <div className="row justify-content-center mt-2">
                  <div className="col-md-12">
                    <textarea
                      name="bio"
                      value={this.state.bio}
                      onChange={this.handleChange}
                      className="form-control"
                      rows="8"
                      placeholder="Your bio here..."
                    />
                    <button
                      type="submit"
                      className="btn-lg btn-primary float-right mt-2"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoachForm;
