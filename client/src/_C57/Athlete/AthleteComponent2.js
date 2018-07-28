import React, { Component } from "react";
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";

const items = [
  {
    id: 1,
    /* altText: "Slide 1",
    caption: "Slide 1",*/
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQMUUWlC4cRzcs24r-uCQr5COrak_NxqYk9Th-WwJ-vhAgjAzj"
  },
  {
    id: 2,
    /* altText: "Slide 2",
    caption: "Slide 2",*/
    src: "https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/fenway15955.jpg"
  },
  {
    id: 3,
    /* altText: "Slide 3",
    caption: "Slide 3",*/
    src: "https://usathss.files.wordpress.com/2017/06/baseball_graphic1.jpg?w=1000&h=600&crop=1"
  }
];
class AthleteComponent2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const slides = items.map(item => {
      return (
        <CarouselItem key={item.id} onExiting={this.onExiting} onExited={this.onExited}>
          <img src={item.src} alt={item.altText} />
          <CarouselCaption className="text-danger" captionText={item.altText} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div className="carousel" data-interval="100">
        <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default AthleteComponent2;
