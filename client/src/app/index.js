import React from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "components/Footer";
import CustomScrollbars from "../util/CustomScrollbars";
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

class App extends React.Component {
  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
        ? "collapsible-drawer"
        : "mini-drawer";

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <div className="app-main-container">
          <div className="app-header">
            <TopNav />
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                {/* <Route
                <Route
                  path={`${match.url}/home`}
                  component={asyncComponent(() => import("../_C57/HomePage/Homepage"))}
                />
                <Route
                  path={`${match.url}/articles/create`}
                  component={asyncComponent(() => import("../_C57/Articles/ArticleCreate"))}
                />
                <Route
                  path={`${match.url}/admin`}
                  component={asyncComponent(() => import("../_C57/Admin/AdminPage"))}
                />
                <Route
                  path={`${match.url}/sample-page`}
                  component={asyncComponent(() =>
                    import("./routes/SamplePage")
                  )}
                /> */}
                {/* <Route
                  path={`${match.url}/blog-page`}
                  component={asyncComponent(() => import("./routes/blog/Blog"))}
                /> */}
                <Route
                  path={`${match.url}/profile`}
                  component={asyncComponent(() => import("../_C57/profile/ProfileContainer"))}
                />
                <Route
                  path={`${match.url}/registration`}
                  component={asyncComponent(() => import("../_C57/RegistrationLoginPage/UserRegistrationForm.js"))}
                />
                <Route path={`${match.url}/blog-page`} component={asyncComponent(() => import("../_C57/blog/Blog"))} />
                <Route
                  path={`${match.url}/sample-page`}
                  component={asyncComponent(() => import("../_C57/SamplePage"))}
                />
                <Route
                  path={`${match.url}/profile`}
                  component={asyncComponent(() => import("../_C57/profile/ProfileContainer.js"))}
                />
                <Route
                  path={`${match.url}/faqs-page`}
                  component={asyncComponent(() => import("../_C57/FaqPage/Faqs"))}
                />
                <Route
                  path={`${match.url}/fav-page`}
                  component={asyncComponent(() => import("../_C57/FavSchoolsAndCoachesPage/MainPage"))}
                />
                <Route path={`${match.url}/pogs`} component={asyncComponent(() => import("../_C57/PogAdmin"))} />
                <Route
                  path={`${match.url}/video-player`}
                  component={asyncComponent(() => import("../components/VideoPlayer/VideoPlayerContainer"))}
                />
                <Route component={asyncComponent(() => import("components/Error404"))} />
              </Switch>
            </div>

            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition };
};
export default withRouter(connect(mapStateToProps)(App));
