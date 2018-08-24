import React from "react";
import { connect } from "react-redux";
import ProfileCard from "../profile/ProfileCard";

class CoachProfile extends React.Component {
  state = {
    //USER PROFILE
    firstName: "Frank",
    middleName: "",
    lastName: "Thomas",
    title: "Head Coach",
    profileImage: "https://cdn.fangraphs.com/not/wp-content/uploads/2012/03/Rebus-Frank-Thomas.jpg",
    schoolName: "University of California, Santa Barbra",
    city: "Los Angeles",
    state: "CA",
    bio:
      "A biography, or simply bio, is a detailed description of a person's life. It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of his or her life, including intimate details of experience, and may include an analysis of the subject's personality.",
    //BACKGROUND IMAGES
    backgroundImage: "http://res.cloudinary.com/dv4p9sgci/image/upload/c_scale,h_240,w_950/v1533612434/new.jpg"
  };

  render() {
    const {
      firstName,
      lastName,
      middleName,
      title,
      profileImage,
      schoolName,
      city,
      state,
      backgroundImage,
      bio
    } = this.state;
    return (
      <div className="app-wrapper justify-content-center bg-info">
        {/*PROFILE CARD*/}
        <div className="row justify-content-center">
          <div className="profile-intro card col-11 col-lg-8 col-xl-6 p-0 bg-purple" style={{ maxWidth: "900px" }}>
            <div className="pi-header">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  maxHeight: "90px"
                }}
              >
                <div
                  className="col-12 col-md-3 justify-content-center text-center ml-md-2 mx-auto"
                  style={{
                    WebkitTransform: "translateY(30px)",
                    msTransform: "translateY(30px)",
                    transform: "translateY(30px)"
                  }}
                >
                  <img
                    className="avatar-circle rounded-circle bg-white p-1"
                    src={profileImage}
                    alt="Coach"
                    style={{
                      right: "inherit",
                      WebkitTransform: "initial",
                      msTransform: "initial",
                      transform: "initial",
                      boxShadow: "initial"
                    }}
                  />
                  <h2 className="my-2">
                    <strong style={{ color: "black" }}>{title}</strong>
                  </h2>
                </div>
                <div className="col-9" />
              </div>
            </div>
            <div className="pi-content d-flex p-0 ml-2 bg-white">
              <div className="col-3 px-3 text-center" style={{ width: "120px" }} />
              <div className="col-6 text-md-left text-center my-3 mt-5 pt-5 pt-md-0 mt-md-2 p-0">
                <h1 style={{ fontWeight: "800", color: "black" }}>
                  {firstName} {middleName} {lastName}
                </h1>
                <h2 style={{ color: "black", marginBottom: "6px" }}>{schoolName}</h2>
                <h2 style={{ color: "black", marginBottom: "6px" }}>
                  {city}, {state}
                </h2>
                <div className="row mt-4 justify-content-md-start justify-content-center">
                  <div className="btn-group mb-md-0 d-none d-md-block ml-3">
                    <div className="jr-btn jr-btn-default btn btn-default">Follow</div>
                    <div className="jr-btn jr-btn-default btn btn-default">Highlight</div>
                    <div className="jr-btn jr-btn-success btn btn-success d-md-none">
                      <i class="zmdi zmdi-email zmdi-hc-fw" />
                      Message
                    </div>
                  </div>
                  <div className="btn-group mb-md-0 d-md-none">
                    <div className="jr-btn jr-btn-sm jr-btn-default btn btn-default">Follow</div>
                    <div className="jr-btn jr-btn-sm jr-btn-default btn btn-default">Highlight</div>
                    <div className="jr-btn jr-btn-sm jr-btn-success btn btn-success d-md-none">
                      <i class="zmdi zmdi-email zmdi-hc-fw" />
                      Message
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column col-3 align-items-end mb-3">
                <button className="ash btn btn-secondary mr-0 pr-0">
                  <i className="zmdi zmdi-more zmdi-hc-2x" />
                </button>
                <div className="d-none d-md-block jr-btn jr-btn-success btn btn-success mt-auto mb-0">
                  <i class="zmdi zmdi-email zmdi-hc-fw" />
                  Message
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*BIO CARD*/}
        <div className="row justify-content-center">
          <div className="card col-11 col-lg-8 col-xl-6 p-0 bg-purple" style={{ maxWidth: "900px" }}>
            <div
              className="card-body bg-white ml-2 p-0"
              style={{ borderTopRightRadius: "inherit", borderBottomRightRadius: "inherit" }}
            >
              <button
                className="ash btn btn-secondary float-right pt-2 mr-1"
                style={{ borderTopRightRadius: "inherit" }}
              >
                <i className="zmdi zmdi-more zmdi-hc-2x" />
              </button>
              <p className="card-text m-3 pr-5">{bio}</p>
            </div>
          </div>
        </div>
        {/*FEED SCHEDULE PHOTOS*/}
        <div className="row justify-content-center">
          <div className="card col-11 col-lg-8 col-xl-6 p-0" style={{ maxWidth: "900px" }}>
            <div className="jr-card px-0 pt-0">
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
export default connect(mapStateToProps)(CoachProfile);
