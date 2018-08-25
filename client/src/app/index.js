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
import SchoolSearchResults from "../_C57/SearchResults/SchoolSearchResults";

//import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";

//import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";

// Use for routes!
const AdminSideNavAsyncComponent = asyncComponent(() => import("../containers/SideNav/index"));

const AdminAsyncComponent = asyncComponent(() => import("../_C57/Admin/AdminPage"));
const HomeAsyncComponent = asyncComponent(() => import("../_C57/HomePage"));
const PogsAsyncComponent = asyncComponent(() => import("../_C57/PogAdmin"));
const ForgotPasswordAsyncComponent = asyncComponent(() => import("../_C57/ForgotPassword/ForgotPasswordContainer"));
const ProfileAsyncComponent = asyncComponent(() => import("../_C57/profile/ProfileContainer"));
const RegistrationAsyncComponent = asyncComponent(() => import("../_C57/Welcomepage/ConfirmationPage"));
const WelcomeAsyncComponent = asyncComponent(() => import("../_C57/WelcomePage/WelcomePage"));

const ArticlesAsyncComponent = asyncComponent(() => import("../_C57/Articles/ArticleCreate"));
const CoachAsyncComponent = asyncComponent(() => import("../_C57/Coach/CoachInfo"));
const CoachFavAsyncComponent = asyncComponent(() => import("../_C57/CoachProspects/MainPage"));
const EventsAsyncComponent = asyncComponent(() => import("../_C57/Event/EventContainer"));
const FaqsPageAsyncComponent = asyncComponent(() => import("../_C57/FaqPage/Faqs"));
const FavPageAsyncComponent = asyncComponent(() => import("../_C57/FavSchoolsAndCoachesPage/MainPage"));
const FeedPageAsyncComponent = asyncComponent(() => import("../_C57/Feed/Feed"));
const SearchAsyncComponent = asyncComponent(() => import("../_C57/SearchResults/SearchResults.js"));
const VenuesAsyncComponent = asyncComponent(() => import("../_C57/Admin/Venues/AdminVenues"));

class App extends React.Component {
  componentDidMount() {
    //-- Leave this if statement here for now. I need it to test filter later. -Ricky
    // if (this.props.currentUser) {
    axios
      .get("api/search")
      .then(res => {
        // console.log("Good Get All!", res.data);
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
    // console.log("CurrentUser", currentUser);
    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <NotificationContainer />
        <IfLoginStatus loggedIn={true} isAdmin={true}>
          <Route path={`${match.url}/admin`} component={AdminSideNavAsyncComponent} />
        </IfLoginStatus>
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
                <Switch key="mainswitch">
                  {/* This Route must remain above the rest but still needs to be alphebatized */}
                  <Route path={`${match.url}/forgot-password`} component={ForgotPasswordAsyncComponent} />
                  <Route path={`${match.url}/registration_confirmation`} component={RegistrationAsyncComponent} />
                  <Route path={`${match.url}/welcome`} component={WelcomeAsyncComponent} />
                  {currentUser === false && <Redirect to={`${match.url}/welcome`} />}
                  {/* Please keep all Routes below this alphebetized by URL. Helps with merges. */}
                  <Route path={`${match.url}/admin`} component={AdminAsyncComponent} />
                  <Route path={`${match.url}/articles/create`} component={ArticlesAsyncComponent} />
                  <Route path={`${match.url}/coach`} component={CoachAsyncComponent} />
                  <Route
                    path={`${match.url}/coach-fav`}
                    render={props => {
                      return (
                        <IfLoginStatus loggedIn={true}>
                          {currentUser.isCoach === true && <CoachFavAsyncComponent {...props} />}
                        </IfLoginStatus>
                      );
                    }}
                  />
                  <Route path={`${match.url}/events`} component={EventsAsyncComponent} />
                  <Route path={`${match.url}/faqs-page`} component={FaqsPageAsyncComponent} />
                  <Route path={`${match.url}/fav-page`} component={FavPageAsyncComponent} />
                  <Route path={`${match.url}/feed-page`} component={FeedPageAsyncComponent} />
                  <Route path={`${match.url}/home`} component={HomeAsyncComponent} />
                  <Route path={`${match.url}/pogs`} component={PogsAsyncComponent} />
                  <Route
                    path={`${match.url}/profile/:id(\\d+)`}
                    render={props => {
                      return (
                        <IfLoginStatus loggedIn={true}>
                          <ProfileAsyncComponent {...props} />
                        </IfLoginStatus>
                      );
                    }}
                  />
                  <Route path={`${match.url}/search`} component={SearchAsyncComponent} />
                  <Route path={`${match.url}/venues`} component={VenuesAsyncComponent} />
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
