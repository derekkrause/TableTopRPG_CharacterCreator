import React from "react";
import "./NavStyle.css";
import { Button, Collapse, FormGroup, Input } from "reactstrap";
import SearchBarFilter from "./SearchBarFilter.js";

class NavBar extends React.Component {
  state = {
    collapsed: true,
    search: ""
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <div>
        <div className="app-main-header appNav">
          <div className="d-flex app-toolbar align-items-center justify-content-center mx-md-3 m-0">
            <h4 className="mb-0 mr-auto">Recruit Hub</h4>
            <div className="search-bar d-flex mx-sm-3 mx-1">
              <FormGroup>
                <Input
                  className="form-control border-0 searchInput"
                  type="search"
                  name="search"
                  placeholder="Search here..."
                />
                <Button className="search-icon">
                  <i className="zmdi zmdi-search zmdi-hc-lg" />
                </Button>
              </FormGroup>
              <span className="icon-btn jr-menu-icon" id={"Popover-Search-Filter"} onClick={this.toggle}>
                <span className="menu-icon" />
              </span>
            </div>
            <ul className="header-notifications list-inline ml-3 d-none d-sm-block">
              <li className="list-inline-item pointer">
                <i className="zmdi zmdi-notifications-active zmdi-hc-lg zmdi-hc-fw" />
              </li>
              <li className="list-inline-item pointer">
                <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-fw" />
              </li>
            </ul>
            <img
              className="avatar-sm rounded-circle ml-0 ml-sm-3 ml-lg-5 d-block pointer"
              src="http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png"
            />
          </div>
        </div>
        <Collapse isOpen={!this.state.collapsed}>
          <SearchBarFilter />
        </Collapse>
      </div>
    );
  }
}

export default NavBar;
