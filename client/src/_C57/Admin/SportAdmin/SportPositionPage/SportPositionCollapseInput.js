import React from "react";

class SportPositionCollapseInput extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <input
              type="text"
              style={{ marginRight: "20px" }}
              // className="form-control"
              placeholder="Name"
              name="name"
              size="20"
              value={this.props.position.name}
              onChange={this.props.handleChange}
            />
            <strong style={{ fontSize: "20px" }}>( </strong>
            <input
              type="text"
              // className="form-control"
              placeholder="Code"
              name="code"
              size="2"
              value={this.props.position.code}
              onChange={this.props.handleChange}
            />
            <strong style={{ fontSize: "20px" }}> )</strong>
            <input
              type="checkbox"
              name="inactive"
              style={{ marginLeft: "20px" }}
              checked={this.props.position.inactive}
              value={this.props.position.inactive}
              id="inactiveCheckbox"
              onChange={this.props.handleChange}
            />
            <label htmlFor="inactiveCheckbox">Inactive</label>
          </div>
          {/* <div style={{ textAlign: "right" }}>
            <button
              type="button"
              onClick={() => {
                this.props.handleUpdate(this.props.position);
              }}
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.handleDeleteClick(this.props.position);
              }}
            >
              Delete
            </button>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
export default SportPositionCollapseInput;
