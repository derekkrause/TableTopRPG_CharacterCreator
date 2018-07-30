import React from "react";

class TimelineItem extends React.Component {
  // const DefaultTimeLineItem = ({styleName, timeLine}) => {
  //     const {time, image, title, description} = timeLine;
  render() {
    return (
      //   <div className={`timeline-item ${styleName}`}>
      <div className="">
        <div className="timeline-badge timeline-img">
          <img src="assets/images/pentagon.png" alt="Pentagon" title="Pentagon" />
        </div>

        <div className="timeline-panel ">
          <div className="timeline-panel-header">
            <div className="timeline-header-img timeline-left">
              <img
                className="size-60 rounded-circle"
                src="https://static.boredpanda.com/blog/wp-content/uploads/2018/04/social-experiment-guy-created-fake-tinder-profile-hot-model-pictures-germanlifter7-5acdcd5f23391__700.jpg"
                alt="Pentagon"
                title="Pentagon"
              />
            </div>
            <div className="timeline-heading">
              <h5 className="float-right">2:45pm, July 1, 2018</h5>
              <h3 className="timeline-title">My First Home Run</h3>
            </div>
          </div>
          <div className="timeline-body">
            <p>I love sports!</p>
          </div>
        </div>
      </div>
    );
  }
}
export default TimelineItem;
