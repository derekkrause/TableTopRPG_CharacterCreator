import React from "react";
import "./NavStyle.css";
import { Button, Collapse, FormGroup, Input, Select } from "reactstrap";
import { userLogout } from "../../services/registerLogin.service";
import { currentUser } from "../../services/currentUser.service";
import AthleteSearchFilter from "./AthleteSearchFilter";
import EventSearchFilter from "./EventSearchFilter";
import CoachSearchFilter from "./CoachSearchFilter";
import ArticleSearchFilter from "./ArticleSearchFilter";
import SchoolSearchFilter from "./SchoolSearchFilter";
import VenueSearchFilter from "./VenueSearchFilter";
import TopBar from "./TopNav";

class NavBar extends React.Component {
  state = {
    collapsed: true,
    search: "",
    searchString: "",
    searchType: "all",
    //-----------Filter States----------------
    locationFilter: "",
    gradYearFilter: "",
    sportLevelFilter: "",
    sportPositionFilter: "",
    schoolFilter: "",
    coachTitleFilter: "",
    eventTypeFilter: "",
    eventStartDateFilter: "",
    eventEndDateFilter: "",
    venueTypeFilter: "",
    articleTypeFilter: "",
    articleTagFilter: ""
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  logout = () => {
    userLogout().then(currentUser);
  };

  handleTypeAheadChange = name => values => {
    this.setState({
      [name]: values
    });
  };
  handleDateChange = (selectedDate, name) => {
    this.setState({
      [name]: selectedDate
    });
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <div>
        <div className="app-main-header appNav">
          <div className="d-flex app-toolbar align-items-center justify-content-center mx-md-3 m-0">
            <h4 className="mb-0 mr-auto">
              <b>Hub Scout</b>
            </h4>
            <button onClick={this.logout}>Logout</button>
            <div className="search-bar d-flex mx-sm-3 mx-1">
              <select
                className="selectpicker"
                type="select"
                data-width="fit"
                data-style="btn-primary"
                name="searchType"
                value={this.state.searchType}
                id="exampleSelect"
                onChange={this.onChange}
              >
                <option value="all" selected={() => this.setState({ collapsed: true })}>
                  All
                </option>
                <option value="athletes">Athletes</option>
                <option value="coaches">Coaches</option>
                <option value="schools">Schools</option>
                <option value="events">Events</option>
                <option value="venues">Venues</option>
                <option value="articles">Articles</option>
              </select>
              <FormGroup>
                <Input
                  className="form-control border-0 searchInput search-input-flash"
                  type="search"
                  name="searchString"
                  placeholder="Search here..."
                  onFocus={this.toggle}
                  onChange={this.onChange}
                  value={this.state.searchString}
                />
                <Button type="submit" className="search-icon">
                  <i className="zmdi zmdi-search zmdi-hc-lg" />
                </Button>
              </FormGroup>
              <span
                className="icon-btn jr-menu-icon hamburger-icon-animate"
                id={"Popover-Search-Filter"}
                onClick={this.toggle}
              >
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
          {this.state.searchType === "all" && <div />}
          {this.state.searchType === "athletes" && (
            <AthleteSearchFilter
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.state.locationFilter}
              gradYearFilter={this.state.gradYearFilter}
              sportLevelFilter={this.state.sportLevelFilter}
              sportPositionFilter={this.state.sportPositionFilter}
            />
          )}
          {this.state.searchType === "events" && (
            <EventSearchFilter
              handleDateChange={this.handleDateChange}
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.state.locationFilter}
              eventTypeFilter={this.state.eventTypeFilter}
              eventStartDateFilter={this.state.eventStartDateFilter}
              eventEndDateFilter={this.state.eventEndDateFilter}
            />
          )}
          {this.state.searchType === "coaches" && (
            <CoachSearchFilter
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.state.locationFilter}
              schoolNameFilter={this.state.schoolNameFilter}
              sportLevelFilter={this.state.sportLevelFilter}
              coachTitleFilter={this.state.coachTitleFilter}
            />
          )}
          {this.state.searchType === "articles" && (
            <ArticleSearchFilter
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.state.locationFilter}
              articleTypeFilter={this.state.articleTypeFilter}
              articleTagFilter={this.state.articleTagFilter}
            />
          )}
          {this.state.searchType === "schools" && (
            <SchoolSearchFilter
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.state.locationFilter}
              sportLevelFilter={this.state.sportLevelFilter}
            />
          )}
          {this.state.searchType === "venues" && (
            <VenueSearchFilter
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.state.locationFilter}
              eventTypeFilter={this.state.eventTypeFilter}
            />
          )}
        </Collapse>
      </div>
    );
  }
}

export default NavBar;
