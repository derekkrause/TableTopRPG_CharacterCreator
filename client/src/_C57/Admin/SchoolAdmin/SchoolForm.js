import React from "react";

const fStatus = false;

class SchoolForm extends React.Component {
  render() {
    return (
      // Create the form you will need to conduct a put request on your table, use the layout provided that
      // we stay uniform if you have any questions please let me know - Logan
      <div className="jr-card col-8">
        <form>
          <header>
            <h1>Admin page</h1>
          </header>
          <div className=" form-group">
            <label>First name:</label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-group  ">
            <label>User type</label>
            <select className="form-control">
              <option>Choose your user type</option>
              <option value="1">Athlete</option>
              <option value="2">Coach</option>
              <option value="3">Advocate</option>
              <option value="4">Coach for hire</option>
              {/* <option value="5">College/University</option> */}
            </select>
          </div>
          <div className=" form-group">
            <label>Email:</label>
            <input className="form-control" type="text" />
          </div>
          <div className=" form-group">
            <label>Password:</label>
            <input className="form-control" type="text" />
          </div>
          <div className=" form-group">
            <label>Confirm password:</label>
            <input className="form-control" type="text" />
          </div>

          <div className=" form-group float-right">
            <button type="button" className="btn btn-success">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                this.props.editForm(fStatus);
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

export default SchoolForm;
