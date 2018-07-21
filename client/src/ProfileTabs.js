import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import StatsRecord from "./StatsRecord";

class ProfileTabs extends React.Component {
  state = {
    activeTab: "1"
  };
  render() {
    return (
      <div>
        <Card>
          <CardHeader className="bg-primary">
            <Nav className="nav-fill card-header-tabs" tabs>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "1" ? "active" : ""}
                  onClick={() => {
                    this.setState({ activeTab: "1" });
                  }}
                >
                  Feed
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "2" ? "active" : ""}
                  onClick={() => {
                    this.setState({ activeTab: "2" });
                  }}
                >
                  Stats/Record
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "3" ? "active" : ""}
                  onClick={() => {
                    this.setState({ activeTab: "3" });
                  }}
                >
                  Schedule
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "4" ? "active" : ""}
                  onClick={() => {
                    this.setState({ activeTab: "4" });
                  }}
                >
                  Academics
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>

          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <CardBody>
                <h3 className="card-title">This is where your feed goes</h3>
              </CardBody>
            </TabPane>

            <TabPane tabId="2">
              <CardBody>
                <StatsRecord />
              </CardBody>
            </TabPane>

            <TabPane tabId="3">
              <CardBody>
                <h3 className="card-title">This is where your schedule goes</h3>
              </CardBody>
            </TabPane>
            <TabPane tabId="4">
              <CardBody>
                <h3 className="card-title">This is where your academic info goes</h3>
              </CardBody>
            </TabPane>
          </TabContent>
        </Card>
      </div>
    );
  }
}

export default ProfileTabs;
