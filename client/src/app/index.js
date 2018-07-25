import React from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "components/Footer";
import { isIOS, isMobile } from "react-device-detect";
import asyncComponent from "util/asyncComponent";
import TopNav from "_C57/NavBar/TopNav.js";

import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";

class App extends React.Component {
  render() {
    const { match, drawerType } = this.props;
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
                <Route
                  path={`${match.url}/admin`}
                  component={asyncComponent(() =>
                    import("../_C57/Admin/AdminPage")
                  )}
                />
                <Route
                  path={`${match.url}/sample-page`}
                  component={asyncComponent(() => import("../_C57/SamplePage"))}
                />
                <Route
                  path={`${match.url}/faqs-page`}
                  component={asyncComponent(() =>
                    import("../_C57/FaqPage/Faqs")
                  )}
                />
                <Route
                  path={`${match.url}/fav-page`}
                  component={asyncComponent(() =>
                    import("../_C57/FavSchoolsAndCoachesPage/MainPage")
                  )}
                />
                <Route
                  path={`${match.url}/registration`}
                  component={asyncComponent(() => import("../_C57/RegistrationLoginPage/UserRegistrationForm.js"))}
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
