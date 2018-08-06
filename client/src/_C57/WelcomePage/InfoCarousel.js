import React, { Component } from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";

const items = [
  {
    id: 1,
    src: "https://www.publicdomainpictures.net/pictures/90000/velka/baseball-batter.jpg",
    altText: "Athletes",
    captionHeader: "Athletes",
    captionText: "Looking to get recruited? You've come to the right place!"
  },
  {
    id: 2,
    altText: "Coaches",
    src: "https://c1.staticflickr.com/6/5292/5477733359_102d9c5533_b.jpg",
    captionHeader: "Coaches",
    captionText: "Find your next All-Star"
  },
  {
    id: 3,
    altText: "Advocates",
    src:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Caleb_Porter_Portland_Timbers_vs_Seattle_Sounders_2016-07-17_%2828378409765%29.jpg/1024px-Caleb_Porter_Portland_Timbers_vs_Seattle_Sounders_2016-07-17_%2828378409765%29.jpg",
    captionHeader: "Advocates",
    captionText: "Boost your athlete's career with your support!"
  }
];

class HomeInfoCarousel extends Component {
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
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}>
          <img
            src={item.src}
            alt={item.altText}
            style={{ backgroundPosition: "center", backgroundSize: "cover", minHeight: "100%" }}
          />
          <CarouselCaption className="text-white" captionText={item.captionText} captionHeader={item.captionHeader} />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {`.custom-tag {
                max-width: 100%;
                height: 500px;
                background: black;
              }`}
        </style>
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

export default HomeInfoCarousel;
