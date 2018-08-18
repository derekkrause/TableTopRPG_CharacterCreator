import React from "react";

class Logout extends React.Component {
  render() {
    return (
      <button className="d-none d-sm-block" onClick={this.props.logout}>
        Logout
      </button>
    );
  }
}
export default Logout;
