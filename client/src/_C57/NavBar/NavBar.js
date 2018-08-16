import React from "react";
import "./NavStyle.css";
import { Button, Collapse, FormGroup, Input, Select } from "reactstrap";
import { userLogout } from "../../services/registerLogin.service";
import { currentUser } from "../../services/currentUser.service";
import { NavLink, withRouter } from "react-router-dom";
import AthleteSearchFilter from "./AthleteSearchFilter";
import EventSearchFilter from "./EventSearchFilter";
import CoachSearchFilter from "./CoachSearchFilter";
import ArticleSearchFilter from "./ArticleSearchFilter";
import SchoolSearchFilter from "./SchoolSearchFilter";
import VenueSearchFilter from "./VenueSearchFilter";
import { connect } from "react-redux";

class NavBar extends React.Component {
  handleTypeAheadChange = name => values => {
    this.setCriteriaProperties({
      [name]: values
    });
  };
  handleDateChange = (selectedDate, name) => {
    this.setCriteriaProperties({
      [name]: selectedDate
    });
  };

  setCriteriaProperties = properties => {
    this.props.setSearchCriteria({
      ...this.props.searchCriteria,
      ...properties
    });
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setCriteriaProperties({
      [key]: val
    });
  };

  toggle = () => {
    console.log("clicked");
    this.setCriteriaProperties({ collapsed: !this.props.searchCriteria.collapsed });
  };
  componentDidMount() {
    console.log(this.props);
  }

  logout = () => {
    userLogout().then(currentUser);
  };
  componentDidMount() {
    console.log(this.props);
  }

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
                value={this.props.searchCriteria.searchType}
                id="exampleSelect"
                onChange={this.handleChange}
              >
                <option value="all" selected={() => this.setCriteriaProperties({ collapsed: true })}>
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
                  onChange={this.handleChange}
                  value={this.props.searchCriteria.searchString}
                />
                <NavLink to={`${this.props.match.url}/search/${this.props.searchCriteria.searchType}`}>
                  <Button className="search-icon">
                    <i className="zmdi zmdi-search zmdi-hc-lg" />
                  </Button>
                </NavLink>
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
        <Collapse isOpen={!this.props.searchCriteria.collapsed}>
          {this.props.searchCriteria.searchType === "all" && <div />}
          {this.props.searchCriteria.searchType === "athletes" && (
            <AthleteSearchFilter
              className="bg-white"
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.props.searchCriteria.locationFilter}
              gradYearFilter={this.props.searchCriteria.gradYearFilter}
              sportLevelFilter={this.props.searchCriteria.sportLevelFilter}
              sportPositionFilter={this.props.searchCriteria.sportPositionFilter}
            />
          )}
          {this.props.searchCriteria.searchType === "events" && (
            <EventSearchFilter
              className="bg-white"
              handleDateChange={this.handleDateChange}
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.props.searchCriteria.locationFilter}
              eventTypeFilter={this.props.searchCriteria.eventTypeFilter}
              eventStartDateFilter={this.props.searchCriteria.eventStartDateFilter}
              eventEndDateFilter={this.props.searchCriteria.eventEndDateFilter}
            />
          )}
          {this.props.searchCriteria.searchType === "coaches" && (
            <CoachSearchFilter
              className="bg-white"
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.props.searchCriteria.locationFilter}
              schoolNameFilter={this.props.searchCriteria.schoolNameFilter}
              sportLevelFilter={this.props.searchCriteria.sportLevelFilter}
              coachTitleFilter={this.props.searchCriteria.coachTitleFilter}
            />
          )}
          {this.props.searchCriteria.searchType === "articles" && (
            <ArticleSearchFilter
              className="bg-white"
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.props.searchCriteria.locationFilter}
              articleTypeFilter={this.props.searchCriteria.articleTypeFilter}
              articleTagFilter={this.props.searchCriteria.articleTagFilter}
            />
          )}
          {this.props.searchCriteria.searchType === "schools" && (
            <SchoolSearchFilter
              className="bg-white"
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.props.searchCriteria.locationFilter}
              sportLevelFilter={this.props.searchCriteria.sportLevelFilter}
            />
          )}
          {this.props.searchCriteria.searchType === "venues" && (
            <VenueSearchFilter
              className="bg-white"
              handleChange={this.onChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.props.searchCriteria.locationFilter}
              eventTypeFilter={this.props.searchCriteria.eventTypeFilter}
            />
          )}
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchCriteria: state.searchCriteria
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchCriteria: searchCriteria => dispatch({ type: "SET_SEARCH_CRITERIA", searchCriteria })
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
