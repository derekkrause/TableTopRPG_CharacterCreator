import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileCarousel from "./ProfileCarousel";
import ProfilePicture from "./ProfilePicture";
import IconButtonGroup from "./IconButtonGroup";
/* import CoachInfo from "../Coach/CoachInfo"; */

class ProfileBanner extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <ProfilePicture profilePic={this.props.profilePic} />
        </div>
        <div className="col-md-6">
          <ProfileInfo
            handleChange={this.props.handleChange}
            firstName={this.props.firstName}
            middleName={this.props.middleName}
            lastName={this.props.lastName}
            title={this.props.title}
            city={this.props.city}
            state={this.props.state}
            schoolName={this.props.schoolName}
            classYear={this.props.classYear}
            gradYear={this.props.gradYear}
            sport={this.props.sport}
            sportLevel={this.props.sportLevel}
            sportPosition={this.props.sportPosition}
            height={this.props.height}
            weight={this.props.weight}
            gpa={this.props.gpa}
          />
        </div>
        <div className="col-md-3">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <IconButtonGroup />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-md-12">
              <br />
              <br />
              <ProfileCarousel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileBanner;
