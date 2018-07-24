import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION, INSIDE_THE_HEADER } from "constants/ActionTypes";
import SearchBox from "components/SearchBox";
import MailNotification from "components/MailNotification/index";
import AppNotification from "components/AppNotification/index";
import CardHeader from "components/dashboard/Common/CardHeader/index";
import { switchLanguage, toggleCollapsedNav } from "actions/Setting";
import IntlMessages from "util/IntlMessages";
import LanguageSwitcher from "components/LanguageSwitcher/index";
import UserInfo from "components/UserInfo";
import Menu from "components/Header/Menu";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
import NavBar from "_C57/NavBar/NavBar";

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
        {!this.state.loggedIn ? (
          <div className="d-flex app-toolbar">
            <NavBar />
          </div>
        ) : (
          <div className="d-flex app-toolbar align-items-center justify-content-center">
            <UserLogin />
          </div>
        )}
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
