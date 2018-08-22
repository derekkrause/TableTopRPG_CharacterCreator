import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileCarousel from "./ProfileCarousel";
import ProfilePicture from "./ProfilePicture";
import IconButtonGroup from "./IconButtonGroup";
import ProfileBio from "./ProfileBio";
/* import CoachInfo from "../Coach/CoachInfo"; */

class ProfileBanner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="row" style={{ marginTop: "-56%", marginLeft: "-12%" }}>
                <div className="col-md-12">
                  <div className="row justify-content-center" style={{ marginBottom: "8%" }}>
                    <ProfilePicture profilePic={this.props.profilePic} />
                  </div>
                  <div className="row justify-content-center">
                    <h2 style={{ fontWeight: "600" }}>
                      {this.props.sportLevel} {this.props.sport}
                    </h2>
                  </div>
                  <div className="row justify-content-center">
                    <h2 style={{ fontWeight: "600" }}>{this.props.sportPosition}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <ProfileInfo
                highlighting={this.props.highlighting}
                highlightUser={this.props.highlightUser}
                following={this.props.following}
                followUser={this.props.followUser}
                handleChange={this.props.handleChange}
                onChange={this.props.onChange}
                firstName={this.props.firstName}
                middleName={this.props.middleName}
                lastName={this.props.lastName}
                title={this.props.title}
                city={this.props.city}
                state={this.props.state}
                schoolName={this.props.schoolName}
                schoolId={this.props.schoolId}
                classYear={this.props.classYear}
                classYearId={this.props.classYearId}
                classYearOptions={this.props.classYearOptions}
                gradYear={this.props.gradYear}
                sport={this.props.sport}
                sportLevel={this.props.sportLevel}
                sportPosition={this.props.sportPosition}
                height={this.props.height}
                heightFeet={this.props.heightFeet}
                heightInches={this.props.heightInches}
                weight={this.props.weight}
                gpa={this.props.gpa}
                act={this.props.act}
                currentProfile={this.props.currentProfile}
                userId={this.props.userId}
                handleSaveProfile={this.props.handleSaveProfile}
                onHandleSchoolSelect={this.props.onHandleSchoolSelect}
              />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <ProfileBio handleChange={this.props.handleChange} bio={this.props.bio} />
        </div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
export default ProfileBanner;
