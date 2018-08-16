import React from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileCard from "./ProfileCard";
import { getAthleteById, putAthleteById } from "../../services/athlete.service";
import { getClassYear } from "./AddSportHistory/AddSportService";
import "./Profile.css";
import ProfileBio from "./ProfileBio";
import { connect } from "react-redux";

class ProfileContainer extends React.Component {
  state = {
    firstName: "Nathan",
    middleName: "H",
    lastName: "Critchett",
    city: "Los Angeles",
    state: "CA",
    bio: "Insert Bio Here ...",
    profilePic: "http://res.cloudinary.com/dv4p9sgci/image/upload/v1533607389/Capture.png",
    classYear: "Junior",
    classYearId: 1,
    gradYear: "2019",
    sportLevel: "Varsity",
    sportPosition: "Pitcher",
    height: "6' 1",
    heightFeet: "",
    heightInches: "",
    weight: "175",
    gpa: "3.7",
    sat: "2",
    act: "2",
    desiredMajor: "English",
    targetSport: "Baseball",
    targetPosition: "Pitcher",
    sport: "Baseball",
    stats: "done",
    schoolName: "Crossroads High School",
    schoolId: 0,
    title: "",
    classYearOptions: [],
    id: 1,
    userId: 1
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  onChange = value => {
    this.setState({
      schoolName: value
    });
  };

  componentDidMount() {
    console.log(this.props.currentUser, "currentuser");
    getAthleteById(this.props.match.params.id).then(response => {
      console.log(response);
      const info = response.data.item.athletes[0];
      console.log(info);
      const sportPositions = [];
      const heightFeet = Math.floor(info.Height / 12);
      const heightInches = info.Height % 12;
      this.setState({
        firstName: info.FirstName,
        middleName: info.MiddleName,
        lastName: info.LastName,
        city: info.City,
        state: info.State,
        bio: info.ShortBio,
        profilePic: info.AvatarUrl,
        gradYear: info.HighSchoolGraduationYear,
        sportLevel: info.CompetitionLevel,
        sportPosition: sportPositions,
        sport: info.SportName,
        classYear: info.ClassYearName,
        classYearId: info.ClassYearId,
        schoolName: info.SchoolName,
        schoolId: info.SchoolId,
        height: info.Height,
        heightFeet: heightFeet,
        heightInches: heightInches,
        weight: info.Weight,
        gpa: info.GPA,
        act: info.ACT,
        id: info.Id,
        userId: info.UserId
      });
    });
    getClassYear().then(res => this.setState({ classYearOptions: res.data.item.pagedItems }));
  }

  handleSaveProfile = () => {
    let height = Number(this.state.heightFeet) * 12;
    height = height + Number(this.state.heightInches);
    const payload = {
      id: this.state.id,
      userId: this.state.userId,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      schoolId: this.state.schoolId,
      classYearId: this.state.classYearId,
      highSchoolGraduationYear: this.state.gradYear,
      city: this.state.city,
      state: this.state.state,
      height: height,
      weight: this.state.weight
    };
    putAthleteById(payload).then(res => {
      console.log(res);
    });
  };

  onHandleSchoolSelect = id => {
    this.setState({
      schoolId: id
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="app-wrapper">
          <div className="row">
            <div className="jr-card profileJrCard col-md-8 p-0">
              <img
                src="http://res.cloudinary.com/dv4p9sgci/image/upload/c_scale,h_240,w_950/v1533612434/new.jpg"
                style={{
                  maxWidth: "100%",
                  maxHeight: "170px",
                  position: "relative",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px"
                }}
                className="img-fluid"
              />
              <div
                className="p-4 col-md-12"
                style={{ borderLeft: "solid 15px #2673e2", borderBottomLeftRadius: "8px" }}
              >
                <ProfileBanner
                  handleChange={this.handleChange}
                  onChange={this.onChange}
                  firstName={this.state.firstName}
                  middleName={this.state.middleName}
                  lastName={this.state.lastName}
                  title={this.state.title}
                  profilePic={this.state.profilePic}
                  city={this.state.city}
                  state={this.state.state}
                  schoolName={this.state.schoolName}
                  schoolId={this.state.schoolId}
                  classYear={this.state.classYear}
                  classYearId={this.state.classYearId}
                  classYearOptions={this.state.classYearOptions}
                  gradYear={this.state.gradYear}
                  sport={this.state.sport}
                  sportLevel={this.state.sportLevel}
                  sportPosition={this.state.sportPosition}
                  height={this.state.height}
                  heightFeet={this.state.heightFeet}
                  heightInches={this.state.heightInches}
                  weight={this.state.weight}
                  gpa={this.state.gpa}
                  bio={this.state.bio}
                  handleSaveProfile={this.handleSaveProfile}
                  onHandleSchoolSelect={this.onHandleSchoolSelect}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 profileJrCard" style={{ marginTop: "40px" }}>
              <div className="row">
                <div className="col-md-7" style={{ paddingLeft: "0px" }}>
                  <div className="jr-card profileJrCardTwo ">
                    <h2>Bio</h2>
                    <ProfileBio handleChange={this.handleChange} bio={this.state.bio} />
                  </div>
                </div>
                <div className="col-md-5" style={{ paddingRight: "0px" }}>
                  <div className="jr-card profileJrCardTwo ">
                    <div className="row" style={{ position: "relative", left: "4%" }}>
                      <h2>Target Sport/Position</h2>{" "}
                      <button
                        style={{
                          position: "relative",
                          right: "-50%",
                          transform: "rotate(90deg)",
                          backgroundColor: "white",
                          fontSize: "30px",
                          top: "-20px"
                        }}
                        className="profileBannerButtonOpacity float-right"
                        type="button"
                        onClick={this.editField}
                      >
                        <i className="zmdi zmdi-more-vert zmdi-hc-lg" />
                      </button>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                      <h2 style={{ fontWeight: "800" }}>
                        {this.state.targetSport}, {this.state.targetPosition}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 profileJrCard" style={{ marginTop: "40px" }}>
              <div className="row">
                <div className="col-md-7" style={{ paddingLeft: "0px" }}>
                  <div className="jr-card profileJrCardTwo ">
                    <h2>history</h2>
                  </div>
                </div>
                <div className="col-md-5" style={{ paddingRight: "0px" }}>
                  <div className="jr-card profileJrCardTwo ">
                    <div className="row" style={{ position: "relative", left: "4%" }}>
                      <h2>Academic</h2>
                      <button
                        style={{
                          position: "relative",
                          right: "-70%",
                          transform: "rotate(90deg)",
                          backgroundColor: "white",
                          fontSize: "30px",
                          top: "-20px"
                        }}
                        className="profileBannerButtonOpacity float-right"
                        type="button"
                        onClick={this.editField}
                      >
                        <i className="zmdi zmdi-more-vert zmdi-hc-lg" />
                      </button>
                    </div>
                    <div className="row justify-content-center">
                      <div className="justify-content-center" style={{ paddingRight: "10%" }}>
                        <h2 style={{ fontWeight: "800", textAlign: "center" }}>GPA</h2>
                        <h2 style={{ fontWeight: "800", textAlign: "center" }}>{this.state.gpa}</h2>
                      </div>
                      <div>
                        <h2 className="slash" style={{ top: "-18%", fontSize: "600%" }}>
                          {" "}
                          &nbsp; | &nbsp;{" "}
                        </h2>
                      </div>
                      <div className="justify-content-center" style={{ paddingLeft: "10%" }}>
                        <h2 style={{ fontWeight: "800", textAlign: "center" }}>SAT</h2>
                        <div>
                          <h2 style={{ fontWeight: "800", textAlign: "center" }}>{this.state.sat}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ position: "relative", left: "4%", color: "gray" }}>
                      <h3>Google Science Fair 5th Place</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 profileJrCard" style={{ marginTop: "40px" }}>
              <div className="jr-card profileJrCardTwo">
                <div className="row">
                  <div className="col-md-12">
                    <ProfileCard
                      handleChange={this.handleChange}
                      gpa={this.state.gpa}
                      sat={this.state.sat}
                      act={this.state.act}
                      desiredMajor={this.state.desiredMajor}
                      stats={this.state.stats}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(ProfileContainer);
