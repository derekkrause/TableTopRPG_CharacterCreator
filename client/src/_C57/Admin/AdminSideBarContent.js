import React from "react";
import CustomScrollbars from "../../util/CustomScrollbars";
import { withRouter, NavLink } from "react-router-dom";
import "./Admin.css";

class AdminSideBarContent extends React.Component {
  render() {
    return (
      <CustomScrollbars
        className="scrollbar nav-menu"
        style={{
          height: "calc(110.2vh - 81px)",
          width: "100%",
          marginRight: "5px"
        }}
      >
        <div className="row justify-content-md-center admin-header ">
          <h1>Administrator</h1>
        </div>

        <div className="admin-list-links">
          <ul className="admin-link-container">
            <li className="admin-link top-link">
              <NavLink className="link" to={`${this.props.match.url}/school`}>
                  Schools
              </NavLink>
              </li>

            <li className="admin-link">
              <NavLink className="link" to={`${this.props.match.url}/sports`}>
                    Sports
                </NavLink>
              </li>
              <li>
                <button className="btn btn-link" style={{ marginTop: "10px" }}>
                  <NavLink to={`${this.props.match.url}/classyear`}>Class Year</NavLink>
                </button>
              </li>
              <li className="menu ">
                <button className="btn btn-link dropdown-toggle" onClick={this.toggleClass}>
                  Events
                </button>
                {
                  <React.Fragment>
                    <ul>
                      <li>
                        <NavLink to={`${this.props.match.url}/eventtypes`}>Event Types</NavLink>
                      </li>
                    </ul>
                  </React.Fragment>
                }
              </li>
            </ul>
          </div>
      </CustomScrollbars>
    );
  }
}

export default withRouter(AdminSideBarContent);
