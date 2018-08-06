import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class IfLoginStatus extends React.Component {
  render() {
    const props = this.props;
    // console.log("IfLoginStatus", props);

    if (props.user === null) {
      return null;
    } else if (!props.loggedIn && !props.user) {
      return props.children;
    } else if (props.loggedIn && props.user) {
      return props.children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.currentUser };
};

IfLoginStatus.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  roles: PropTypes.string
};
export default withRouter(connect(mapStateToProps)(IfLoginStatus));
