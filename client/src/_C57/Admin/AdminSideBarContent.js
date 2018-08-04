import React from "react";
import CustomScrollbars from "../../util/CustomScrollbars";

import { withRouter, NavLink } from "react-router-dom";

class AdminSideBarContent extends React.Component {
  state = {
    schoolList: false
  };

  toggleClass = () => {
    console.log("works");
    if (this.state.schoolList == false) {
      this.setState({ schoolList: true });
    } else {
      this.setState({ schoolList: false });
    }
  };

  doesThisWork = () => {
    console.log("Yes");
  };
  render() {
    return (
      <CustomScrollbars
        className="scrollbar jr-card nav-menu"
        style={{
          height: "calc(100vh - 70px)",

          marginRight: "5px"
        }}
      >
        <div
          className="row justify-content-md-center "
          style={{
            marginTop: "20px",
            paddingBottom: "9px",
            borderBottom: "solid, gray, 1px"
          }}
        >
          <h1> Admin List </h1>
        </div>
        <div>
          {/* This is where you will input a link into the data you want displayed, make it a link that will change out the admin page */}

          <div>
            {/* This is where you will input a link into the data you want displayed, make it a link that will change out the admin page */}

            <ul>
              <li className="menu ">
                <button className="btn btn-link dropdown-toggle" onClick={this.toggleClass}>
                  Schools
                </button>

                {this.state.schoolList && (
                  <React.Fragment>
                    <ul>
                      <li>
                        <NavLink to={`${this.props.match.url}/school`}>College</NavLink>
                      </li>
                      <li>
                        <NavLink to={`${this.props.match.url}/school`}>High School</NavLink>
                      </li>
                    </ul>
                  </React.Fragment>
                )}
              </li>
              <li>
                <NavLink to={`${this.props.match.url}/sports`}>
                  <button className="btn btn-link" style={{ marginTop: "10px" }}>
                    Sports
                  </button>
                </NavLink>
              </li>
              <li>
                <button className="btn btn-link" style={{ marginTop: "10px" }}>
                  <NavLink to={`${this.props.match.url}/classyear`}>Class Year</NavLink>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </CustomScrollbars>
    );
  }
}

export default withRouter(AdminSideBarContent);
