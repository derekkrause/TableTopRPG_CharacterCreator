import React from "react";
import { connect } from "react-redux";
import ProfileCard from "../profile/ProfileCard";
import { FormGroup, Input, Label } from "reactstrap";
import { getCoachById, updateCoachProfile } from "../../services/coach.service";
import "./CoachProfile.css";

const defaultBio =
  "A biography, or simply bio, is a detailed description of a person's life. It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of his or her life, including intimate details of experience, and may include an analysis of the subject's personality.";
const defaultProfileImage = "https://sabio-training.s3.us-west-2.amazonaws.com/C57/default-profile.png";
const defaultBackgroundImage =
  "http://res.cloudinary.com/dv4p9sgci/image/upload/c_scale,h_240,w_950/v1533612434/new.jpg";

class CoachProfile extends React.Component {
  state = {
    //USER PROFILE
    firstName: "First",
    middleName: "",
    lastName: "Last",
    title: "Title",
    profileImage: "https://sabio-training.s3.us-west-2.amazonaws.com/C57/default-profile.png",
    schoolName: "School Name",
    city: "",
    state: "",
    bio: defaultBio,
    //BACKGROUND IMAGES
    backgroundImage: defaultBackgroundImage,
    //DATA
    viewingUser: "",
    viewedProfileId: 0,
    editingProfile: false,
    editingBio: false,
    //EDITS
    firstNameEdit: "",
    middleNameEdit: "",
    lastNameEdit: "",
    titleEdit: "",
    profileImageEdit: "",
    schoolNameEdit: "",
    cityEdit: "",
    stateEdit: "",
    bioEdit: ""
  };

  componentDidMount = () => {
    this.setState({ viewedProfileId: this.props.match.params.id, viewingUser: this.props.currentUser });
    this.getProfileInfo(this.props.match.params.id);
  };

  getProfileInfo = userId => {
    getCoachById(userId).then(result => {
      const res = result.data.item;
      this.setState({
        firstName: res.firstName,
        middleName: res.middleName,
        lastName: res.lastName,
        profileImage: res.avatarUrl,
        bio: res.bio,
        city: res.city,
        state: res.state,
        schoolName: res.schoolName,
        title: res.title
      });
    });
  };

  editingProfile = () => {
    this.setState({ editingProfile: !this.state.editingProfile, editingBio: false });
  };

