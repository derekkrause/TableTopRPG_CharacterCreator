import React from "react";
import { connect } from "react-redux";
import ProfileCard from "../profile/ProfileCard";
import FollowHighlightButtons from "./FollowHighlight";
import ProgressIndicator from "../CustomComponents/ProgressIndicator/ProgressIndicator";
import { FormGroup, Input } from "reactstrap";
import SchoolSearch from "./SchoolSearchByName";
import StateSelect from "../CustomComponents/InputsDropdowns/StateOptions";
import { getCoachById, updateCoachProfile } from "../../services/coach.service";
import "./CoachProfile.css";
import { MessageButton } from "../CustomComponents/Button";

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
    //BACKGROUND IMAGES/LOADER
    backgroundImage: defaultBackgroundImage,
    pLoader: true,
    //DATA
    viewingUserId: this.props.currentUser.id,
    viewedProfileId: parseInt(this.props.match.params.id),
    editingProfile: false,
    editingBio: false,
    //EDITS
    firstNameEdit: "",
    middleNameEdit: "",
    lastNameEdit: "",
    titleEdit: "",
    schoolNameEdit: "",
    cityEdit: "",
    stateEdit: "",
    bioEdit: ""
  };

  componentDidMount = () => this.getProfileInfo(this.props.match.params.id);

  getProfileInfo = userId => {
    const promise = getCoachById(userId);
    promise.then(result => {
      this.updateVariables(result.data.item);
      this.setState({ pLoader: false });
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

  submitUpdates = () => {
    this.setState(
      {
        firstName: this.state.firstNameEdit,
        middleName: this.state.middleNameEdit,
        lastName: this.state.lastNameEdit,
        profileImage: this.state.profileImageEdit,
        title: this.state.titleEdit,
        city: this.state.cityEdit,
        state: this.state.stateEdit,
        schoolName: this.state.schoolNameEdit,
        bio: this.state.bioEdit,
        editingBio: false,
        editingProfile: false
      },
      this.updateDatabase
    );
  };

  updateDatabase = () => {
    if (this.state.viewingUserId === this.state.viewedProfileId) {
      const userData = {
        userId: this.state.viewingUserId,
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
        .then(result => this.updateVariables(result.data.item))
        .catch(error => console.log("UPDATE", error));
    }
  };

  updateVariables = userInfo =>
    this.setState({
      firstName: userInfo.firstName,
      firstNameEdit: userInfo.firstName,
      middleName: userInfo.middleName,
      middleNameEdit: userInfo.middleName,
      lastName: userInfo.lastName,
      lastNameEdit: userInfo.lastName,
      profileImage: userInfo.avatarUrl,
      profileImageEdit: userInfo.avatarUrl,
      bio: userInfo.bio,
      bioEdit: userInfo.bio,
      city: userInfo.city,
      cityEdit: userInfo.city,
      state: userInfo.state,
      stateEdit: userInfo.state,
      schoolName: userInfo.schoolName,
      schoolNameEdit: userInfo.schoolName,
      title: userInfo.title,
      titleEdit: userInfo.title
    });

  cancelEdit = () => {
    this.setState({
      editingBio: false,
      editingProfile: false,
      firstNameEdit: this.state.firstName,
      middleNameEdit: this.state.middleName,
      lastNameEdit: this.state.lastName,
      titleEdit: this.state.title,
      profileImageEdit: this.state.profileImage,
      schoolNameEdit: this.state.schoolName,
      cityEdit: this.state.city,
      stateEdit: this.state.state,
      bioEdit: this.state.bio
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
      viewingUserId,
      editingProfile,
      editingBio,
      firstNameEdit,
      middleNameEdit,
      lastNameEdit,
      titleEdit,
      pLoader,
      schoolNameEdit,
      cityEdit,
      stateEdit,
      bioEdit
    } = this.state;

    return (
      <React.Fragment>
        <div className="app-wrapper justify-content-center">
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
                      <div className="form-group text-left d-none d-md-block">
                        <label htmlFor="titleEdit">Title</label>
                        <input
                          className="form-control"
                          name="titleEdit"
                          defaultValue={titleEdit}
                          placeholder="Title"
                          onChange={this.onChange}
                        />
                      </div>
                    ) : (
                      <h2 className="my-2">
                        {/* ---TITLE--- */}
                        <strong style={{ color: "black" }}>{title}</strong>
                      </h2>
                    )}
                  </div>
                  {/* ---SPACER COLUMN--- //this column helps with background layering// */}
                  <div className="col-9" />
                </div>
              </div>
              <div className="pi-content d-flex p-0 ml-2 bg-white">
                <div
                  className={
                    "col-6 offset-3 text-md-left text-center my-3 pt-5 pt-md-0 mt-md-2 p-0 " +
                    (!editingProfile && "mt-5")
                  }
                >
                  <ProgressIndicator loader={pLoader} />
                  {/* ---NAME--- */}
                  {editingProfile ? (
                    <div className="form-group text-left">
                      <div className="form-group text-left d-block d-md-none">
                        <label htmlFor="titleEdit">Title</label>
                        <input
                          className="form-control"
                          name="titleEdit"
                          defaultValue={titleEdit}
                          placeholder="Title"
                          onChange={this.onChange}
                        />
                      </div>
                      <label htmlFor="userName">Name</label>
                      <div className="input-group" name="userName">
                        <input
                          className="form-control"
                          name="firstNameEdit"
                          placeholder="First Name"
                          defaultValue={firstNameEdit}
                          onChange={this.onChange}
                        />
                        <input
                          className="form-control"
                          name="middleNameEdit"
                          placeholder="Middle Name"
                          defaultValue={middleNameEdit}
                          onChange={this.onChange}
                        />
                        <input
                          className="form-control"
                          name="lastNameEdit"
                          placeholder="Last Name"
                          defaultValue={lastNameEdit}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <h1 style={{ fontWeight: "800", color: "black" }} hidden={pLoader}>
                      {firstName} {middleName} {lastName}
                    </h1>
                  )}
                  {/* ---SCHOOL , CITY , STATE--- */}
                  {editingProfile ? (
                    <div>
                      <div className="form-group text-left">
                        <label htmlFor="schoolNameEdit">School</label>
                        <SchoolSearch
                          name="schoolNameEdit"
                          city={cityEdit || city}
                          cityEdit={cityEdit}
                          state={stateEdit || state}
                          stateEdit={stateEdit}
                          defaultValue={schoolNameEdit || schoolName}
                          setCityState={(city, state) => this.setState({ cityEdit: city, stateEdit: state })}
                          setSchoolName={input => this.setState({ schoolNameEdit: input })}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group text-left col">
                          <label htmlFor="cityEdit">City</label>
                          <input
                            className="form-control"
                            name="cityEdit"
                            style={{ height: "38px" }}
                            defaultValue={cityEdit || city}
                            value={cityEdit}
                            placeholder="City"
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group text-left col">
                          <label htmlFor="stateEdit">State</label>
                          <StateSelect
                            name="stateEdit"
                            defaultValue={stateEdit || state}
                            value={stateEdit}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div hidden={pLoader}>
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
                      <button className="jr-btn jr-btn-sm btn btn-primary mb-0" onClick={this.submitUpdates}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div hidden={viewingUserId == viewedProfileId}>
                      <FollowHighlightButtons profileId={viewedProfileId} userId={viewingUserId} />
                    </div>
                  )}
                </div>
                <div className="d-flex flex-column col-3 align-items-end mb-3 pr-0">
                  {/* ---EDIT BUTTON--- */}
                  {viewingUserId == viewedProfileId && (
                    <button
                      className={"ash btn btn-secondary pt-2 m-0 " + (editingProfile && "editing")}
                      onClick={this.editingProfile}
                    >
                      <i className="zmdi zmdi-more zmdi-hc-2x" />
                    </button>
                  )}
                  {/* ---MESSAGE BUTTON FOR LAPTOPS AND LARGER--- */}
                  {editingProfile || viewingUserId == viewedProfileId ? (
                    <div />
                  ) : (
                    <MessageButton className="d-none d-md-block jr-btn jr-btn-success btn btn-success mt-auto mb-0 mr-3" />
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
                {viewingUserId == viewedProfileId && (
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
                      defaultValue={bioEdit || defaultBio}
                      onChange={this.onChange}
                    />
                    <div className="d-flex justify-content-end mt-3">
                      <button className="jr-btn jr-btn-sm btn btn-default mb-0" onClick={this.cancelEdit}>
                        Cancel
                      </button>
                      <button className="jr-btn jr-btn-sm btn btn-primary mb-0" onClick={this.submitUpdates}>
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
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(CoachProfile);
