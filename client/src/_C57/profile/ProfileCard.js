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
import ProfileTabs from "./ProfileTabs";
import ProfileBio from "./ProfileBio";

class ProfileCard extends React.Component {
  state = {
    activeTab: "1"
  };

  render() {
    return (
      <div className="profile-intro text-center">
        <div className="row">
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12">
                <ProfileBio
                  handleChange={this.props.handleChange}
                  bio={this.props.bio}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h1>Athlete History</h1>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <ProfileTabs
              handleChange={this.props.handleChange}
              stats={this.props.stats}
              s
              gpa={this.props.gpa}
              sat={this.props.sat}
              act={this.props.act}
              desiredMajor={this.props.desiredMajor}
            />
          </div>
        </div>
        <div className="pi-footer">
          <div className="icons-wrapper">
            <a className="icon facebook-icon" href="javascript:void(0)">
              <i className="zmdi zmdi-facebook zmdi-hc-fw zmdi-hc-lg" />
            </a>
            <a className="icon twitter-icon" href="javascript:void(0)">
              <i className="zmdi zmdi-twitter zmdi-hc-fw zmdi-hc-lg" />
            </a>
            <a className="icon linkedin-icon" href="javascript:void(0)">
              <i className="zmdi zmdi-linkedin zmdi-hc-fw zmdi-hc-lg" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
