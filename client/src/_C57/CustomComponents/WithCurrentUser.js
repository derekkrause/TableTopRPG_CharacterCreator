import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class WithCurrentUser extends React.Component {
  render() {
    const props = this.props;

    if (props.user) {
      return props.children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.currentUser };
};

WithCurrentUser.propTypes = {
  children: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(WithCurrentUser);
