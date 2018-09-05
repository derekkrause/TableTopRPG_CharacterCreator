import React, { Component } from "react";
import { Link } from "react-router-dom";

class CoachProfileCard extends Component {
  state = {
    userId: 0,
    coach: {}
  };

  componentDidMount() {
    // console.log("CoachProfileCard component mounted");
    // console.log("CoachProfileCard props: ", this.props);

    this.setState({ coach: this.props.data.itemData });
  }

  render() {
    const { coach } = this.state;

    // console.log("CoachProfileCard render coach: ", coach);

    // return (
    //   <div>
    //     <p>CoachProfileCard!</p>
    //   </div>
    // );

    return (
      <div
        key={coach.coachId}
        className="d-sm-flex flex-sm-row jr-card pr-2 pb-4 pb-md-2 justify-content-between coachtag"
      >
        <div className="col-md-3 col-sm-3 col-12 px-0 text-center">
          <img className="myAvatar" src={coach.avatarUrl} alt="..." />
          <h4 className="mt-2">Coach</h4>
        </div>
        <div className="col-12 col-sm-8 col-mb-9 col-lg-9 p-3">
          <h3 className="mb-1 font-weight-bold">
            {coach.firstName} {coach.middleName} {coach.lastName}
          </h3>
          <p className="meta-date mb-2">{coach.school}</p>

          <p className="card-text line-clamp mb-2" style={{ height: "40px" }}>
            {coach.shortBio}
          </p>
          <Link to={`/app/Profile/${coach.userId}`} style={{ textDecoration: "none", color: "#aaaaaa", width: "100%" }}>
            <div className="home-header-btn float-right" style={{ width: "100px" }}>
              <h5 className="card-heading mb-0 home-center-text">Go to Profile</h5> &nbsp;
              <i className="zmdi zmdi-chevron-right home-center-text" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default CoachProfileCard;
