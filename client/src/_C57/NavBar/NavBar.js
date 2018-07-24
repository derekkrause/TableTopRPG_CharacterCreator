import React from "react";
import { Button, Form, Input, InputGroupAddon, InputGroup, InputGroupText, SearchBox } from "reactstrap";

class NavBar extends React.Component {
  state = {};

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="d-flex app-toolbar align-items-center">
        <h4>Recruit Hub</h4>
        <SearchBox styleName="d-none d-sm-block" value="" placeholder="Search here...">
          <div className="search-bar right-side-icon bg-transparent d-none d-sm-block">
            <FormGroup>
              <Input className="form-control border-0" type="search" placeholder="Search here..." />
              <Button className="search-icon">
                <i className="zmdi zmdi-search zmdi-hc-lg" />
              </Button>
            </FormGroup>
          </div>
        </SearchBox>
        <span className="icon-btn jr-menu-icon">
          <span className="menu-icon" />
        </span>
        {/* <InputGroup className="col-auto">
          <Input className="col-6" placeholder="Search..." />
          <InputGroupAddon addonType="append">
            <InputGroupText>Search</InputGroupText>
          </InputGroupAddon>
        </InputGroup> */}
      </div>
    );
  }
}

export default NavBar;
