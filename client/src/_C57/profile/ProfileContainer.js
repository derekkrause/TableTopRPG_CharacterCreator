import React from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileCard from "./ProfileCard";
import { getAthleteById, putAthleteById } from "../../services/athlete.service";
import { getClassYear } from "./AddSportHistory/AddSportService";
import "./Profile.css";
import ProfileBio from "./ProfileBio";
import AthleteHistoryCarouselFinal from "./AthleteHistoryCarouselFinal";
import { connect } from "react-redux";
import AthleteAcademics from "./AthleteAcademics";
import { followUser, selectFollowingById, unfollowUser } from "../../services/follow.service";
import { highlightUser, unhighlightUser, selectHighlightById } from "../../services/highlight.service";

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
    height: null,
    heightFeet: null,
    heightInches: null,
    weight: null,
    gpa: null,
    sat: null,
    act: null,
    academicNotes: "",
    desiredMajor: "English",
    targetSport: "Baseball",
    targetPosition: "Pitcher",
    sport: "Baseball",
    stats: "done",
    schoolName: "Crossroads High School",
    schoolId: 0,
    title: "",
    classYearOptions: [],
    id: null,
    userId: null,
    following: false,
    highlighting: false
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
    selectFollowingById(this.props.currentUser.id).then(res => {
      if (res.data.resultSets) {
        for (let i = 0; i < res.data.resultSets[0].length; i++) {
          if (res.data.resultSets[0][i].UserId == this.props.match.params.id) {
            this.setState({ following: true });
          }
        }
      }
    });

    selectHighlightById(this.props.match.params.id).then(res => {
      if (res.data.resultSets) {
        for (let i = 0; i < res.data.resultSets[0].length; i++) {
          if (res.data.resultSets[0][i].HighlightId == this.props.currentUser.id) {
            this.setState({ highlighting: true });
          }
        }
      }
    });

    getAthleteById(this.props.match.params.id).then(response => {
      const info = response.data.item.athletes[0];
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
        sat: info.SAT,
        gpa: info.GPA,
        act: info.ACT,
        academicNotes: info.AcademicNotes,
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
      weight: this.state.weight,
      shortBio: this.state.bio,
      sat: this.state.sat,
      act: this.state.act,
      gpa: this.state.gpa,
      academicNotes: this.state.academicNotes,
      shortBio: this.state.bio
    };
    putAthleteById(payload).then(res => {});
  };

  onHandleSchoolSelect = id => {
    this.setState({
      schoolId: id
    });
  };

  followUser = () => {
    const payload = {
      followerId: this.props.currentUser.id,
      userId: parseInt(this.props.match.params.id)
    };
    if (!this.state.following) {
      followUser(payload).then(res => {
        this.setState({ following: true });
      });
    } else {
      unfollowUser(this.props.currentUser.id, this.props.match.params.id).then(res => {
        this.setState({ following: false });
      });
    }
  };

  highlightUser = () => {
    const payload = {
      highlightId: this.props.currentUser.id,
      userId: parseInt(this.props.match.params.id)
    };
    if (!this.state.highlighting) {
      highlightUser(payload).then(res => {
        this.setState({ highlighting: true });
      });
    } else {
      unhighlightUser(this.props.currentUser.id, this.props.match.params.id).then(res => {
        this.setState({ highlighting: false });
      });
    }
  };

  render() {
    return (
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
            <div className="p-4 col-md-12" style={{ borderLeft: "solid 15px #2673e2", borderBottomLeftRadius: "8px" }}>
              <ProfileBanner
                highlightUser={this.highlightUser}
                highlighting={this.state.highlighting}
                following={this.state.following}
                followUser={this.followUser}
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
                currentProfile={this.props.match.params.id}
                onChange={this.onChange}
                handleChange={this.handleChange}
                handleSaveProfile={this.handleSaveProfile}
                onHandleSchoolSelect={this.onHandleSchoolSelect}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 profileJrCard" style={{ marginTop: "30px" }}>
            <div className="row">
              <div className="col-md-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                <div className="jr-card profileJrCardTwo " id="bio">
                  <ProfileBio
                    popover="bio"
                    handleChange={this.handleChange}
                    bio={this.state.bio}
                    handleSaveProfile={this.handleSaveProfile}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 profileJrCard">
            <div className="row">
              <div className="col-md-7 col-sm-12" style={{ paddingLeft: "0px" }}>
                <div className="jr-card profileJrCardTwo">
                  <AthleteHistoryCarouselFinal />
                </div>
              </div>
              <div className="col-md-5 col-sm-12" style={{ paddingRight: "0px" }}>
                <div className="jr-card profileJrCardTwo pt-3" id="academics">
                  <AthleteAcademics
                    popover="academics"
                    editAcademics={this.state.editAcademics}
                    handleEditAcademics={this.handleEditAcademics}
                    sat={this.state.sat}
                    act={this.state.act}
                    gpa={this.state.gpa}
                    academicNotes={this.state.academicNotes}
                    handleChange={this.handleChange}
                    handleSaveProfile={this.handleSaveProfile}
                  />
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
                    handleSaveProfile={this.handleSaveProfile}
                    userProfile={this.props.match.params.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(ProfileContainer);
