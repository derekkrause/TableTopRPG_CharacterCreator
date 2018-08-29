import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class IfLoginStatus extends React.Component {
  render() {
    const props = this.props;

    //const userType = "admin", "athlete", "coach", "advocate".split("/s*,s*/g");
    // console.log("IfLoginStatus", props);
    // console.log("userType", userType);
    if (!props.loggedIn && props.roles) {
      throw Error("You cannot use IfLoginStatus with loggedIn=false and also provide roles");
    }

    if (props.user === null) {
      return null;
    } else if (!props.loggedIn && !props.user) {
      return props.children;
    } else if (props.loggedIn && props.user) {
      if (props.isAdmin === true) {
        if (props.user.isAdmin) {
          return props.children;
        } else {
          return null;
        }
      } else {
        return props.children;
      }
    }
    return null;
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
