import React from "react";
import FeedHome from "./FeedHome";
import CollegeList from "./CollegeList";
import EventList from "./EventList";
import ArticleList from "./ArticleList";
import PeopleList from "./PeopleList";
import { getUpcoming } from "../../services/Event.service";
import { getSchoolTrend } from "../../services/school.service";
import { getAthleteTrend } from "../../services/athlete.service";
import { getCoachTrend } from "../../services/coach.service";

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

    getSchoolTrend().then(res => {
      console.log("School get all", res);
      this.setState({
        schools: res.data.item.pagedItems
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

      this.setState({
        coaches
      });
    });
  }

  render() {
    const { articleTitle, eventTitle, events, schools, athletes, coaches } = this.state;
    return (
      <div className="app-wrapper d-flex justify-content-center">
        <div className="animated slideInUpTiny animation-duration home-main">
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="row justify-content-center">
                {/* <Route exact path={`${this.props.match.url}`} render={props => <EventsListView {...props} />} /> */}
                <div className="col-md-8 col-sm-7 col-12 animation slideInRight order-md-1 order-2">
                  <FeedHome />
                </div>
                <div className="col-md-4 col-sm-5 col-12 animation slideInLeft order-md-2 order-1">
                  <div className="sideBar">
                    <EventList datas={events} cardTitle={eventTitle} />

                    <PeopleList
                      datas={athletes}
                      cardTitle="Trending Players"
                      path="profile"
                      borderColor="border-primary"
                    />
                    <PeopleList
                      datas={coaches}
                      cardTitle="Trending Coaches"
                      path="coaches"
                      borderColor="border-purple"
                    />
                    <CollegeList datas={schools} cardTitle="Trending Schools" dotColor="bg-orange" />
                    <ArticleList cardTitle={articleTitle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
