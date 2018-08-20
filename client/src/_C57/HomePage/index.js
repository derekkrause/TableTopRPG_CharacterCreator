import React from "react";
import FeedHome from "../Feed/FeedHome";
import CollegeList from "./CollegeList";
import EventList from "./EventList";
import ArticleList from "./ArticleList";
import PeopleList from "./PeopleList";
import UserProfileCard from "./userProfileCard/UserProfileCard";
import { getUpcoming } from "../../services/Event.service";
import { getSchools } from "../Admin/SchoolAdmin/SchoolAdminServer";
import { getAthleteTrend } from "../../services/athlete.service";
import { getCoachTrend } from "../../services/coach.service";
import { Route } from "react-router-dom";

class HomePage extends React.Component {
  state = {
    articleTitle: "Popular Article",
    articleSubTitle: "Most viewed articles",
    eventTitle: "Upcoming Events",
    eventSubTitle: "",
    followTitle: "Trending College",
    followSubTitle: "",
    events: [],
    schools: [],
    athletes: [],
    coaches: []
  };

  componentDidMount() {
    getUpcoming().then(res => {
      console.log("events get all", res);
      this.setState({
        events: res.data.items
      });
    });

    getSchools(0).then(res => {
      console.log("School get all", res);
      this.setState({
        schools: res.data.resultSets[0]
      });
    });
    const sportType = "Baseball";
    getAthleteTrend(sportType).then(res => {
      console.log("GET TREND ATHLETE", res);
      this.setState({
        athletes: res.data.item.pagedItems
      });
    });

    getCoachTrend().then(res => {
      const coaches = res.data.resultSets[0].map(o => {
        var newObj = {};
        for (const key of Object.keys(o)) {
          const newKey = key[0].toLowerCase() + key.slice(1);
          newObj[newKey] = o[key];
        }
        return newObj;
      });
      console.log("GET Coaches", res);

      this.setState(
        {
          coaches
        },
        () => {
          console.log("After Coach Set state", this.state.coaches);
        }
      );
    });
  }

  render() {
    const { articleTitle, eventTitle, events, schools, athletes, coaches } = this.state;
    return (
      <div className="app-wrapper d-flex justify-content-center">
        <div className="animated slideInUpTiny animation-duration home-main">
          <div className="row">
            <div className="col-md-1 col-12 animation slideInLeft">
              <div className="sideBar">{/* <UserProfileCard /> */}</div>
            </div>
            {/* <Route exact path={`${this.props.match.url}`} render={props => <EventsListView {...props} />} /> */}
            <div className="col-md-7 col-sm-7 col-12 animation slideInRight">
              <FeedHome />
            </div>
            <div className="col-md-4 col-sm-5 col-12 animation slideInLeft">
              <div className="sideBar">
                <EventList datas={events} cardTitle={eventTitle} />

                <PeopleList
                  datas={athletes}
                  cardTitle="Trending Players"
                  path="athletes"
                  borderColor="border-primary"
                />
                <PeopleList datas={coaches} cardTitle="Trending Coaches" path="coaches" borderColor="border-purple" />
                <CollegeList datas={schools} cardTitle="Trending Schools" dotColor="bg-orange" />
                <ArticleList cardTitle={articleTitle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
