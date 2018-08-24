import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import IfLoginStatus from "../../CustomComponents/IfLoginStatus";
import { connect } from "react-redux";

class PopoverNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <Button
          id={"Popover-" + this.props.popover}
          onClick={this.toggle}
          className="ash"
          style={{ background: "#388e3c", borderColor: "#388e3c" }}
        >
          <i className="zmdi zmdi-more-vert zmdi-hc-2x text-white" />
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.popover}
          toggle={this.toggle}
        >
          <PopoverBody>
            <IfLoginStatus loggedIn={true} isAdmin={true}>
              <div className="p-1">
                <Link to={`${this.props.url}/admin`}>
                  <div className="btn m-auto px-1 ash text-red" onClick={this.toggle}>
                    <i className="zmdi zmdi-flag zmdi-hc-fw mr-1" />
                    Admin
                  </div>
                </Link>
              </div>
            </IfLoginStatus>
            {this.props.currentUser.isCoach === true && (
              <div className="p-1">
                <Link to={`${this.props.url}/coach-fav`}>
                  <div className="btn m-auto px-1 ash" onClick={this.toggle}>
                    <i className="zmdi zmdi-label-alt-outline zmdi-hc-fw mr-1" />
                    Favorite Athletes
                  </div>
                </Link>
              </div>
            )}
            {this.props.currentUser.isAthlete === true && (
              <div className="p-1">
                <Link to={`${this.props.url}/fav-page`}>
                  <div className="btn m-auto px-1 ash" onClick={this.toggle}>
                    <i className="zmdi zmdi-label-alt-outline zmdi-hc-fw mr-1" />
                    Favorite Schools
                  </div>
                </Link>
              </div>
            )}
            <div className=" p-1">
              <Link to="faqs-page">
                <div className="btn m-auto px-1 ash" onClick={this.toggle}>
                  <i className="zmdi zmdi-help-outline zmdi-hc-fw mr-1" />
                  FAQ
                </div>
              </Link>
            </div>
            <div className=" p-1">
              <Link to="settings">
                <div className="btn m-auto px-1 ash" onClick={this.toggle}>
                  <i className="zmdi zmdi-settings zmdi-hc-fw mr-1" />
                  Settings
                </div>
              </Link>
            </div>
            <div className="dropdown-divider" />
            <div className="mt-2 p-1">
              <div className="btn m-auto px-1 ash text-muted" onClick={this.props.logout}>
                <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1" />
                LogOut
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}
export default withRouter(connect(mapStateToProps)(PopoverNavBar));
