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

// const role = "admin,athlete, coach, advocate".split(/\s*,\s*/g);
// for (var i = 0; i < role.length; i++) {
//   if (props.role !== "admin" && props.isAdmin) {
//     console.log("USER TYPE SPLITED", props.role);
//     if (props.role === "athlete" && props.isAthlete) {
//       console.log("IS IT ATHLETE?", props.role);
//       return props.children;
//     } else if (props.role === "coach" && props.isCoach) {
//       console.log("IS IT COACH?", props.role);
//       return props.children;
//     } else if (props.role === "advocate" && props.isAdvocate) {
//       console.log("IS IT ADVOCATE?", props.role);
//       return props.children;
//     } else {
//       console.log("IS IT NULL?", props.role);
//       return null;
//     }
//   } else {
//     console.log("IS IT ADMIN?", props.role);
//     return props.children;
//   }
// }

// if (!props.isAdmin) {
//   console.log("USER TYPE SPLITED", props.role);
//   if (props.isAthlete) {
//     console.log("IS IT ATHLETE?", props.role);
//     return props.children;
//   } else if (props.isCoach) {
//     console.log("IS IT COACH?", props.role);
//     return props.children;
//   } else if (props.isAdvocate) {
//     console.log("IS IT ADVOCATE?", props.role);
//     return props.children;
//   } else {
//     console.log("IS IT NULL?", props.role);
//     return null;
//   }
// }
