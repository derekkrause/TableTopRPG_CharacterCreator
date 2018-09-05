import React, { Redirect } from "react";
import "./NavStyle.css";
import { Button, Collapse, FormGroup, Input } from "reactstrap";
import { userLogout } from "../../services/registerLogin.service";
import { currentUser } from "../../services/currentUser.service";
import { NavLink, withRouter, Link } from "react-router-dom";
import AthleteSearchFilter from "./AthleteSearchFilter";
import EventSearchFilter from "./EventSearchFilter";
import CoachSearchFilter from "./CoachSearchFilter";
import ArticleSearchFilter from "./ArticleSearchFilter";
import SchoolSearchFilter from "./SchoolSearchFilter";
import VenueSearchFilter from "./VenueSearchFilter";
import { connect } from "react-redux";
import PopoverNavBar from "./PopoverNavBar";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Notifications from "./Notifications";

class NavBar extends React.Component {
  state = {
    dropdownListValue: "",
    searchStringN: "",
    currentUser: {},
    searchCriteria: {}
  };

  checkSportFilter = () => {
    if (this.props.searchCriteria.sportFilter == null) {
      this.setCriteriaProperties({
        sportFilter: this.props.currentUser.currentSportId
      });
    }
  };

  setDropdownProperties = properties => {
    this.props.setDropdownValues({
      ...this.props.dropDownOptions,
      ...properties
    });
  };
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

