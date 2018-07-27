import React from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileCard from "./ProfileCard";

class ProfileContainer extends React.Component {
  state = {
    //------All Users-----
    firstName: "J",
    middleName: "H",
    lastName: "M",
    city: "Cville",
    state: "CA",
    bio: "nada",
    profilePic:
      "https://bringmethenews.com/.image/t_share/MTU0MDQ3MjMzOTE1ODg4NzIy/image-placeholder-title.jpg",
    //-----Athlete--------
    classYear: "Junior",
    gradYear: "2019",
    sportLevel: "Varsity",
    sportPosition: "Catcher",
    height: "90",
    weight: "90",
    gpa: "2",
    sat: "2",
    act: "2",
    desiredMajor: "English",
    //----Coach & Athlete ----
    sport: "Basketball",
    stats: "done",
    schoolName: "hickory",
    //-----Coach & Adv----
    title: ""
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  render() {
    return (
      <div className="jr-card">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <ProfileBanner
              handleChange={this.handleChange}
              firstName={this.state.firstName}
              middleName={this.state.middleName}
              lastName={this.state.lastName}
              title={this.state.title}
              profilePic={this.state.profilePic}
              city={this.state.city}
              state={this.state.state}
              schoolName={this.state.schoolName}
              classYear={this.state.classYear}
              gradYear={this.state.gradYear}
              sport={this.state.sport}
              sportLevel={this.state.sportLevel}
              sportPosition={this.state.sportPosition}
              height={this.state.height}
              weight={this.state.weight}
              gpa={this.state.gpa}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <ProfileCard
              handleChange={this.handleChange}
              bio={this.state.bio}
              gpa={this.state.gpa}
              sat={this.state.sat}
              act={this.state.act}
              desiredMajor={this.state.desiredMajor}
              stats={this.state.stats}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
