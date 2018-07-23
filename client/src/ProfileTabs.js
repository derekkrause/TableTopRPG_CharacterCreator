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
import Basic from "./CalendarBasic";
import AcademicTable from "./AcademicTable";
import ProfileImages from "./ProfileImages";

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
              <NavItem>
                <NavLink
                  className={this.state.activeTab === "5" ? "active" : ""}
                  onClick={() => {
                    this.setState({ activeTab: "5" });
                  }}
                >
                  Photos/Videos
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
                <button
                  type="button"
                  className="btn btn-primary float-left"
                  id=""
                >
                  + Add New Event
                </button>
                <Basic />
              </CardBody>
            </TabPane>
            <TabPane tabId="4">
              <CardBody>
                <AcademicTable />
              </CardBody>
            </TabPane>
            <TabPane tabId="5">
              <CardBody>
                <h3 className="card-title">
                  This is where your media stuff goes
                </h3>
                <div className="row">
                  <div className="col-md-12">
                    <ProfileImages />
                  </div>
                </div>
              </CardBody>
            </TabPane>
          </TabContent>
        </Card>
      </div>
    );
  }
}

export default ProfileTabs;