  handleCurrentSportChange = e => {
    this.setCriteriaProperties({
      sportFilter: e.target.value
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

    if (key === "searchType") {
      this.setCriteriaProperties({
        [key]: val
      });

      this.handleChangeDropdownList(e);
    } else if (key === "searchString") {
      this.setState({ searchStringN: val });
    } else {
      this.setCriteriaProperties({
        [key]: val
      });
    }
  };

  handleChangeDropdownList = e => {
    let value = e.target.value;

    this.setState({ dropdownListValue: value }, () => {
      const { dropdownListValue } = this.state;
      let newRoute;

      switch (dropdownListValue) {
        case "all":
          newRoute = `${this.props.match.url}/search/all`;
          break;
        case "athletes":
          newRoute = `${this.props.match.url}/search/athletes`;
          break;
        case "coaches":
          newRoute = `${this.props.match.url}/search/coaches`;
          break;
        case "schools":
          newRoute = `${this.props.match.url}/search/schools`;
          break;
        case "events":
          newRoute = `${this.props.match.url}/search/events`;
          break;
        case "venues":
          newRoute = `${this.props.match.url}/search/venues`;
          break;
        default:
          newRoute = `${this.props.match.url}/home`;
          break;
      }

      this.setState({ searchStringN: "" });

      this.setCriteriaProperties({ searchString: "" });

      this.goNewRoute(newRoute);
    });
  };

  handleKeyPress = e => {
    //console.log("key pressed", e.which);

    let name = e.target.name;
    let value = e.target.value;

    if (e.which === 13 && name === "searchString") {
      // this.props.history.push(`${this.props.match.url}/search/${this.props.searchCriteria.searchType}`);

      const { searchStringN, dropdownListValue } = this.state;
      const newPushRoute = `${this.props.match.url}/search/${dropdownListValue}`;

      this.setCriteriaProperties({ searchString: searchStringN, searchType: dropdownListValue });

      this.goNewRoute(newPushRoute);
    }
  };

  handlerLink = () => {
    // For link to /home

    this.setState({ searchStringN: "", dropdownListValue: "all" });

    this.setCriteriaProperties({ searchString: "", searchType: "all" });
  };

  handlerNavLink = () => {
    const { dropdownListValue, searchStringN } = this.state;

    this.setCriteriaProperties({ searchString: searchStringN, searchType: dropdownListValue });
  };

  goNewRoute = newRoute => {
    const { dropdownListValue, searchStringN } = this.state;
    const currentLocation = this.props.history.location.pathname;

    if (newRoute !== currentLocation) {
      this.setCriteriaProperties({ searchString: searchStringN, searchType: dropdownListValue });

      this.props.history.push(newRoute);
    }
  };

  toggle = () => {
    //console.log("Refine Search Filter: clicked");
    this.setCriteriaProperties({ collapsed: !this.props.searchCriteria.collapsed });
  };

  /* UNCOMMENT THIS IF YOU NEED TO CHECK THIS.PROPS */
  componentDidMount() {
    //   console.log("componentDidMount 1", this.props);

    const { currentUser, searchCriteria } = this.props;

    this.setState({
      currentUser: currentUser,
      searchCriteria: searchCriteria,
      searchStringN: "",
      dropdownListValue: "all"
    });
    if (this.props.currentUser !== null) {
      this.checkSportFilter();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      const { currentUser, searchCriteria } = this.props;

      this.setState({ currentUser: currentUser, searchCriteria: searchCriteria });
    }
  }

  logout = () => {
    userLogout().then(() => {
      currentUser().then(() => this.props.history.push(`${this.props.match.url}/welcome`));
      NotificationManager.info("Successfully logged out", "", 2000);
    });
  };

  render() {
    return (
      <div className="shadow">
        <NotificationContainer />
        <div className="app-main-header appNav navigation justify-content-center">
          <div className="centre">
            <div className="row align-items-center justify-content-between justify-content-md-center p-2 m-0">
              <div className="col-1 justify-content-start order-md-1 order-1 px-0 mb-2 mt-1 my-md-2">
                <Link to={`${this.props.match.url}/home`} replace={true} onClick={this.handlerLink}>
                  <picture>
                    <source
                      media="(min-width: 80px)"
                      srcSet="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo.png, https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo@2x.png 2x"
                    />
                    <img
                      src="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo.png"
                      srcSet="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo@2x.png 2x"
                      alt="..."
                    />
                  </picture>
                </Link>
              </div>
              <div className="col-md-7 pl-2 pr-2 pl-md-4 order-md-2 order-3 col-12 mb-1 mt-2 mb-md-2 ">
                <div className="d-flex align-items-center">
                  <div className="search-bar d-flex mx-sm-3 mx-0">
                    <select
                      className="selectpicker rounded-left border-right border-bottom-0 border-top-0 border-left-0 pl-1"
                      type="select"
                      data-width="fit"
                      data-style="btn-primary"
                      name="searchType"
                      value={this.state.dropdownListValue}
                      id="exampleSelect"
                      onChange={this.handleChange}
                    >
                      {/*THIS OPTION MUST STAY HERE SO THE 'ALL' OPTION DOESN'T DISAPPEAR*/}
                      {/* <option />  */}
                      <option value="all">All</option>
                      <option value="athletes">Athletes</option>
                      <option value="coaches">Coaches</option>
                      <option value="schools">Schools</option>
                      <option value="events">Events</option>
                      <option value="venues">Venues</option>
                      {/* <option value="articles">Articles</option> */}
                    </select>

                    <FormGroup>
                      <Input
                        className="form-control border-0 searchInput search-input-flash"
                        type="search"
                        name="searchString"
                        placeholder="Search here..."
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        // value={this.props.searchCriteria.searchString}
                        value={this.state.searchStringN}
                      />
                      <NavLink
                        to={`${this.props.match.url}/search/${this.props.searchCriteria.searchType}`}
                        replace={true}
                        onClick={this.handlerNavLink}
                      >
                        <Button className="search-icon pb-3">
                          <i className="zmdi zmdi-search zmdi-hc-lg" />
                        </Button>
                      </NavLink>
                    </FormGroup>
                  </div>
                  <div id={"Popover-Search-Filter"} onClick={this.toggle} className="pl-2 pl-md-0 pointer">
                    <i className="zmdi zmdi-filter-list zmdi-hc-2x text-white" title="Filter" />
                  </div>
                </div>
              </div>
              <div className="col-md-4 order-md-3 order-2 col-6 pr-0">
                <div className="d-flex justify-content-end align-items-center">
                  <Notifications />
                  <div className="pointer px-3 px-md-3 mr-md-2">
                    <Link to={`${this.props.match.url}/messaging`}>
                      <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-2x text-white" />
                    </Link>
                  </div>

                  <div className="px-2 ">
                    <Link to={`${this.props.match.url}/profile/${this.props.currentUser.id}`}>
                      <img className="rs-user-pic-sm border-white" src={this.props.currentUser.avatarUrl} />
                    </Link>
                  </div>
                  <div>
                    <PopoverNavBar logout={this.logout} url={this.props.match.url} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Collapse style={{ backgroundColor: "white" }} isOpen={!this.props.searchCriteria.collapsed}>
          {this.props.searchCriteria.searchType === "all" && <div />}
          {this.props.searchCriteria.searchType === "athletes" && (
            <AthleteSearchFilter
              className="bg-white"
              handleChange={this.onChange}
              handleKeyPress={this.handleKeyPress}
              handleTypeAheadChange={this.handleTypeAheadChange}
              handleCurrentSportChange={this.handleCurrentSportChange}
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
              handleKeyPress={this.handleKeyPress}
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
              handleKeyPress={this.handleKeyPress}
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
              handleKeyPress={this.handleKeyPress}
              handleTypeAheadChange={this.handleTypeAheadChange}
              locationFilter={this.props.searchCriteria.locationFilter}
              articleTypeFilter={this.props.searchCriteria.articleTypeFilter}
              articleTagFilter={this.props.searchCriteria.articleTagFilter}
            />
          )}
          {this.props.searchCriteria.searchType === "schools" && (
            <SchoolSearchFilter
              className="bg-white"
              handleChange={this.handleChange}
              handleKeyPress={this.handleKeyPress}
              handleTypeAheadChange={this.handleTypeAheadChange}
              //locationFilter={this.props.searchCriteria.locationFilter}
              //sportLevelFilter={this.props.searchCriteria.sportLevelFilter}
              searchCriteria={this.props.searchCriteria}
            />
          )}
          {this.props.searchCriteria.searchType === "venues" && (
            <VenueSearchFilter
              handleChange={this.handleChange}
              handleTypeAheadChange={this.handleTypeAheadChange}
              searchCriteria={this.props.searchCriteria}
            />
          )}
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchCriteria: state.searchCriteria,
    currentUser: state.currentUser,
    dropDownOptions: state.dropDownOptions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDropdownValues: dropdownOptions => dispatch({ type: SET_DROPDOWN_VALUES, dropdownOptions }),
    setSearchCriteria: searchCriteria => dispatch({ type: "SET_SEARCH_CRITERIA", searchCriteria })
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
