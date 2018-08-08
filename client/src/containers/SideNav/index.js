import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Drawer from "rc-drawer";
import { Config } from "constants/ThemeColors";
import { COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION } from "constants/ActionTypes";
import { toggleCollapsedNav, updateWindowWidth } from "actions/Setting";
import AdminSideBar from "../../../src/_C57/Admin/AdminSideBar";
import AdminSideBarContent from "../../_C57/Admin/AdminSideBarContent";

class SideNav extends React.PureComponent {
  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.props.updateWindowWidth(window.innerWidth);
    });
  }

  render() {
    const { navCollapsed, drawerType, width, isDirectionRTL, navigationStyle } = this.props;
    let drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-xl-flex"
      : drawerType.includes(COLLAPSED_DRAWER)
        ? ""
        : "d-flex";
    let type = true;
    if (drawerType.includes(COLLAPSED_DRAWER) || (drawerType.includes(FIXED_DRAWER) && width < 1200)) {
      type = false;
    }
    if (navigationStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = "";
      type = false;
    }

    return (
      <Drawer
        docked={true}
        className={`app-sidebar ${drawerStyle}`}
        style={{ overflow: "hide", height: "fill" }}
        touch={true}
        position={isDirectionRTL ? "right" : "left"}
        transitions={false}
        enableDragHandle={true}
        open={navCollapsed}
        children={false}
        onOpenChange={this.onToggleCollapsedNav}
        sidebar={
          <div className="side-nav" style={{ width: "fill" }}>
            <AdminSideBarContent />
          </div>

          // {/* <SidenavContent /> */}
          // <AdminSideBarContent />
        }
      >
        <div />
      </Drawer>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { navCollapsed, drawerType, width, isDirectionRTL, navigationStyle } = settings;
  return { navCollapsed, drawerType, width, isDirectionRTL, navigationStyle };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleCollapsedNav, updateWindowWidth }
  )(SideNav)
);
