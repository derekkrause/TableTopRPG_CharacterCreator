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
import TimelineItem from "./components/timeline/TimelineItem";
import ProfileTabs from "./ProfileTabs";
import ProfileBio from "./ProfileBio";

class ProfileCard extends React.Component {
  state = {
    activeTab: "1"
  };

  render() {
    return (
      <div className="profile-intro card text-center">
        {/* <div className="pi-header">
          <div className="card-image layer">
            <img
              className="avatar-circle"
              src="https://static.boredpanda.com/blog/wp-content/uploads/2018/04/social-experiment-guy-created-fake-tinder-profile-hot-model-pictures-germanlifter7-5acdcd5f23391__700.jpg"
              alt="Team Member"
            />
          </div>
        </div>
        <div className="pi-content">
          <h1>Tyrone Bigglesworth</h1>
          <p>Detroit Michigan</p>
          <p className="card-text">
            Hello everyone, I am Tyrone and I play sports real real good like.
          </p>
        </div> */}
        <div className="row">
          <div className="col-md-3">
            <ProfileBio />
          </div>
          <div className="col-md-9">
            <ProfileTabs />

            {/* <div className="jr-card">
              <div className="jr-card-header">
                <h3 className="card-heading">My Info</h3>
              </div>
              <div className="jr-card-body">
                <div className="card">
                  <div className="bg-primary card-header">
                    <ul className="nav-fill card-header-tabs nav nav-tabs">
                      <li className="nav-item">
                        <a
                          href="#"
                          className="nav-link active"
                          data-toggle="tab"
                          role="tab"
                        >
                          Summary
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#stats"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                        >
                          Stats
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                        >
                          Schedule
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane active">
                      <div className="card-body" id="summary">
                        <h4>this is where summary data goes</h4>
                      </div>
                    </div>
                    <div className="tab-pane">
                      <div className="card-body" id="stats">
                        <h4>this is where your stats go</h4>
                      </div>
                    </div>
                    <div className="tab-pane">
                      <div className="card-body" id="schedule">
                        <h4>this is where your schedule goes</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="col-md-6">
            <TimelineItem />
          </div> */}
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
      // <div>
      //  <div className="row justify-content-center">
      //    <div className="col-md-11">
      //     <div className="jr-card">
      //        <div className="card-header">
      //         <img
      //            className="banner"
      //            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTzwAucViLXX0KFFcTnluYZltJqc5z3DAYQuR6RTul5VtobJnaIg"
      //          />
      //        </div>
      //       <div className="card-body">
      //         <div className="row">
      //           <div className="col-md-4">
      //             <img src="https://static.boredpanda.com/blog/wp-content/uploads/2018/04/social-experiment-guy-created-fake-tinder-profile-hot-model-pictures-germanlifter7-5acdcd5f23391__700.jpg" />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default ProfileCard;