  editingBio = () => {
    this.setState({ editingBio: !this.state.editingBio, editingProfile: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onBioSave = () => {
    this.setState({ bio: this.state.bioEdit, bioEdit: "", editingBio: false }, this.updateDatabase());
  };

  onProfileSave = () => {
    this.setState(
      {
        firstName: this.state.firstNameEdit,
        middleName: this.state.middleNameEdit,
        lastName: this.state.lastNameEdit,
        profileImage: this.state.profileImageEdit,
        title: this.state.titleEdit,
        city: this.state.cityEdit,
        state: this.state.stateEdit,
        schoolName: this.state.schoolNameEdit
      },
      this.UpdateDatabase()
    );
  };

  updateDatabase = () => {
    if (this.state.viewingUser == this.state.viewedProfileId) {
      const userData = {
        id: this.state.viewingUser,
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        avatarUrl: this.state.profileImage,
        city: this.state.city,
        state: this.state.state,
        title: this.state.title,
        bio: this.state.bio,
        schoolName: this.state.schoolName
      };
      updateCoachProfile(userData)
        .then(result => console.log("UPDATE", result))
        .catch(error => console.log("UPDATE", error));
    }
  };

  cancelEdit = () => {
    this.setState({
      editingBio: false,
      editingProfile: false,
      firstNameEdit: "",
      middleNameEdit: "",
      lastNameEdit: "",
      titleEdit: "",
      profileImageEdit: "",
      schoolNameEdit: "",
      cityEdit: "",
      stateEdit: "",
      bioEdit: ""
    });
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
      bio,
      viewedProfileId,
      viewingUser,
      editingProfile,
      editingBio,
      firstNameEdit,
      middleNameEdit,
      lastNameEdit,
      titleEdit,
      profileImageEdit,
      schoolNameEdit,
      cityEdit,
      stateEdit,
      bioEdit
    } = this.state;

    return (
      <div className="app-wrapper justify-content-center bg-info">
        {/* ---PROFILE CARD--- */}
        <div className="row justify-content-center">
          <div className="profile-intro card col-11 col-lg-8 col-xl-6 p-0 bg-danger" style={{ maxWidth: "900px" }}>
            <div className="pi-header">
              {/* ---HEADER BACKGROUND IMAGE--- */}
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  maxHeight: "90px"
                }}
              >
                {/* ---OFFSET PROFILE IMAGE--- */}
                <div
                  className="col-12 col-md-3 justify-content-center text-center ml-md-2 mx-auto"
                  style={{
                    WebkitTransform: "translateY(30px)",
                    msTransform: "translateY(30px)",
                    transform: "translateY(30px)"
                  }}
                >
                  {/* ---PROFILE IMAGE--- */}
                  <img
                    className="avatar-circle rounded-circle bg-white p-1"
                    src={profileImage || defaultProfileImage}
                    alt="Coach"
                    style={{
                      right: "inherit",
                      WebkitTransform: "initial",
                      msTransform: "initial",
                      transform: "initial",
                      boxShadow: "initial"
                    }}
                  />
                  {editingProfile ? (
                    <label for="titleEdit" className="text-left">
                      Title
                      <input
                        className="form-control"
                        name="titleEdit"
                        defaultValue={titleEdit || title}
                        placeholder="Title"
                        onChange={this.onChange}
                      />
                    </label>
                  ) : (
                    <h2 className="my-2">
                      {/* ---TITLE--- */}
                      <strong style={{ color: "black" }}>{title}</strong>
                    </h2>
                  )}
                </div>
                {/* ---SPACER COLUMN--- */}
                <div className="col-9" />
              </div>
            </div>
            <div className="pi-content d-flex p-0 ml-2 bg-white">
              <div className="col-3 px-3 text-center" style={{ width: "120px" }} />
              <div className="col-6 text-md-left text-center my-3 mt-5 pt-5 pt-md-0 mt-md-2 p-0">
                {/* ---NAME--- */}
                {editingProfile ? (
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="firstNameEdit"
                      placeholder="First Name"
                      defaultValue={firstNameEdit || firstName}
                      onChange={this.onChange}
                    />
                    <input
                      className="form-control"
                      name="middleNameEdit"
                      placeholder="Middle Name"
                      defaultValue={middleNameEdit || middleName}
                      onChange={this.onChange}
                    />
                    <input
                      className="form-control"
                      name="lastNameEdit"
                      placeholder="Last Name"
                      defaultValue={lastNameEdit || lastName}
                      onChange={this.onChange}
                    />
                  </div>
                ) : (
                  <h1 style={{ fontWeight: "800", color: "black" }}>
                    {firstName} {middleName} {lastName}
                  </h1>
                )}
                {/* ---SCHOOL , CITY , STATE--- */}
                {editingProfile ? (
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="schoolNameEdit"
                      defaultValue={schoolNameEdit || schoolName}
                      placeholder="School Name"
                    />
                    <div className="input-group">
                      <input
                        className="form-control"
                        name="cityEdit"
                        defaultValue={cityEdit || city}
                        placeholder="City"
                      />
                      <input
                        className="form-control"
                        name="stateEdit"
                        defaultValue={stateEdit || state}
                        placeholder="State"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 style={{ color: "black", marginBottom: "6px" }}>{schoolName}</h2>
                    <h2 style={{ color: "black", marginBottom: "6px" }}>
                      {city}
                      {!city || !state ? "" : ","} {state}
                    </h2>
                  </div>
                )}
                {/* ---FOLLOW HIGHLIGHT MESSAGE BUTTONS--- */}
                {editingProfile ? (
                  <div className="d-flex justify-content-end mt-3">
                    <button className="jr-btn jr-btn-sm btn btn-default mb-0" onClick={this.cancelEdit}>
                      Cancel
                    </button>
                    <button className="jr-btn jr-btn-sm btn btn-primary mb-0" onClick={this.onBioSave}>
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="row mt-4 justify-content-md-start justify-content-center">
                    {/* ---BUTTONS FOR SMALL SCREENS--- */}
                    <div className="btn-group mb-md-0 d-none d-md-block ml-3">
                      <div className="jr-btn jr-btn-default btn btn-default">Follow</div>
                      <div className="jr-btn jr-btn-default btn btn-default">Highlight</div>
                      <div className="jr-btn jr-btn-success btn btn-success d-md-none">
                        <i className="zmdi zmdi-email zmdi-hc-fw" />
                        Message
                      </div>
                    </div>
                    {/* ---BUTTONS FOR MD SCREENS AND LARGER--- */}
                    <div className="btn-group mb-md-0 d-md-none">
                      <div className="jr-btn jr-btn-sm jr-btn-default btn btn-default">Follow</div>
                      <div className="jr-btn jr-btn-sm jr-btn-default btn btn-default">Highlight</div>
                      {/* ---MESSAGE BUTTON ONLY VISIBLE ON SMALL SCREENS-- */}
                      <div className="jr-btn jr-btn-sm jr-btn-success btn btn-success d-md-none">
                        <i className="zmdi zmdi-email zmdi-hc-fw" />
                        Message
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex flex-column col-3 align-items-end mb-3 pr-0">
                {/* ---EDIT BUTTON--- */}
                {viewingUser.id == viewedProfileId && (
                  <button
                    className={"ash btn btn-secondary pt-2 m-0 " + (editingProfile && "editing")}
                    onClick={this.editingProfile}
                  >
                    <i className="zmdi zmdi-more zmdi-hc-2x" />
                  </button>
                )}
                {/* ---MESSAGE BUTTON FOR LAPTOPS AND LARGER--- */}
                {editingProfile ? (
                  <div />
                ) : (
                  <div className="d-none d-md-block jr-btn jr-btn-success btn btn-success mt-auto mb-0 mr-3">
                    <i className="zmdi zmdi-email zmdi-hc-fw" />
                    Message
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*BIO CARD*/}
        <div className="row justify-content-center">
          <div className="card col-11 col-lg-8 col-xl-6 p-0 bg-danger" style={{ maxWidth: "900px" }}>
            <div
              className="card-body bg-white ml-2 p-0"
              style={{ borderTopRightRadius: "inherit", borderBottomRightRadius: "inherit" }}
            >
              {/* ---UPDATE BIO BUTTON--- */}
              {viewingUser.id == viewedProfileId && (
                <button
                  className={"ash btn btn-secondary float-right pt-2 mr-1 " + (editingBio && "editing")}
                  style={{ borderTopRightRadius: "inherit" }}
                  onClick={this.editingBio}
                >
                  <i className="zmdi zmdi-more zmdi-hc-2x" />
                </button>
              )}
              {/* ---BIO--- */}
              {editingBio ? (
                <FormGroup className="m-3 mt-5">
                  <Input
                    type="textarea"
                    className="form-control"
                    name="bioEdit"
                    rows="5"
                    defaultValue={bioEdit || bio || defaultBio}
                    onChange={this.onChange}
                  />
                  <div className="d-flex justify-content-end mt-3">
                    <button className="jr-btn jr-btn-sm btn btn-default mb-0" onClick={this.cancelEdit}>
                      Cancel
                    </button>
                    <button className="jr-btn jr-btn-sm btn btn-primary mb-0" onClick={this.onBioSave}>
                      Save
                    </button>
                  </div>
                </FormGroup>
              ) : (
                <p className="card-text m-3 pr-4">{bio || defaultBio}</p>
              )}
            </div>
          </div>
        </div>
        {/*FEED SCHEDULE PHOTOS*/}
        <div className="row justify-content-center">
          <div className="card col-11 col-lg-8 col-xl-6 p-0" style={{ maxWidth: "900px" }}>
            <div className="jr-card px-0 pt-0">
              <div className="row">
                <div className="col-md-12">
                  {/* <ProfileCard
                    handleChange={this.handleChange}
                    gpa={this.state.gpa}
                    sat={this.state.sat}
                    act={this.state.act}
                    desiredMajor={this.state.desiredMajor}
                    stats={this.state.stats}
                    handleSaveProfile={this.handleSaveProfile}
                  /> */}
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
