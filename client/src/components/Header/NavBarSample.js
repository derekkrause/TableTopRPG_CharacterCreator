import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION, INSIDE_THE_HEADER } from "constants/ActionTypes";
import SearchBox from "components/SearchBox";
import MailNotification from "../MailNotification/index";
import AppNotification from "../AppNotification/index";
import CardHeader from "components/dashboard/Common/CardHeader/index";
import { switchLanguage, toggleCollapsedNav } from "actions/Setting";
import IntlMessages from "util/IntlMessages";
import LanguageSwitcher from "components/LanguageSwitcher/index";
import UserInfo from "components/UserInfo";
import Menu from "components/Header/Menu";
import UserLogin from "app/routes/RegistrationLoginPage/Login";

class Header extends React.Component {
  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    });
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    });
  };

  onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo
    });
  };

  onLangSwitcherSelect = event => {
    this.setState({
      langSwitcher: !this.state.langSwitcher
    });
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    });
  };
  handleRequestClose = () => {
    this.setState({ langSwitcher: false, mailNotification: false, appNotification: false, searchBox: false });
  };
  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  constructor() {
    super();
    this.state = {
      searchBox: false,
      searchText: "",
      mailNotification: false,
      langSwitcher: false,
      appNotification: false,
      userInfo: false
    };
  }

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value
    });
  }

  render() {
    const { drawerType, locale, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-flex d-xl-none"
      : drawerType.includes(COLLAPSED_DRAWER)
        ? "d-flex"
        : "d-none";

    return (
      <div className="app-main-header">
        <div className="d-flex app-toolbar align-items-center">
          {navigationStyle === HORIZONTAL_NAVIGATION ? (
            <div className="app-logo-bl">
              <div className="d-block d-md-none">
                <span className="jr-menu-icon" onClick={this.onToggleCollapsedNav}>
                  <span className="menu-icon" />
                </span>
              </div>
              <div className="app-logo pointer d-none d-md-block">
                <img className="d-none d-lg-block" alt="..." src="http://via.placeholder.com/105x36" />
                <img className="d-block d-lg-none mr-3" alt="..." src="http://via.placeholder.com/32x32" />
              </div>
            </div>
          ) : (
            <span className={`jr-menu-icon pointer ${drawerStyle}`} onClick={this.onToggleCollapsedNav}>
              <span className="menu-icon" />
            </span>
          )}

          <UserLogin />

          {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER && <Menu />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, locale, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, locale, navigationStyle, horizontalNavPosition };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleCollapsedNav, switchLanguage }
  )(Header)
);
