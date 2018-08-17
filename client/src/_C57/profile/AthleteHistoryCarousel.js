import React, { Component } from "react";
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
import "./ProfileBanner.css";
import { connect } from "react-redux";
import { getAthleteInfoById } from "./AddSportHistory/AddSportService";
import AthleteSportHistoryCard from "./AthleteSportHistoryCard";
import "./AthleteHistoryCarousel.css";

class AthleteHistoryCarousel extends React.Component {
  state = { activeIndex: 0, athleteHistory: [], items: [] };

  componentDidMount() {
    getAthleteInfoById(0, 10, this.props.currentUser.id).then(res => {
      const itemArray = [];
      res.data.pagedItems.map(ash => {
        let ashInfo = {
          key: ash.id,
          classYear: ash.classYear,
          classYearId: ash.classYearId,
          clubName: ash.clubName,
          comments: ash.comments,
          schoolName: ash.schoolName,
          schoolNameId: ash.schoolNameId,
          selectedSchoolClubOrTeam: ash.selectedSchoolClubOrTeam,
          sportId: ash.sportId,
          sportLevel: ash.sportLevel,
          sportLevelId: ash.sportLevelId,
          sportName: ash.sportName,
          sportPositions: ash.sportPositionIds,
          teamName: ash.teamName,
          userId: ash.userId
        };
        itemArray.push(ashInfo);
      });
      this.setState({
        items: itemArray
      });
    });
  }

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  render = () => {
    const { activeIndex } = this.state;
    const slides = this.state.items.map(item => {
      return (
        <CarouselItem key={item.id} onExiting={this.onExiting} onExited={this.onExited}>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <AthleteSportHistoryCard
                classYear={item.classYear}
                classYearId={item.classYearId}
                clubName={item.clubName}
                comments={item.comments}
                schoolName={item.schoolName}
                schoolNameId={item.schoolNameId}
                selectedSchoolClubOrTeam={item.selectedSchoolClubOrTeam}
                sportId={item.sportId}
                sportLevel={item.sportLevel}
                sportLevelId={item.sportLevelId}
                sportName={item.sportName}
                sportPositions={item.sportPositions}
                teamName={item.teamName}
                userId={item.userId}
              />
            </div>
            <div className="col-md-1" />
          </div>
          <CarouselCaption className="text-danger" captionText={item.altText} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <React.Fragment>
        <div className="carousel" data-interval="100">
          <Carousel activeIndex={activeIndex} next={this.next} interval={false} previous={this.previous}>
            <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        </div>
      </React.Fragment>
    );
  };
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(AthleteHistoryCarousel);
