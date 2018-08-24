import React from "react";
import { withRouter, Route, Switch, PrivateRoute, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "components/Footer";
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION
} from "constants/ActionTypes";
import { isIOS, isMobile } from "react-device-detect";
import asyncComponent from "util/asyncComponent";
import TopNav from "_C57/NavBar/TopNav.js";
import { Header } from "reactstrap";
import { NotificationContainer } from "react-notifications";
import UserTypeSweetAlert from "../_C57/RegistrationLoginPage/UserTypeSweetAlert";
import NavBar from "_C57/NavBar/NavBar";
import IfLoginStatus from "_C57/CustomComponents/IfLoginStatus";
import "../_C57/WelcomePage/WelcomePage.css";
import axios from "axios";
import { SET_DROPDOWN_VALUES } from "../constants/ActionTypes";
import "../_C57/NavBar/NavStyle.css";

//import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";

//import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";

class App extends React.Component {
  componentDidMount() {
    //-- Leave this if statement here for now. I need it to test filter later. -Ricky
    // if (this.props.currentUser) {
    axios
      .get("api/search")
      .then(res => {
        console.log("Good Get All!", res.data);
        this.props.setDropdownValues(res.data);
        this.props;
        this.checkSportFilter();
      })
      .catch(() => {
        console.log("Get All Failed");
      });
    // }
  }

  setDropdownProperties = properties => {
    this.props.setDropdownValues({
      ...this.props.dropDownOptions,
      ...properties
    });
  };

  setCriteriaProperties = properties => {
    this.props.setSearchCriteria({
      ...this.props.searchCriteria,
      ...properties
    });
  };

  checkSportFilter = () => {
    if (this.props.searchCriteria.sportFilter == null) {
      this.setCriteriaProperties({
        sportFilter: this.props.currentUser.currentSportId
      });
    }
  };

  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition, currentUser } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
        ? "collapsible-drawer"
        : "mini-drawer";
    console.log("CurrentUser", currentUser);
    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <NotificationContainer />
        <Route path={`${match.url}/admin`} component={asyncComponent(() => import("../containers/SideNav/index"))} />
        <div className="app-main-container container-fluid mainContainer mx-auto p-0 align-self-stretch">
          <div>
            <IfLoginStatus loggedIn={false}>
              <TopNav {...this.props} />
            </IfLoginStatus>

            <IfLoginStatus loggedIn={true}>
              <NavBar />
              <UserTypeSweetAlert {...this.props} />
            </IfLoginStatus>

            {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              {currentUser !== null && (
                <Switch>
                  {/* This Route must remain above the rest but still needs to be alphebatized */}
                  <Route
                    path={`${match.url}/forgot-password`}
                    component={asyncComponent(() => import("../_C57/ForgotPassword/ForgotPasswordContainer"))}
                  />
                  <Route
                    path={`${match.url}/registration_confirmation`}
                    component={asyncComponent(() => import("../_C57/Welcomepage/ConfirmationPage"))}
                  />
                  <Route
                    path={`${match.url}/admin`}
                    component={asyncComponent(() => import("../_C57/Admin/AdminPage"))}
                  />
                  <Route
                    path={`${match.url}/sample-page`}
                    component={asyncComponent(() => import("../_C57/Admin/AdminPage"))}
                  />
                  <Route
                    path={`${match.url}/profile`}
                    component={asyncComponent(() => import("../_C57/profile/ProfileContainer"))}
                    path={`${match.url}/welcome`}
                    component={asyncComponent(() => import("../_C57/WelcomePage/WelcomePage"))}
                  />
                  {currentUser === false && <Redirect to={`${match.url}/welcome`} />}
                  {/* Please keep all Routes below this alphebetized by URL. Helps with merges. */}
                  <Route
                    path={`${match.url}/admin`}
                    component={asyncComponent(() => import("../_C57/Admin/AdminPage"))}
                  />
                  <Route
                    path={`${match.url}/articles/create`}
                    component={asyncComponent(() => import("../_C57/Articles/ArticleCreate"))}
                  />
                  <Route
                    path={`${match.url}/coach`}
                    component={asyncComponent(() => import("../_C57/Coach/CoachInfo"))}
                  />
                  <Route
                    path={`${match.url}/coach-fav`}
                    render={props => {
                      const Component = asyncComponent(() => import("../_C57/CoachProspects/MainPage"));
                      return (
                        <IfLoginStatus loggedIn={true}>
                          {currentUser.isCoach === true && <Component {...props} />}
                        </IfLoginStatus>
                      );
                    }}
                  />
                  <Route
                    path={`${match.url}/events`}
                    component={asyncComponent(() => import("../_C57/Event/EventContainer"))}
                  />
                  <Route
                    path={`${match.url}/faqs-page`}
                    component={asyncComponent(() => import("../_C57/FaqPage/Faqs"))}
                  />
                  <Route
                    path={`${match.url}/fav-page`}
                    component={asyncComponent(() => import("../_C57/FavSchoolsAndCoachesPage/MainPage"))}
                  />
                  <Route
                    path={`${match.url}/feed-page`}
                    component={asyncComponent(() => import("../_C57/Feed/Feed"))}
                  />
                  <Route path={`${match.url}/home`} component={asyncComponent(() => import("../_C57/HomePage"))} />
                  <Route path={`${match.url}/pogs`} component={asyncComponent(() => import("../_C57/PogAdmin"))} />
                  <Route
                    path={`${match.url}/profile/:id(\\d+)`}
                    render={props => {
                      const Component = asyncComponent(() => import("../_C57/profile/ProfileContainer"));
                      return (
                        <IfLoginStatus loggedIn={true}>
                          <Component {...props} />
                        </IfLoginStatus>
                      );
                    }}
                  />
                  <Route
                    path={`${match.url}/search`}
                    component={asyncComponent(() => import("../_C57/SearchResults/SearchResults.js"))}
                  />
                  <Route
                    path={`${match.url}/venues`}
                    component={asyncComponent(() => import("../_C57/Admin/Venues/AdminVenues"))}
                  />

                  <Route component={asyncComponent(() => import("components/Error404"))} />
                  {/* Please keep Routes alphebetized by URL */}
                </Switch>
              )}
            </div>

            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser, settings, dropDownOptions, searchCriteria }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition, currentUser, dropDownOptions, searchCriteria };
};

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
  )(App)
);
